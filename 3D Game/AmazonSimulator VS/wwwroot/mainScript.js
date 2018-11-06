// inclare letiables that are needed here so it's all grouped nicely
let camera, scene, renderer;
let cameraControls;
// Setup the size, animation tickrate, geometry & materials
let squareSize = 1;
let animInterval = 20;
// initiate the rest of the global variables
let dummy;
let cube;
let r;
let cubeX;
let cubeY;
let cubeZ;
let xOffset;
let yOffset;
let zOffset;
let yOffsetX;
let yOffsetZ;
let changeR;
let flatX;
let flatZ;
let p;
let ax;
let inputReady;
let blockMoveInterval;
let levelData;
let playerPosition;
let animated = false;
let three_started = false;
let current_level_number;

const colors = Object.freeze({
    start_square: "",
    end_square: "",
    normal_square: "#333333"
});

THREE.Object3D.prototype.rotateAroundWorldAxis = function () {
    let q1 = new THREE.Quaternion();
    return function (point, axis, angle) {
        q1.setFromAxisAngle(axis, angle);

        this.quaternion.multiplyQuaternions(q1, this.quaternion);

        this.position.sub(point);
        this.position.applyQuaternion(q1);
        this.position.add(point);

        return this;
    };
}();

function load_nieuw_level(level) {
    let old_game = $("#game")[0].firstChild;
    if (old_game) {
        old_game.remove();
        if (renderer) {
            renderer.forceContextLoss();
        }
    }

    try {
        clearInterval(blockMoveInterval);
    }
    catch{
        console.log("No intervals to clear");
    }

    levelData = level;

    // Create Scene
    scene = new THREE.Scene();

    // Setup the WebGL renderer / alpha should help with loading in images with transparent parts <p.s. also makes background white for some reason>
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight + 5);

    $("#game")[0].appendChild(renderer.domElement);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFShadowMap; // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap

    renderer.domElement.setAttribute("id", "three_renderer");

    // Continuesly check if the window gets resized
    window.addEventListener('resize', onWindowResize, false);

    initInput();
    three_started = true;

    // Create the groundplanes
    for (let i = 0; i < levelData.layout.length; i++) {
        for (let j = 0; j < levelData.layout[0].length; j++) {
            if (levelData.layout[i][j]) {
                let plane = new Materials(squareSize, 0.2, squareSize, "plane", false, true);
                plane.position.z = squareSize * i;
                plane.position.y = -0.1;
                plane.position.x = squareSize * j;
                scene.add(plane);
            }
        }
    }

    for (let j = 0; j < levelData.antiBridges.length; j++) {
        let antiBridgeY = levelData.antiBridges[j].y;
        let antiBridgeX = levelData.antiBridges[j].x;
        let plane = new Materials(squareSize, 0.1, squareSize, "antiBridge", false, true);
        plane.position.z = squareSize * antiBridgeY;
        plane.position.y = -0.05;
        plane.position.x = squareSize * antiBridgeX;
        scene.add(plane);
        levelData.layout[antiBridgeY][antiBridgeX] = true;
    }

    for (let i = 0; i < levelData.triggers.length; i++) {
        let triggerY = levelData.triggers[i].y;
        let triggerX = levelData.triggers[i].x;

        if (!levelData.layout[triggerY][triggerX]) {
            let plane = new Materials(squareSize, 0.2, squareSize, "trigger", false, true);
            plane.position.z = squareSize * triggerY;
            plane.position.y = -0.1;
            plane.position.x = squareSize * triggerX;
            scene.add(plane);
            levelData.layout[triggerY][triggerX] = true;
        }
    }

    for (let i = 0; i < levelData.fragiles.length; i++) {
        let fragileY = levelData.fragiles[i].y;
        let fragileX = levelData.fragiles[i].x;

        if (!levelData.layout[fragileY][fragileX]) {
            let plane = new Materials(squareSize, 0.2, squareSize, "fragile", false, true);
            plane.position.z = squareSize * fragileY;
            plane.position.y = -0.1;
            plane.position.x = squareSize * fragileX;
            scene.add(plane);
            levelData.layout[fragileY][fragileX] = true;
        }
    }

    for (let i = 0; i < levelData.antiTriggers.length; i++) {
        let antiTriggerY = levelData.antiTriggers[i].y;
        let antiTriggerX = levelData.antiTriggers[i].x;

        if (!levelData.layout[antiTriggerY][antiTriggerX]) {
            let plane = new Materials(squareSize, 0.2, squareSize, "antiTrigger", false, true);
            plane.position.z = squareSize * antiTriggerY;
            plane.position.y = -0.1;
            plane.position.x = squareSize * antiTriggerX;
            scene.add(plane);
            levelData.layout[antiTriggerY][antiTriggerX] = true;
        }
    }

    for (let i = 0; i < levelData.ends.length; i++) {
        let endY = levelData.ends[i].y;
        let endX = levelData.ends[i].x;

        if (!levelData.layout[endY][endX]) {
            let plane = new Materials(squareSize - 0.01, 0.5, squareSize - 0.01, "end", false, true);
            plane.position.z = squareSize * endY;
            plane.position.y = -0.32;
            plane.position.x = squareSize * endX;
            scene.add(plane);
            levelData.layout[endY][endX] = true;
        }
    }

    // Setup camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    cameraControls = new THREE.OrbitControls(camera);
    camera.zoom = 5;
    camera.updateProjectionMatrix();
    cameraControls.update();

    loadCube();

    // Add lighting to the scene
    let light = new THREE.PointLight(0x404040);
    light.position.x = -40;
    light.position.z = -40;
    light.position.y = 60;
    light.castShadow = true;
    light.shadowMapWidth = 1024; // default is 512
    light.shadowMapHeight = 1024; // default is 512
    light.intensity = 3;
    scene.add(light);

    light = new THREE.AmbientLight(0x404040);
    light.intensity = 2;
    scene.add(light);

    // adds  the skybox
    let skybox = new SkyBox("skybox/", "1", "3", "top", "bot","2", "3", "jpg");
    scene.add(skybox);

    if (!animated) {
        animate();
        animated = true;
    }
}

function loadCube() {
    cubeY = 1;
    changeR = false;
    flatX = false;
    flatZ = false;
    inputReady = true;

    dummy = new THREE.Object3D;

    cubeX = levelData.starts[0].x;
    cubeZ = levelData.starts[0].y;
    playerPosition = new FlatCoord(levelData.starts[0].x, levelData.starts[0].y);

    cube = new Materials(squareSize, squareSize * 2, squareSize, "cube", true, false);
    cube.position.x = cubeX;
    cube.position.y = cubeY;
    cube.position.z = cubeZ;
    scene.add(cube);

    // the dummy is an invisible cube that serves as a target for the camera.
    dummy.position.x = cube.position.x;
    dummy.position.y = 0;
    dummy.position.z = cube.position.z;

    cameraControls.target = dummy.position;
    camera.position.z = dummy.position.z - 3;
    camera.position.y = 15;
    camera.position.x = dummy.position.x - 30;
    cameraControls.update();
}

function restart_level() {
    var selectedObject = scene.getObjectByName("cube");
    selectedObject.geometry.dispose();
    scene.remove(selectedObject);

    while (scene.getObjectByName("bridge")) {
        selectedObject = scene.getObjectByName("bridge");
        levelData.layout[selectedObject.position.z][selectedObject.position.x] = false;
        selectedObject.geometry.dispose();
        scene.remove(selectedObject);
    }

    for (let j = 0; j < levelData.antiBridges.length; j++) {
        let antiBridgeY = levelData.antiBridges[j].y;
        let antiBridgeX = levelData.antiBridges[j].x;

        let plane = new Materials(squareSize, 0.1, squareSize, "antiBridge", false, true);
        plane.position.z = squareSize * antiBridgeY;
        plane.position.y = -0.05;
        plane.position.x = squareSize * antiBridgeX;
        scene.add(plane);
        levelData.layout[antiBridgeY][antiBridgeX] = true;
    }

    if (levelData.fragiles.length > 0) {
        try {
            scene.add(fragileObject);
        }
        catch{
            console.log("No fragileObject to add!")
        }
    }

    while (scene.getObjectByName("checkedFragile")) {
        selectedObject = scene.getObjectByName("checkedFragile");
        selectedObject.name = "fragile";
    } 

    try {
        clearInterval(blockMoveInterval);
    }
    catch{
        console.log("interval undefined");
    }

    loadCube();
}

function initInput() {
    document.addEventListener('keydown', function (event) {
        if (inputReady === true) {
            if (event.key === "w" || event.key === "W") {
                moveBlock('z', "inc", "move");
            }
            else if (event.key === "a" || event.key === "A") {
                moveBlock('x', "dec", "move");
            }
            else if (event.key === "s" || event.key === "S") {
                moveBlock('z', "dec", "move");
            }
            else if (event.key === "d" || event.key === "D") {
                moveBlock('x', "inc", "move");
            }
            else if (event.keyCode === 38) {
                moveBlock('z', "inc", "move");
            }
            else if (event.keyCode === 37) {
                moveBlock('x', "dec", "move");
            }
            else if (event.keyCode === 40) {
                moveBlock('z', "dec", "move");
            }
            else if (event.keyCode === 39) {
                moveBlock('x', "inc", "move");
            }
        }
    });
}

// Changes the scene as per updated model so we see the models change
function animate() {
    requestAnimationFrame(animate);
    cameraControls.update();
    renderer.render(scene, camera);
}

// Adjusts the scene to the correct window size whenever the window gets resized
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function moveBlock(axis, dir, type) {
    let counter = 0;
    let startRot = 0;

    if (inputReady === true) {
        inputReady = false;

        cubeX = cube.position.x;
        cubeY = cube.position.y;
        cubeZ = cube.position.z;

        if (axis === 'x') {
            startRot = cube.rotation.x;
            yOffsetZ = 0;
            xOffset = 0;
            ax = new THREE.Vector3(1, 0, 0);

            if (flatZ) {
                yOffset = 0.5;
            }
            else {
                yOffset = 1;
            }

            if (dir === "dec") {
                r = -Math.PI / 20;
                zOffset = -0.5;
                yOffsetX = yOffset * -1;
            }
            else if (dir === "inc") {
                r = Math.PI / 20;
                zOffset = 0.5;
                yOffsetX = yOffset;
            }
        }
        else if (axis === 'z') {
            startRot = cube.rotation.z;
            yOffsetX = 0;
            zOffset = 0;
            ax = new THREE.Vector3(0, 0, 1);

            if (flatX) {
                yOffset = 0.5;
            }
            else {
                yOffset = 1;
            }

            if (dir === "dec") {
                r = Math.PI / 20;
                xOffset = -0.5;
                yOffsetZ = yOffset * -1;
            }
            else if (dir === "inc") {
                r = -Math.PI / 20;
                xOffset = 0.5;
                yOffsetZ = yOffset;
            }
        }

        if (type === "move") {
            let endpoint = calcEndpoint();
            let calcPoint1 = calcEndpoint();
            let calcPoint2 = calcEndpoint();
            let validSpace;
            let validSpace2;

            if (endpoint.x % 1 === 0 && endpoint.y % 1 === 0) {
                validSpace = validSpace2 = saveMapGet(endpoint.x, endpoint.y);
            }
            else if (endpoint.x % 1 !== 0 && endpoint.y % 1 === 0) {
                validSpace = saveMapGet(endpoint.x + 0.5, endpoint.y);
                validSpace2 = saveMapGet(endpoint.x - 0.5, endpoint.y);
                calcPoint1.x = endpoint.x + 0.5;
                calcPoint2.x = endpoint.x - 0.5;
                calcPoint1.y = calcPoint2.y = endpoint.y;
                if (axis === "x") {
                    changeR = true;
                }
                else changeR = false;
            }
            else if (endpoint.x % 1 === 0 && endpoint.y % 1 !== 0) {
                validSpace = saveMapGet(endpoint.x, endpoint.y + 0.5);
                validSpace2 = saveMapGet(endpoint.x, endpoint.y - 0.5);
                calcPoint1.y = endpoint.y + 0.5;
                calcPoint2.y = endpoint.y - 0.5;
                calcPoint1.x = calcPoint2.x = endpoint.x;
                if (axis === "z") {
                    changeR = true;
                }
                else changeR = false;
            }
            else {
                console.log("How did you end up here?");
            }

            if ((!validSpace ^ !validSpace2) && !changeR) {
                fall(3);
            }
            else if (!validSpace && !validSpace2) {
                fall(0);
            }
            else if (!validSpace && validSpace2) {
                fall(2);
            }
            else if (validSpace && !validSpace2) {
                fall(1);
            }
            else {
                if (levelData.fragiles.length > 0) {
                    for (let i = 0; i < levelData.fragiles.length; i++) {
                        if (levelData.fragiles[i].x === endpoint.x && levelData.fragiles[i].y === endpoint.y) {
                            move(endpoint, true, calcPoint1, calcPoint2);
                            return;
                        }
                    }
                }
                move(endpoint, false, calcPoint1, calcPoint2);
            }
        }
        else if (type === "fall") {
            fall();
        }
    }

    function move(givenEndpoint, fragile, p1, p2) {
        blockMoveInterval = setInterval(function () {
            setRotPoint(startRot);

            counter++;
            cube.rotateAroundWorldAxis(p, ax, r);

            dummy.position.x = cube.position.x;
            dummy.position.z = cube.position.z;
            camera.position.x = dummy.position.x - 30;
            camera.position.z = dummy.position.z - 3;

            if (counter >= 10) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                toggleFlat(axis);

                if(!fragile) inputReady = true;

                clearInterval(blockMoveInterval);

                winCheck(givenEndpoint);
                triggerCheck(givenEndpoint, p1, p2);

                if (fragile) fall1(givenEndpoint, 45);
            }
        }, animInterval);
    }

    function fall1(givenEndpoint, time) {
        inputReady = false;

        if (givenEndpoint) {
            while (scene.getObjectByName("fragile")) {
                fragileObject = scene.getObjectByName("fragile");

                fragileObject.name = "checkedFragile";

                if (fragileObject.position.x === givenEndpoint.x && fragileObject.position.z === givenEndpoint.y) {
                    scene.remove(fragileObject);
                    break;
                }
            }
        }

        blockMoveInterval = setInterval(function () {
            counter++;
            cube.position.y -= 0.18;

            if (counter >= time) {
                clearInterval(blockMoveInterval);

                if (givenEndpoint) {
                    store.commit("load_game_over");
                }
            }
        }, animInterval);
    }

    function fall(type) {
        console.log(type);
        blockMoveInterval = setInterval(function () {
            if (type !== 0) {
                if (counter >= 10 && counter < 20 && type === 1) {
                    if (axis === "x") {
                        ax = new THREE.Vector3(0, 0, 1);

                        if (counter === 10 && changeR && dir === "dec") {
                            r *= -1;
                        }
                        else {
                            dir = "dec";
                        }
                    }
                    else if (axis === "z") {
                        ax = new THREE.Vector3(1, 0, 0);

                        if (counter === 10 && changeR && dir === "dec") {
                            r *= -1;
                        }
                        else {
                            dir = "dec";
                        }
                    }
                }
                else if (counter >= 10 && counter < 20 && type === 2) {
                    if (axis === "x") {
                        ax = new THREE.Vector3(0, 0, 1);

                        if (counter === 10 && changeR && dir === "inc") {
                            r *= -1;
                        }
                        else {
                            dir = "inc";
                        }
                    }
                    else if (axis === "z") {
                        ax = new THREE.Vector3(1, 0, 0);

                        if (counter === 10 && changeR && dir === "inc") {
                            r *= -1;
                        }
                        else {
                            dir = "inc";
                        }
                    }
                }
                else if (counter >= 10 && counter < 20 && type === 3) {
                    cubeY = cube.position.y -= 0.1;
                    if (axis === "x") {
                        if (counter === 10) {
                            cubeX = cube.position.x;
                            cubeZ = cube.position.z;
                        }
                    }
                    else if (axis === "z") {
                        if (counter === 10) {
                            cubeX = cube.position.x;
                            cubeZ = cube.position.z;
                        }
                    }
                }
            }

            setRotPoint(startRot);

            if (counter >= 10 && type === 0) {
                cube.position.y -= 0.12;
                cubeY = cube.position.y;
                if (axis === 'x') {
                    if (dir === "dec") {
                        cube.position.z -= 0.05;
                        cubeZ -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.z += 0.05;
                        cubeZ += 0.05;
                    }
                }
                else if (axis === 'z') {
                    if (dir === "dec") {
                        cube.position.x -= 0.05;
                        cubeX -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.x += 0.05;
                        cubeX += 0.05;
                    }
                }
            }
            else if (counter >= 20 && counter < 30 && (type === 1 || type === 2)) {
                cube.position.y -= 0.1;
                cubeY = cube.position.y;
            }
            else if (counter >= 20 && type === 3) {
                cube.position.y -= 0.1;
                cubeY = cube.position.y;
                if (axis === 'x') {
                    if (dir === "dec") {
                        cube.position.z -= 0.05;
                        cubeZ -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.z += 0.05;
                        cubeZ += 0.05;
                    }
                }
                else if (axis === 'z') {
                    if (dir === "dec") {
                        cube.position.x -= 0.05;
                        cubeX -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.x += 0.05;
                        cubeX += 0.05;
                    }
                }
            }
            else if (counter >= 30 && type === 1) {
                cube.position.y -= 0.1;
                cubeY = cube.position.y;
                if (axis === 'z') {
                    if (dir === "dec") {
                        cube.position.z -= 0.05;
                        cubeZ -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.z += 0.05;
                        cubeZ += 0.05;
                    }
                }
                else if (axis === 'x') {
                    if (dir === "dec") {
                        cube.position.x -= 0.05;
                        cubeX -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.x += 0.05;
                        cubeX += 0.05;
                    }
                }
            }
            else if (counter >= 30 && type === 2) {
                cube.position.y -= 0.1;
                cubeY = cube.position.y;
                if (axis === 'z') {
                    if (dir === "dec") {
                        cube.position.z -= 0.05;
                        cubeZ -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.z += 0.05;
                        cubeZ += 0.05;
                    }
                }
                else if (axis === 'x') {
                    if (dir === "dec") {
                        cube.position.x -= 0.05;
                        cubeX -= 0.05;
                    }
                    else if (dir === "inc") {
                        cube.position.x += 0.05;
                        cubeX += 0.05;
                    }
                }
            }

            counter++;
            cube.rotateAroundWorldAxis(p, ax, r);

            if (counter >= 80) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                if (type === 0) changeR = false;
                clearInterval(blockMoveInterval);
                store.commit("load_game_over");
            }
        }, animInterval);
    }

    function setRotPoint(givenStartRot) {
        if (givenStartRot === 0) {
            p = new THREE.Vector3(cubeX + xOffset, cubeY - yOffset, cubeZ + zOffset);
        }
        else if (givenStartRot === Math.PI / 2) {
            p = new THREE.Vector3(cubeX + yOffsetZ, cubeY - 0.5, cubeZ + yOffsetX);
        }
        else if (givenStartRot === Math.PI) {
            p = new THREE.Vector3(cubeX + xOffset, cubeY - yOffset, cubeZ + zOffset);
        }
    }

    function correctRot(givenRotation) {
        cRot = Math.abs(givenRotation);

        if (cRot <= (Math.PI / 2) + 0.1 && cRot >= (Math.PI / 2) - 0.1) {
            return Math.PI / 2;
        }
        else if (cRot <= Math.PI + 0.1 && cRot >= Math.PI - 0.1) {
            return Math.PI;
        }
        else if (cRot <= (Math.PI * 1.5) + 0.1 && cRot >= (Math.PI * 1.5) - 0.1) {
            return Math.PI * 1.5;
        }
        else if (cRot <= (Math.PI * 2) + 0.1 && cRot >= (Math.PI * 2) - 0.1) {
            return 0;
        }
        else if (cRot <= 0.1 && cRot >= -0.1) {
            return 0;
        }
    }

    function toggleFlat(axis) {
        if (axis === 'x') {
            if (!flatZ) {
                flatX = !flatX;
            }
        }
        else if (axis === 'z') {
            if (!flatX) {
                flatZ = !flatZ;
            }
        }
    }

    function quantNum(num) {
        let integerComp = Math.floor(num);
        let remainder = num - integerComp;
        if (0.25 < remainder && remainder <= 0.75) {
            return integerComp + 0.5;
        }
        else if (remainder > 0.75) {
            return integerComp + 1;
        }
        else {
            return integerComp;
        }
    }

    function calcEndpoint() {
        if (!flatX && !flatZ) {
            if (axis === "x") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1.5);
                }
                else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1.5);
                }
            }
            else if (axis === "z") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x) + 1.5, quantNum(cube.position.z));
                }
                else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x) - 1.5, quantNum(cube.position.z));
                }
            }
        }
        else {
            if (flatZ && axis === "x") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1);
                }
                else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1);
                }
            } if (flatX && axis === "x") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1.5);
                }
                else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1.5);
                }
            } else if (flatX && axis === "z") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x) + 1, quantNum(cube.position.z));
                }
                else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x) - 1, quantNum(cube.position.z));
                }
            } else if (flatZ && axis === "z") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x) + 1.5, quantNum(cube.position.z));
                }
                else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x) - 1.5, quantNum(cube.position.z));
                }
            }
        }
    }

    function saveMapGet(x, y) {
        let result;

        try {
            result = levelData.layout[Math.floor(y)][Math.floor(x)];
        } catch {
            result = false;
        }

        result = !!result;
        return result;
    }

    function winCheck(coord) {
        if (levelData.ends[0].x === coord.x && levelData.ends[0].y === coord.y) {
            inputReady = false;

            fall1(0, 80);

            setTimeout(function () { store.commit("load_level_won", current_level_number); }, 24*animInterval);
        }
    }

    function triggerCheck(coord, c1, c2) {
        if (levelData.triggers.length > 0) {
            for (let i = 0; i < levelData.triggers.length; i++) {
                let triggerX = levelData.triggers[i].x;
                let triggerY = levelData.triggers[i].y;

                if (triggerX === coord.x && triggerY === coord.y) {
                    for (let j = 0; j < levelData.bridges.length; j++) {
                        let bridgeY = levelData.bridges[j].y;
                        let bridgeX = levelData.bridges[j].x;

                        if (!levelData.layout[bridgeY][bridgeX]) {
                            let plane = new Materials(squareSize, 0.1, squareSize, "bridge", false, true);
                            plane.position.z = squareSize * bridgeY;
                            plane.position.y = -0.05;
                            plane.position.x = squareSize * bridgeX;
                            scene.add(plane);
                            levelData.layout[bridgeY][bridgeX] = true;
                        }
                        else {
                            levelData.layout[bridgeY][bridgeX] = false;
                            while (scene.getObjectByName("bridge")) {
                                let selectedObject = scene.getObjectByName("bridge");
                                selectedObject.geometry.dispose();
                                scene.remove(selectedObject);
                            }
                        }
                    }
                }
            }
        }
        if (levelData.antiTriggers.length > 0) {
            for (let i = 0; i < levelData.antiTriggers.length; i++) {
                let antiTriggerX = levelData.antiTriggers[i].x;
                let antiTriggerY = levelData.antiTriggers[i].y;

                console.log(c1);
                console.log(c2);

                if ((antiTriggerX === c1.x && antiTriggerY === c1.y) || (antiTriggerX === c2.x && antiTriggerY === c2.y) || (antiTriggerX === coord.x && antiTriggerY === coord.y)) {
                    for (let j = 0; j < levelData.antiBridges.length; j++) {
                        let antiBridgeY = levelData.antiBridges[j].y;
                        let antiBridgeX = levelData.antiBridges[j].x;

                        if (levelData.layout[antiBridgeY][antiBridgeX]) {
                            levelData.layout[antiBridgeY][antiBridgeX] = false;
                            while (scene.getObjectByName("antiBridge")) {
                                let selectedObject = scene.getObjectByName("antiBridge");
                                selectedObject.geometry.dispose();
                                scene.remove(selectedObject);
                            }
                        }
                    }
                }
            }
        }
    }
}

function FlatCoord(x, y) {
    let _this = this;
    this.x = x;
    this.y = y;
    this.move_up = function (amount) {
        _this.y += amount;
    };
    this.move_down = function (amount) {
        _this.y -= amount;
    };
    this.move_left = function (amount) {
        _this.x -= amount;
    };
    this.move_right = function (amount) {
        _this.x += amount;
    };
}