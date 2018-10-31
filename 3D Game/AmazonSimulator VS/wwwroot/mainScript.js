// inclare variables that are needed here so it's all grouped nicely
var camera, scene, renderer;
var cameraControls;
// Path needs to be changed for both or we keep them doesn't really matter
var modelPath = "/3dmodels/";
var texturesPath = "/textures/models/";
var dummy = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({ color: 0x000000 }));
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 1), new THREE.MeshPhysicalMaterial({color: 0xFF0000}));
var r = 0;
var cubeX;
var cubeY = 1;
var cubeZ;
var xOffset;
var yOffset;
var zOffset;
var yOffsetX;
var yOffsetZ;
var flatX = false;
var flatZ = false;
var counter = 0;
var animInterval = 20;
var p;
var ax;
let squaresize = 1;
var inputReady = true;
let map;
let player_position;

function Flat_Coord(x, y){
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

// Changes the command from the server which is send as a JavaScript Object Notation to a readable string
function parseCommand(input) {
    if (input === undefined){
        input = "";
    }
    return JSON.parse(input);
}

THREE.Object3D.prototype.rotateAroundWorldAxis = function () {
    var q1 = new THREE.Quaternion();
    return function (point, axis, angle) {

        q1.setFromAxisAngle(axis, angle);

        this.quaternion.multiplyQuaternions(q1, this.quaternion);

        this.position.sub(point);
        this.position.applyQuaternion(q1);
        this.position.add(point);

        return this;
    };
}();


// Sets up all the stuff we need
function init_3d() {
    // For debugging / performance stats, could be handy dandy when trying it on a mobile device


/*    (function () { var script = document.createElement('script'); script.onload = function () {
            var stats = new Stats();
            $("#game")[0].appendChild(stats.dom);
            requestAnimationFrame(function loop() {
                stats.update();
                requestAnimationFrame(loop)
            });
        };
            script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js'; document.head.appendChild(script);
        }
    )();*/

    // Create Scene
    scene = new THREE.Scene();
    
    // Setup the WebGL renderer / alpha should help with loading in images with transparent parts <p.s. also makes background white for some reason>
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight + 5);
    
    $("#game")[0].appendChild(renderer.domElement);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap; // options are THREE.BasicShadowMap | THREE.PCFShadowMap | THREE.PCFSoftShadowMap

    renderer.domElement.setAttribute("id", "three_renderer");

    // Continuesly check if the window gets resized

    // Setup our 1st test map
    var geometry = new THREE.PlaneGeometry(squaresize, squaresize);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    for (let i = 0; i < map.layout.length; i++) {
        for (let j = 0; j < map.layout[0].length; j++) {
            if (map.layout[i][j]){
                let plane = new THREE.Mesh(geometry, material);
                plane.rotation.x = Math.PI / 2.0;
                plane.position.z = squaresize*i;
                plane.position.x = squaresize*j;
                plane.receiveShadow = true;
                plane.castShadow = false;
                scene.add(plane);
            }
        }
    }

    cubeX = map.starts[0].x;
    cubeZ = map.starts[0].y;
    player_position = new Flat_Coord(map.starts[0].x, map.starts[0].y);
    
    cube.position.x = cubeX;
    cube.position.y = cubeY;
    cube.position.z = cubeZ;
    cube.castShadow = true;
    cube.receiveShadow = false;
    scene.add(cube);

    // Setup camera
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    cameraControls = new THREE.OrbitControls(camera);
    dummy.position.x = cube.position.x;
    dummy.position.y = 3;
    dummy.position.z = cube.position.z;
    cameraControls.target = dummy.position;
    camera.position.z = 0;
    camera.position.y = 15;
    camera.position.x = -15;
    camera.zoom = 2.5;
    camera.updateProjectionMatrix();
    cameraControls.update();
    
    // Add lighting to the scene
    var light = new THREE.PointLight(0x404040);
    light.position.y = 30;
    light.castShadow = true;
    light.shadowDarkness = 0.5;
    light.shadowMapWidth = 1024; // default is 512
    light.shadowMapHeight = 1024; // default is 512
    light.intensity = 3;
    scene.add(light);

    light = new THREE.AmbientLight(0x404040);
    light.intensity = 1;
    scene.add(light);
}

function init_input() {
    document.addEventListener('keydown', function(event) {
        if (inputReady === true) {
            if (event.key === "w" || event.key === "W") {
                moveBlock('z', "inc", "move");
            } else if (event.key === "a" || event.key === "A") {
                moveBlock('x', "dec", "move");
            } else if (event.key === "s" || event.key === "S") {
                moveBlock('z', "dec", "move");
            } else if (event.key === "d" || event.key === "D") {
                moveBlock('x', "inc", "move");
            } else if (event.key === "t" || event.key === "T") {
                moveBlock('z', "dec", "fall");
            } else if (event.key === "f" || event.key === "F") {
                moveBlock('x', "dec", "fall");
            } else if (event.key === "g" || event.key === "G") {
                moveBlock('z', "inc", "fall");
            } else if (event.key === "h" || event.key === "H") {
                moveBlock('x', "inc", "fall");
            }
        }
    });
}

// Adjusts the scene to the correct window size whenever the window gets resized
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function correctRot(rotation) {
    cRot = Math.abs(rotation);

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

function moveBlock(axis, dir, type) {
    var counter = 0;
    var sRot = 0;
    inputReady = false;

    cubeX = cube.position.x;
    cubeY = cube.position.y;
    cubeZ = cube.position.z;
    
    if (axis === 'x') {
        sRot = cube.rotation.x;
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
        sRot = cube.rotation.z;
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

        function quant_num(num) {
            let integer_comp = Math.floor(num);
            let remainder = num - integer_comp;
            if  (0.25 < remainder && remainder < 0.75){
                return integer_comp + 0.5;
            }else if(remainder > 0.75){
                return integer_comp + 1;
            }else{
                return integer_comp;
            }
        }

        function bepaal_eindbestemming() {

            if (!flatX && !flatZ){
                if (axis === "x"){
                    console.log("z as")
                    if (dir === "inc"){
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) + 1.5);
                    }else if (dir === "dec"){
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z)- 1.5);
                    }
                }else if (axis === "z"){
                    console.log("x as")

                    if (dir === "inc"){
                        console.log("inc")

                        return new Flat_Coord(quant_num(cube.position.x) + 1.5, quant_num(cube.position.z));
                    }else if (dir === "dec"){
                        console.log("dec")

                        return new Flat_Coord(quant_num(cube.position.x) - 1.5, quant_num(cube.position.z));
                    }
                }
            }else {
                if (flatX && axis === "x" || flatZ && axis === "x"){
                    if (dir === "inc"){
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) + 1);
                    }else if (dir === "dec"){
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) - 1);
                    }
                }else if (flatZ && axis === "z" || flatX && axis === "z"){
                    if (dir === "inc"){
                        return new Flat_Coord(quant_num(cube.position.x)+ 1, quant_num(cube.position.z));
                    }else if (dir === "dec"){
                        return new Flat_Coord(quant_num(cube.position.x) -1, quant_num(cube.position.z));
                    }
                }
            }
        }

        function save_map_get(x, y) {
            let result;
            console.log("x " + Math.floor(y) + " y " +Math.floor(x));
            try {
                result = map.layout[Math.floor(y)][Math.floor(x)];
            }catch {
                result = false;
            }
            result = !!result;
            console.log(result);
            return result;
        }

        let eindbestemming = bepaal_eindbestemming();
        console.log(eindbestemming);
        let op_speelveld;
        if (eindbestemming.x % 1 === 0 && eindbestemming.y % 1 === 0){
            op_speelveld = save_map_get(eindbestemming.x, eindbestemming.y)
        } else if (eindbestemming.x % 1 !== 0 && eindbestemming.y % 1 === 0){
            op_speelveld = save_map_get(eindbestemming.x+0.5, eindbestemming.y)
                && save_map_get(eindbestemming.x -0.5, eindbestemming.y);
        } else if (eindbestemming.x % 1 === 0 && eindbestemming.y % 1 !== 0){
            op_speelveld = save_map_get(eindbestemming.x, eindbestemming.y+0.5)
                && save_map_get(eindbestemming.x, eindbestemming.y -0.5);
        }else{
            console.log("niet afgevangen");
            console.log(cube.position)
        }

        console.log(map.layout);
        console.log(op_speelveld);
        if (!op_speelveld) {
            fall();
        }else{
            var blockMoveInterval = setInterval(function () {
                setP(sRot);

                counter++;
                cube.rotateAroundWorldAxis(p, ax, r);

                dummy.position.x = cube.position.x;
                dummy.position.z = cube.position.z;

                if (counter >= 10) {
                    cube.rotation.x = correctRot(cube.rotation.x);
                    cube.rotation.z = correctRot(cube.rotation.z);

                    toggleFlat(axis);

                    inputReady = true;
                    clearInterval(blockMoveInterval);
                }
            }, animInterval);
        }
    }
    else if (type === "fall") {
        fall();
    }
    function fall() {
        var blockFallInterval = setInterval(function () {
            setP(sRot);

            if (counter >= 9) {
                cube.position.y -= 0.2;
                cubeY = cube.position.y;
                if (axis === 'x') {
                    if (dir === "dec") {
                        cube.position.z -= 0.1;
                        cubeZ -= 0.1;
                    }
                    else if (dir === "inc") {
                        cube.position.z += 0.1;
                        cubeZ += 0.1;
                    }
                }
                else if (axis === 'z') {
                    if (dir === "dec") {
                        cube.position.x -= 0.1;
                        cubeX -= 0.1;
                    }
                    else if (dir === "inc") {
                        cube.position.x += 0.1;
                        cubeX += 0.1;
                    }
                }
            }

            counter++;
            cube.rotateAroundWorldAxis(p, ax, r);

            if (counter >= 100) {
                cube.rotation.x = correctRot(cube.rotation.x);
                cube.rotation.z = correctRot(cube.rotation.z);

                inputReady = true;
                clearInterval(blockFallInterval);
            }
        }, animInterval);
    }
}

// Changes the scene as per updated model so we see the models change   
function animate() {
    requestAnimationFrame(animate);
    cameraControls.update();
    renderer.render(scene, camera);
}

// Sets up a connection with the server and handles the server commands
function startUp(level) {
    map = level;
    init_3d(level);
    init_input();
    animate();
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

function setP(sRot) {
    if (sRot === 0) {
        p = new THREE.Vector3(cubeX + xOffset, cubeY - yOffset, cubeZ + zOffset);
    }
    else if (sRot === Math.PI / 2) {
        p = new THREE.Vector3(cubeX + yOffsetZ, cubeY - 0.5, cubeZ + yOffsetX);
    }
    else if (sRot === Math.PI) {
        p = new THREE.Vector3(cubeX + xOffset, cubeY - yOffset, cubeZ + zOffset);
    }
}
