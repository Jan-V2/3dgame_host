// inclare letiables that are needed here so it's all grouped nicely
let camera, scene, renderer;
let cameraControls;
// Path needs to be changed for both or we keep them doesn't really matter
let modelPath = "/3dmodels/";
let texturesPath = "/textures/models/";
// Setup the size, tickrate, geometry & materials
let squareSize = 1;
let animInterval = 20;
let cubeGeometry = new THREE.CubeGeometry(squareSize, squareSize*2, squareSize);
let cubeMaterial = new THREE.MeshPhysicalMaterial({ color: 0xFF0000 });
let planeGeometry = new THREE.PlaneGeometry(squareSize, squareSize);
let planeMaterial = new THREE.MeshPhongMaterial({ color: 0x808080, side: THREE.DoubleSide });
let bridgeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF00, side: THREE.DoubleSide });
let triggerMaterial = new THREE.MeshPhongMaterial({ color: 0x00FF00, side: THREE.DoubleSide });
let endMaterial = new THREE.MeshPhongMaterial({ color: 0x0000FF, side: THREE.DoubleSide });
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
let counter;
let p;
let ax;
let inputReady;
let blockMoveInterval;
let levelData;
let playerPosition;
let animated = false;
let three_started = false;

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
            console.log("i did it");
        }
    }

    try {
        clearInterval(blockMoveInterval);
        clearInterval(blockMoveInterval);
    }
    catch{
        console.log("interval undefined");
    }

    levelData = level;
    r = 0;
    cubeX = undefined;
    cubeY = 1;
    cubeZ = undefined;
    xOffset = undefined;
    yOffset = undefined;
    zOffset = undefined;
    yOffsetX = undefined;
    yOffsetZ = undefined;
    changeR = false;
    flatX = false;
    flatZ = false;
    counter = 0;
    animInterval = 25;
    p = undefined;
    ax = undefined;
    squaresize = 1;
    inputReady = true;
    player_position = undefined;

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
                let plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.rotation.x = Math.PI / 2.0;
                plane.position.z = squareSize * i;
                plane.position.x = squareSize * j;
                plane.receiveShadow = true;
                plane.castShadow = false;
                scene.add(plane);
            }
        }
    }

    for (let i = 0; i < levelData.triggers.length; i++) {
        let triggerY = levelData.triggers[i].y;
        let triggerX = levelData.triggers[i].x;

        if (!levelData.layout[triggerY][triggerX]) {
            let plane = new THREE.Mesh(planeGeometry, triggerMaterial);
            plane.rotation.x = Math.PI / 2.0;
            plane.position.z = squareSize * triggerY;
            plane.position.x = squareSize * triggerX;
            plane.receiveShadow = true;
            plane.castShadow = false;
            plane.name = "trigger";
            scene.add(plane);
            levelData.layout[triggerY][triggerX] = true;
        }
    }

    for (let i = 0; i < levelData.ends.length; i++) {
        let endY = levelData.ends[i].y;
        let endX = levelData.ends[i].x;

        if (!levelData.layout[endY][endX]) {
            let plane = new THREE.Mesh(planeGeometry, endMaterial);
            plane.rotation.x = Math.PI / 2.0;
            plane.position.z = squareSize * endY;
            plane.position.x = squareSize * endX;
            plane.receiveShadow = true;
            plane.castShadow = false;
            plane.name = "end";
            scene.add(plane);
            levelData.layout[endY][endX] = true;
        }
    }

    dummy = new THREE.Object3D;
    loadCube();

    // Setup camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    cameraControls = new THREE.OrbitControls(camera);
    cameraControls.target = dummy.position;
    camera.position.z = dummy.position.z - 3;
    camera.position.y = 15;
    camera.position.x = dummy.position.x - 20;
    camera.zoom = 3;
    camera.updateProjectionMatrix();
    cameraControls.update();

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

    if (!animated) {
        animate();
        animated = true;
        console.log("IM ANIMATING ALRIGHT");
    }
}

function loadCube() {
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cubeY = 1;
    changeR = false;
    flatX = false;
    flatZ = false;
    inputReady = true;

    cubeX = levelData.starts[0].x;
    cubeZ = levelData.starts[0].y;
    playerPosition = new FlatCoord(levelData.starts[0].x, levelData.starts[0].y);

    cube.name = "cube";
    cube.position.x = cubeX;
    cube.position.y = cubeY;
    cube.position.z = cubeZ;
    cube.castShadow = true;
    cube.receiveShadow = false;
    scene.add(cube);
    
    dummy.position.x = cube.position.x;
    dummy.position.y = 3;
    dummy.position.z = cube.position.z;
}

function restart() {
    var selectedObject = scene.getObjectByName("cube");
    selectedObject.geometry.dispose();
    selectedObject.material.dispose();
    scene.remove(selectedObject);

    while (scene.getObjectByName("bridge")) {
        selectedObject = scene.getObjectByName("bridge");
        levelData.layout[selectedObject.position.z][selectedObject.position.x] = false;
        selectedObject.geometry.dispose();
        selectedObject.material.dispose();
        scene.remove(selectedObject);
    }

    try {
        clearInterval(blockMoveInterval);
        clearInterval(blockMoveInterval);
    }
    catch{
        console.log("interval undefined");
    }

    loadCube();

    camera.position.z = dummy.position.z - 3;
    camera.position.y = 15;
    camera.position.x = dummy.position.x - 20;
    cameraControls.update();
}

function initInput() {
    document.addEventListener('keydown', function (event) {
        if (inputReady === true) {
            if (event.key === "w" || event.key === "W") {
                moveBlock('z', "inc", "move");
            } else if (event.key === "a" || event.key === "A") {
                moveBlock('x', "dec", "move");
            } else if (event.key === "s" || event.key === "S") {
                moveBlock('z', "dec", "move");
            } else if (event.key === "d" || event.key === "D") {
                moveBlock('x', "inc", "move");
            } else if (event.keyCode === 38) {
                moveBlock('z', "inc", "move");
            } else if (event.keyCode === 37) {
                moveBlock('x', "dec", "move");
            } else if (event.keyCode === 40) {
                moveBlock('z', "dec", "move");
            } else if (event.keyCode === 39) {
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
        /*
        * todo bebaal eindbestemming
        * todo check of de eindbestemming in het speelveld ligt
        * todo recursive call met fall
        */
        let endpoint = calcEndpoint();
        let validSpace;
        let validSpace2;

        console.log(endpoint);

        if (endpoint.x % 1 === 0 && endpoint.y % 1 === 0) {
            validSpace = validSpace2 = saveMapGet(endpoint.x, endpoint.y)
        } else if (endpoint.x % 1 !== 0 && endpoint.y % 1 === 0) {
            validSpace = saveMapGet(endpoint.x + 0.5, endpoint.y)
            validSpace2 = saveMapGet(endpoint.x - 0.5, endpoint.y);
            if (axis === "x") {
                changeR = true;
            }
            else changeR = false;
        } else if (endpoint.x % 1 === 0 && endpoint.y % 1 !== 0) {
            validSpace = saveMapGet(endpoint.x, endpoint.y + 0.5)
            validSpace2 = saveMapGet(endpoint.x, endpoint.y - 0.5);
            if (axis === "z") {
                changeR = true;
            }
            else changeR = false;
        } else {
            console.log("niet afgevangen");
            console.log(cube.position);
        }

        console.log(levelData.layout);
        console.log("opspeelveld " + validSpace);
        console.log("opspeelveld2 " + validSpace2);
        console.log("changeR" + changeR);
        if ((!validSpace ^ !validSpace2) && !changeR) {
            fall3();
            console.log("fall3");
        }
        else if (!validSpace && !validSpace2) {
            fall();
            console.log("fall");
        }
        else if (!validSpace && validSpace2) {
            fall2();
            console.log("fall2");
        }
        else if (validSpace && !validSpace2) {
            fall1();
            console.log("fall1");
        }
        else {
            move(endpoint);
        }
    }
    else if (type === "fall") {
        fall();
    }

    function move(givenEndpoint) {
        blockMoveInterval = setInterval(function () {
            setRotPoint(startRot);

            counter++;
            cube.rotateAroundWorldAxis(p, ax, r);

            dummy.position.x = cube.position.x;
            dummy.position.z = cube.position.z;
            camera.position.x = dummy.position.x - 20;
            camera.position.z = dummy.position.z - 3;

            if (counter >= 10) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                toggleFlat(axis);
                console.log(cube.position);

                inputReady = true;

                clearInterval(blockMoveInterval);

                winCheck(givenEndpoint);
                triggerCheck(givenEndpoint);
            }
        }, animInterval);
    }

    function fall() {
        blockMoveInterval = setInterval(function () {
            setRotPoint(startRot);

            if (counter >= 10) {
                cube.position.y -= 0.2;
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

            counter++;
            cube.rotateAroundWorldAxis(p, ax, r);

            if (counter >= 100) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                inputReady = true;
                changeR = false;
                clearInterval(blockMoveInterval);
                store.commit("load_game_over");
            }
        }, animInterval);
    }

    function fall1() {
        blockMoveInterval = setInterval(function () {
            if (counter >= 10 && counter < 20) {
                if (axis === "x") {
                    ax = new THREE.Vector3(0, 0, 1);

                    console.log(changeR);

                    if (counter === 10 && changeR && dir === "dec") {
                        r *= -1;

                        console.log("R changed");
                    }
                    else {
                        dir = "dec";
                    }
                    console.log("x as");
                    console.log("dir: " + dir);
                }
                else if (axis === "z") {
                    ax = new THREE.Vector3(1, 0, 0);

                    console.log(changeR);

                    if (counter === 10 && changeR && dir === "dec") {
                        r *= -1;

                        console.log("R changed");
                    }
                    else {
                        dir = "dec";
                    }

                    console.log("z as");
                    console.log("dir: " + dir);
                }
            }

            setRotPoint(startRot);

            if (counter >= 20 && counter < 30) {
                cube.position.y -= 0.1;
                cubeY = cube.position.y;
            }
            else if (counter >= 30) {
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

            if (counter >= 100) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                inputReady = true;
                changeR = false;
                clearInterval(blockMoveInterval);
                store.commit("load_game_over");
            }
        }, animInterval);
    }

    function fall2() {
        blockMoveInterval = setInterval(function () {
            if (counter >= 10 && counter < 20) {
                if (axis === "x") {
                    ax = new THREE.Vector3(0, 0, 1);

                    console.log(changeR);

                    if (counter === 10 && changeR && dir === "inc") {
                        r *= -1;

                        console.log("R changed");
                    }
                    else {
                        dir = "inc";
                    }

                    console.log("x as");
                    console.log("dir: " + dir);

                }
                else if (axis === "z") {
                    ax = new THREE.Vector3(1, 0, 0);

                    console.log(changeR);

                    if (counter === 10 && changeR && dir === "inc") {
                        r *= -1;

                        console.log("R changed");
                    }
                    else {
                        dir = "inc";
                    }

                    console.log("z as");
                    console.log("dir: " + dir);
                }
            }

            setRotPoint(startRot);

            if (counter >= 20 && counter < 30) {
                cube.position.y -= 0.1;
                cubeY = cube.position.y;
            }
            else if (counter >= 30) {
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

            if (counter >= 100) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                inputReady = true;
                changeR = false;
                clearInterval(blockMoveInterval);
                store.commit("load_game_over");
            }
        }, animInterval);
    }

    function fall3() {
        blockMoveInterval = setInterval(function () {
            if (counter >= 10 && counter < 20) {
                if (axis === "x") {
                    if (counter === 10) {
                        cubeX = cube.position.x;
                        cubeZ = cube.position.z;
                    }
                    cubeY = cube.position.y -= 0.12;
                }
                else if (axis === "z") {
                    if (counter === 10) {
                        cubeX = cube.position.x;
                        cubeZ = cube.position.z;
                    }
                    cubeY = cube.position.y -= 0.12;
                }
            }
            setRotPoint(startRot);
            if (counter >= 20) {
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

            counter++;
            cube.rotateAroundWorldAxis(p, ax, r);

            if (counter >= 100) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                inputReady = true;
                changeR = false;
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
        console.log("flatX: " + flatX);
        console.log("flatZ: " + flatZ);
    }

    function quantNum(num) {
        let integerComp = Math.floor(num);
        let remainder = num - integerComp;
        if (0.25 < remainder && remainder <= 0.75) {
            return integerComp + 0.5;
        } else if (remainder > 0.75) {
            return integerComp + 1;
        } else {
            return integerComp;
        }
    }

    function calcEndpoint() {
        if (!flatX && !flatZ) {
            if (axis === "x") {
                console.log("z as");
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1.5);
                } else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1.5);
                }
            } else if (axis === "z") {
                console.log("x as");

                if (dir === "inc") {
                    console.log("inc");

                    return new FlatCoord(quantNum(cube.position.x) + 1.5, quantNum(cube.position.z));
                } else if (dir === "dec") {
                    console.log("dec");

                    return new FlatCoord(quantNum(cube.position.x) - 1.5, quantNum(cube.position.z));
                }
            }
        } else {
            if (flatZ && axis === "x") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1);
                } else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1);
                }
            } if (flatX && axis === "x") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1.5);
                } else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1.5);
                }
            } else if (flatX && axis === "z") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x) + 1, quantNum(cube.position.z));
                } else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x) - 1, quantNum(cube.position.z));
                }
            } else if (flatZ && axis === "z") {
                if (dir === "inc") {
                    return new FlatCoord(quantNum(cube.position.x) + 1.5, quantNum(cube.position.z));
                } else if (dir === "dec") {
                    return new FlatCoord(quantNum(cube.position.x) - 1.5, quantNum(cube.position.z));
                }
            }
        }
    }

    function saveMapGet(x, y) {
        let result;
        console.log("x " + Math.floor(y) + " y " + Math.floor(x));
        try {
            result = levelData.layout[Math.floor(y)][Math.floor(x)];
        } catch {
            result = false;
        }
        result = !!result;
        console.log(result);
        return result;
    }

    function winCheck(coord) {
        console.log("checking win");
        console.log(coord);

        if (levelData.ends[0].x === coord.x && levelData.ends[0].y === coord.y) {
            console.log("gewonnen");
            store.commit("load_main_menu");
        }
    }

    function triggerCheck(coord) {
        if (levelData.triggers.length > 0) {
            if (levelData.triggers[0].x === coord.x && levelData.triggers[0].y === coord.y) {
                for (let i = 0; i < levelData.bridges.length; i++) {
                    console.log("bridges = " + levelData.bridges[i].x + "  " + levelData.bridges[i].y);
                    let bridgeY = levelData.bridges[i].y;
                    let bridgeX = levelData.bridges[i].x;

                    if (!levelData.layout[bridgeY][bridgeX]) {
                        let plane = new THREE.Mesh(planeGeometry, bridgeMaterial);
                        plane.rotation.x = Math.PI / 2.0;
                        plane.position.z = squareSize * bridgeY;
                        plane.position.x = squareSize * bridgeX;
                        plane.receiveShadow = true;
                        plane.castShadow = false;
                        plane.name = "bridge";
                        scene.add(plane);
                        levelData.layout[bridgeY][bridgeX] = true;
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