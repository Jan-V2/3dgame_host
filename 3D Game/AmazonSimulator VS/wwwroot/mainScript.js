// Declare variables that are needed here so it's all grouped nicely
var camera, scene, renderer;
var cameraControls;
var exampleSocket;
// Path needs to be changed for both or we keep them doesn't really matter
var modelPath = "/3dmodels/";
var texturesPath = "/textures/models/";
var worldObjects = {};
var LoadingManager = null;
// Chack for the Loading Screen which will follow in a sec
var RESOURCES_LOADED = false;
var selfRef = this;
var dummy = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({ color: 0x000000 }));
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 1), new THREE.MeshPhysicalMaterial({color: 0xFF0000}));
var r = 0;
var cubeX = 15;
var cubeY = 1;
var cubeZ = 15;
var flatX = false;
var flatZ = false;
var counter = 0;
var animInterval = 20;
var p;
var ax;
let orbit_controls;
var inputReady = true;

// Set up the loadingScreen / path on line 18 doesn't exist anymore needs to be changed
var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100),
    box: new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 0), new THREE.MeshBasicMaterial(
        {
            map: new THREE.TextureLoader().load("textures/models/misctextures/rmportal.png"),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1.0 })
    )
};

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
function init_3d(map) {
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
    )();
    
    // Setup camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraControls = new THREE.OrbitControls(camera);
    camera.position.z = 15;
    camera.position.y = 5;
    camera.position.x = 15;
    cameraControls.update();

    // Create Scene
    scene = new THREE.Scene();

    /* Show the loadingScreen
    loadingScreen.box.position.set(0, 0, 2);
    loadingScreen.camera.lookAt(loadingScreen.box.position);
    loadingScreen.scene.add(loadingScreen.box);
    */

    /* Setup the loading Manager / needed for the LoadingScreen otherwise we'll have an infinite loading screen lol
    loadingManager = new THREE.LoadingManager();

    loadingManager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    loadingManager.onLoad = function () {
        console.log("Loaded all resources!");
        RESOURCES_LOADED = true;
    };
    */

    /* Handles the skybox in the scene / added like shown <Path, leftside, rightside, upside, downside, frontside, backside, image type>
    skyBox = new SkyBox("path", "left", "right", "up", "down", "front", "back", ".png");
    scene.add(skyBox);
    */

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

    var geometry = new THREE.PlaneGeometry(31, 31);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2.0;
    plane.position.x = 15;
    plane.position.z = 15;
    plane.receiveShadow = true;
    plane.castShadow = false;
    scene.add(plane);
    
    cube.position.x = cubeX;
    cube.position.y = cubeY;
    cube.position.z = cubeZ;
    cube.castShadow = true;
    cube.receiveShadow = false;
    scene.add(cube);

    // Setup camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraControls = new THREE.OrbitControls(camera);
    dummy.position.x = cube.position.x;
    dummy.position.y = 3;
    dummy.position.z = cube.position.z;
    cameraControls.target = dummy.position;
    camera.position.z = 35;
    camera.position.y = 15;
    camera.position.x = 15;
    cameraControls.update();

    for (let i = 0; i < map.layout.length; i++) {
        for (let j = 0; j < map.layout[0].length; j++) {
            if (map.layout[i][j]){
                let plane = new THREE.Mesh(geometry, material);
                plane.rotation.x = Math.PI / 2.0;
                plane.position.x = 5*i;
                plane.position.z = 5*j;
                scene.add(plane);
            }
        }
    }
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
                moveBlock('x', "inc", "move");
            } else if (event.key === "a" || event.key === "A") {
                moveBlock('z', "inc", "move");
            } else if (event.key === "s" || event.key === "S") {
                moveBlock('x', "dec", "move");
            } else if (event.key === "d" || event.key === "D") {
                moveBlock('z', "dec", "move");
            } else if (event.key === "t" || event.key === "T") {
                moveBlock('x', "inc", "fall");
            } else if (event.key === "f" || event.key === "F") {
                moveBlock('z', "inc", "fall");
            } else if (event.key === "g" || event.key === "G") {
                moveBlock('x', "dec", "fall");
            } else if (event.key === "h" || event.key === "H") {
                moveBlock('z', "dec", "fall");
            }
            console.log("input send");
        }
            console.log("posX: " + cube.position.x);
    });
    console.log("input initted");
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

    console.log(cube.position.y);

    if (axis === 'x') {
        sRot = cube.rotation.x;
        ax = new THREE.Vector3(1, 0, 0);

        if (flatZ) {
            yOffset = 0.5;
        }
        else {
            yOffset = 1;
        }

        if (dir === "inc") {
            r = -Math.PI / 20;
            zOffset = -0.5;
            yOffsetX = yOffset * -1;
            yOffsetZ = 0;
            xOffset = 0;
        }
        else if (dir === "dec") {
            r = Math.PI / 20;
            zOffset = 0.5;
            yOffsetX = yOffset;
            yOffsetZ = 0;
            xOffset = 0;
        }
    }
    else if (axis === 'z') {
        sRot = cube.rotation.z;
        ax = new THREE.Vector3(0, 0, 1);

        if (flatX) {
            yOffset = 0.5;
        }
        else {
            yOffset = 1;
        }

        if (dir === "inc") {
            r = Math.PI / 20;
            xOffset = -0.5;
            yOffsetZ = yOffset * -1;
            yOffsetX = 0;
            zOffset = 0;
        }
        else if (dir === "dec") {
            r = -Math.PI / 20;
            xOffset = 0.5;
            yOffsetZ = yOffset;
            yOffsetX = 0;
            zOffset = 0;
        }
    }

    if (type === "move") {
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

                console.log("zflat: " + flatZ);
                console.log("xflat: " + flatX);
                console.log(cube.position.y);
                console.log(cube.rotation.z);

                inputReady = true;
                clearInterval(blockMoveInterval);
            }
        }, animInterval);
    }
    else if (type === "fall") {
        var blockFallInterval = setInterval(function () {
            setP(sRot);

            if (counter >= 9) {
                cube.position.y -= 0.2;
                cubeY = cube.position.y;
                if (axis === 'x') {
                    if (dir === "inc") {
                        cube.position.z -= 0.1;
                        cubeZ -= 0.1;
                    }
                    else if (dir === "dec") {
                        cube.position.z += 0.1;
                        cubeZ += 0.1;
                    }
                }
                else if (axis === 'z') {
                    if (dir === "inc") {
                        cube.position.x -= 0.1;
                        cubeX -= 0.1;
                    }
                    else if (dir === "dec") {
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
    /* Implements the LoadingScreen
    if (RESOURCES_LOADED == false) {
        requestAnimationFrame(animate);

        renderer.render(loadingScreen.scene, loadingScreen.camera);
        return;
    }
    */
    requestAnimationFrame(animate);
    cameraControls.update();
    renderer.render(scene, camera);
}

// Sets up a connection with the server and handles the server commands
window.onload = function startUp() {
    init_3d();
    init_input();
    animate();

    console.log("zflat: " + flatZ);
    console.log("xflat: " + flatX);
}

function toggleFlat(axis) {
    if (axis === 'x') {
        if (!flatZ) {
            if (flatX) {
                flatX = false;
            }
            else {
                flatX = true;
            }
        }
    }
    else if (axis === 'z') {
        if (!flatX) {
            if (flatZ) {
                flatZ = false;
            }
            else {
                flatZ = true;
            }
        }
    }
}

function setP(sRot) {
    if (sRot === 0) {
        p = new THREE.Vector3(cubeX + xOffset, cubeY - yOffset, cubeZ + zOffset);
    }
    else if (sRot === Math.PI / 2) {
        p = new THREE.Vector3(cubeX + yOffsetX, cubeY - 0.5, cubeZ + yOffsetZ);
    }
    else if (sRot === Math.PI) {
        p = new THREE.Vector3(cubeX + xOffset, cubeY - yOffset, cubeZ + zOffset);
    }
}
