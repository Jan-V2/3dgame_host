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
var dummy = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x000000 }));
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 1), new THREE.MeshBasicMaterial({color: 0xFF0000}));
var r = 0;
var cubeX = 15;
var cubeY = 1;
var cubeZ = 15;
var flatX = false;
var p;
var ax;
let orbit_controls;
var inputReady = true;

// Set up the loadingScreen / path on line 18 doesn't exist anymore needs to be changed
var loadingScreen = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100),
    box: new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 0), new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/models/misctextures/rmportal.png"), side: THREE.DoubleSide, transparent: true, opacity: 1.0 })
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
    }

}();

// Once the window has opened this function springs to life
window.onload = function () {
    startUp();
}

// Sets up all the stuff we need
function init_3d() {
    // For debugging / performance stats, could be handy dandy when trying it on a mobile device
    (function () { var script = document.createElement('script'); script.onload = function () { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//rawgit.com/mrdoob/stats.js/master/build/stats.min.js'; document.head.appendChild(script); })();

    

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
    document.body.appendChild(renderer.domElement);

    // Continuesly check if the window gets resized
    window.addEventListener('resize', onWindowResize, false);

    // Setup our 1st test map
    var geometry = new THREE.PlaneGeometry(30, 30, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = Math.PI / 2.0;
    plane.position.x = 15;
    plane.position.z = 15;
    scene.add(plane);
    
    cube.position.x = cubeX;
    cube.position.y = cubeY;
    cube.position.z = cubeZ;
    scene.add(cube);

    // Setup camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    cameraControls = new THREE.OrbitControls(camera);
    camera.position.z = 30;
    camera.position.y = 5;
    camera.position.x = 15;
    cameraControls.update();

    // Add lighting to the scene
    var light = new THREE.AmbientLight(0x404040);
    light.intensity = 4;
    scene.add(light);
}

function init_input() {
    document.addEventListener('keydown', function(event) {
        if ((event.key === "w" || event.key === "W") && inputReady === true) {
            inputReady = false;
            var nRot = cube.rotation.x + Math.PI / 2;
            var sRot = cube.rotation.x;
            var counter = 0;

            cubeX = cube.position.x;
            cubeY = cube.position.y;
            cubeZ = cube.position.z;

            console.log(cube.position.x);
            console.log(cube.position.y);
            console.log(cube.position.z);

            var i = setInterval(function () {
                if (sRot === 0) {
                    r = -Math.PI / 20;
                    p = new THREE.Vector3(cubeX, cubeY - 1, cubeZ - 0.5);
                    ax = new THREE.Vector3(1, 0, 0);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI / 2) {
                    r = -Math.PI / 20;
                    p = new THREE.Vector3(cubeX, cubeY - 0.5, cubeZ - 1);
                    ax = new THREE.Vector3(1, 0, 0);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI) {
                    r = -Math.PI / 20;
                    p = new THREE.Vector3(cubeX, cubeY - 1, cubeZ - 0.5);
                    ax = new THREE.Vector3(1, 0, 0);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                console.log(cube.position.x);
                console.log(cube.position.y);
                console.log(cube.position.z);
                counter++;
                if (counter >= 10) {
                    cRot = Math.abs(cube.rotation.x);

                    if (cRot <= Math.PI / 2 + 0.1 && cRot >= Math.PI / 2 - 0.1) {
                        cube.rotation.x = Math.PI / 2;
                    }
                    else if (cRot <= Math.PI + 0.1 && cRot >= Math.PI - 0.1) {
                        cube.rotation.x = Math.PI;
                    }
                    else if (cRot <= (Math.PI * 1.5) + 0.1 && cRot >= (Math.PI * 1.5) - 0.1) {
                        cube.rotation.x = Math.PI * 1.5;
                    }
                    else if (cRot <= (Math.PI * 2) + 0.1 && cRot >= (Math.PI * 2) - 0.1) {
                        cube.rotation.x = 0;
                    }
                    else if (cRot <= 0.1 && cRot >= -0.1) {
                        cube.rotation.x = 0;
                    }

                    inputReady = true;
                    clearInterval(i);
                }
                }, 20);

            console.log("rot:" + cube.rotation.x);

            if (flatX) {
                flatX = false;
            }
            else {
                flatX = true;
            }
            console.log(flatX);
        }else if ((event.key === "a" || event.key === "A") && inputReady === true){
            inputReady = false;
            nRot = cube.rotation.z + Math.PI / 2;
            sRot = cube.rotation.z;
            counter = 0;

            cubeX = cube.position.x;
            cubeY = cube.position.y;
            cubeZ = cube.position.z;

            console.log(cube.position.x);
            console.log(cube.position.y);
            console.log(cube.position.z);

            var k = setInterval(function () {
                if (sRot === 0) {
                    r = Math.PI / 20;
                    p = new THREE.Vector3(cubeX - 0.5, cubeY - 1, cubeZ);
                    ax = new THREE.Vector3(0, 0, 1);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI / 2) {
                    r = Math.PI / 20;
                    p = new THREE.Vector3(cubeX - 1, cubeY - 0.5, cubeZ);
                    ax = new THREE.Vector3(0, 0, 1);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI) {
                    r = Math.PI / 20;
                    p = new THREE.Vector3(cubeX - 0.5, cubeY - 1, cubeZ);
                    ax = new THREE.Vector3(0, 0, 1);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                console.log(cube.position.x);
                console.log(cube.position.y);
                console.log(cube.position.z);
                counter++;
                if (counter >= 10) {
                    cRot = Math.abs(cube.rotation.z);

                    if (cRot <= Math.PI / 2 + 0.1 && cRot >= Math.PI / 2 - 0.1) {
                        cube.rotation.z = Math.PI / 2;
                    }
                    else if (cRot <= Math.PI + 0.1 && cRot >= Math.PI - 0.1) {
                        cube.rotation.z = Math.PI;
                    }
                    else if (cRot <= (Math.PI * 1.5) + 0.1 && cRot >= (Math.PI * 1.5) - 0.1) {
                        cube.rotation.z = Math.PI * 1.5;
                    }
                    else if (cRot <= (Math.PI * 2) + 0.1 && cRot >= (Math.PI * 2) - 0.1) {
                        cube.rotation.z = 0;
                    }
                    else if (cRot <= 0.1 && cRot >= -0.1) {
                        cube.rotation.z = 0;
                    }

                    inputReady = true;
                    clearInterval(k);
                }
            }, 20);

            console.log("rot:" + cube.rotation.z);


            if (flatZ) {
                flatZ = false;
            }
            else {
                flatZ = true;
            }
            console.log(flatZ);
        }else if ((event.key === "s" || event.key === "S") && inputReady === true){
            inputReady = false;
            nRot = cube.rotation.x + Math.PI / 2;
            sRot = cube.rotation.x;
            counter = 0;

            cubeX = cube.position.x;
            cubeY = cube.position.y;
            cubeZ = cube.position.z;

            console.log(cube.position.x);
            console.log(cube.position.y);
            console.log(cube.position.z);

            var j = setInterval(function () {
                if (sRot === 0) {
                    r = Math.PI / 20;
                    p = new THREE.Vector3(cubeX, cubeY - 1, cubeZ + 0.5);
                    ax = new THREE.Vector3(1, 0, 0);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI / 2) {
                    r = Math.PI / 20;
                    p = new THREE.Vector3(cubeX, cubeY - 0.5, cubeZ + 1);
                    ax = new THREE.Vector3(1, 0, 0);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI) {
                    r = Math.PI / 20;
                    p = new THREE.Vector3(cubeX, cubeY - 1, cubeZ + 0.5);
                    ax = new THREE.Vector3(1, 0, 0);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                console.log(cube.position.x);
                console.log(cube.position.y);
                console.log(cube.position.z);
                counter++;
                if (counter >= 10) {
                    cRot = Math.abs(cube.rotation.x);

                    if (cRot <= Math.PI / 2 + 0.1 && cRot >= Math.PI / 2 - 0.1) {
                        cube.rotation.x = Math.PI / 2;
                    }
                    else if (cRot <= Math.PI + 0.1 && cRot >= Math.PI - 0.1) {
                        cube.rotation.x = Math.PI;
                    }
                    else if (cRot <= (Math.PI * 1.5) + 0.1 && cRot >= (Math.PI * 1.5) - 0.1) {
                        cube.rotation.x = Math.PI * 1.5;
                    }
                    else if (cRot <= (Math.PI * 2) + 0.1 && cRot >= (Math.PI * 2) - 0.1) {
                        cube.rotation.x = 0;
                    }
                    else if (cRot <= 0.1 && cRot >= -0.1) {
                        cube.rotation.x = 0;
                    }

                    inputReady = true;
                    clearInterval(j);
                }
            }, 20);

            console.log("rot:" + cube.rotation.x);
            

            if (flatX) {
                flatX = false;
            }
            else {
                flatX = true;
            }
            console.log(flatX);
        } else if ((event.key === "d" || event.key === "D") && inputReady === true) {
            inputReady = false;
            nRot = cube.rotation.z + Math.PI / 2;
            sRot = cube.rotation.z;
            counter = 0;

            cubeX = cube.position.x;
            cubeY = cube.position.y;
            cubeZ = cube.position.z;

            console.log(cube.position.x);
            console.log(cube.position.y);
            console.log(cube.position.z);

            var m = setInterval(function () {
                if (sRot === 0) {
                    r = -Math.PI / 20;
                    p = new THREE.Vector3(cubeX + 0.5, cubeY - 1, cubeZ);
                    ax = new THREE.Vector3(0, 0, 1);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI / 2) {
                    r = -Math.PI / 20;
                    p = new THREE.Vector3(cubeX + 1, cubeY - 0.5, cubeZ);
                    ax = new THREE.Vector3(0, 0, 1);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                else if (sRot === Math.PI) {
                    r = -Math.PI / 20;
                    p = new THREE.Vector3(cubeX + 0.5, cubeY - 1, cubeZ);
                    ax = new THREE.Vector3(0, 0, 1);
                    cube.rotateAroundWorldAxis(p, ax, r);
                }
                console.log(cube.position.x);
                console.log(cube.position.y);
                console.log(cube.position.z);
                counter++;
                if (counter >= 10) {
                    cRot = Math.abs(cube.rotation.z);

                    if (cRot <= Math.PI / 2 + 0.1 && cRot >= Math.PI / 2 - 0.1) {
                        cube.rotation.z = Math.PI / 2;
                    }
                    else if (cRot <= Math.PI + 0.1 && cRot >= Math.PI - 0.1) {
                        cube.rotation.z = Math.PI;
                    }
                    else if (cRot <= (Math.PI * 1.5) + 0.1 && cRot >= (Math.PI * 1.5) - 0.1) {
                        cube.rotation.z = Math.PI * 1.5;
                    }
                    else if (cRot <= (Math.PI * 2) + 0.1 && cRot >= (Math.PI * 2) - 0.1) {
                        cube.rotation.z = 0;
                    }
                    else if (cRot <= 0.1 && cRot >= -0.1) {
                        cube.rotation.z = 0;
                    }

                    inputReady = true;
                    clearInterval(m);
                }
            }, 20);

            console.log("rot:" + cube.rotation.z);


            /*if (flatZ) {
                flatZ = false;
            }
            else {
                flatZ = true;
            }*/
            console.log(flatZ);
        }
        console.log("input send");
    });
    console.log("input initted");
}

// Adjusts the scene to the correct window size whenever the window gets resized 
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
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
function startUp() {
    init_3d();
    init_input();
    animate();
    r = Math.PI / 100;
}


