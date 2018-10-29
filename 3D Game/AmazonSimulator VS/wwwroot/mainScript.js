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
let orbit_controls;

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



// Sets up all the stuff we need
function init_3d() {
    // For debugging / performance stats, could be handy dandy when trying it on a mobile device
    (function () { var script = document.createElement('script'); script.onload = function () {
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
    
    //$("#game")[0].appendChild(renderer.domElement);
    renderer.domElement.setAttribute("id", "three_renderer");

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

    // Add lighting to the scene
    var light = new THREE.AmbientLight(0x404040);
    light.intensity = 4;
    scene.add(light);

    var box_geometry = new THREE.BoxGeometry(0.9, 0.3, 0.9);
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_side.png"), side: THREE.DoubleSide }), //LEFT
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_side.png"), side: THREE.DoubleSide }), //RIGHT
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_top.png"), side: THREE.DoubleSide }), //TOP
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_bottom.png"), side: THREE.DoubleSide }), //BOTTOM
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_front.png"), side: THREE.DoubleSide }), //FRONT
        new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/robot_front.png"), side: THREE.DoubleSide }), //BACK
    ];
    var material = new THREE.MeshFaceMaterial(cubeMaterials);
    var robot = new THREE.Mesh(geometry, material);

    scene.add(robot);
}

function init_input() {
    // todo handelt wasd inpu door het over de websocket niet meer bestaat te sturen die
    document.addEventListener('keydown', function(event) {
        if (event.key === "w" || event.key === "W"){
            exampleSocket.send("w");
        }else if (event.key === "a" || event.key === "A"){
            exampleSocket.send("a");
        }else if (event.key === "s" || event.key === "S"){
            exampleSocket.send("s");
        }else if (event.key === "d" || event.key === "D"){
            exampleSocket.send("d");
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

// Once the window has opened this function springs to life
window.onload = function () {
    init_3d();
    init_input();
    animate();
};

