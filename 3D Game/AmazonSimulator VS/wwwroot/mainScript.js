// inclare variables that are needed here so it's all grouped nicely
let camera, scene, renderer;
let cameraControls;
// Path needs to be changed for both or we keep them doesn't really matter
let modelPath = "/3dmodels/";
let texturesPath = "/textures/models/";
let dummy = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({ color: 0x000000 }));
let cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 1), new THREE.MeshPhysicalMaterial({color: 0xFF0000}));
let r = 0;
let cubeX;
let cubeY = 1;
let cubeZ;
let xOffset;
let yOffset;
let zOffset;
let yOffsetX;
let yOffsetZ;
let changeR = false;
let flatX = false;
let flatZ = false;
let counter = 0;
let animInterval = 25;
let p;
let ax;
let squaresize = 1;
let inputReady = true;
let map;
let player_position;
let animations_blocked =false;

const colors = Object.freeze({
    start_square:"",
    end_square:"",
    normal_square: "#333333"
});

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

THREE.Object3D.prototype.rotateAroundWorldAxis = function () {
    let q1 = new THREE.Quaternion();
    return function (point, axis, angle) {
        if (!animations_blocked) {

            q1.setFromAxisAngle(axis, angle);

            this.quaternion.multiplyQuaternions(q1, this.quaternion);

            this.position.sub(point);
            this.position.applyQuaternion(q1);
            this.position.add(point);
        }
        return this;
    };
}();


// Sets up all the stuff we need
function init_3d() {
    // For debugging / performance stats, could be handy dandy when trying it on a mobile device


    /*    (function () { let script = document.createElement('script'); script.onload = function () {
                let stats = new Stats();
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

    load_level();

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
    let counter = 0;
    let sRot = 0;
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
            if (0.25 < remainder && remainder <= 0.75) {
                return integer_comp + 0.5;
            } else if (remainder > 0.75) {
                return integer_comp + 1;
            } else {
                return integer_comp;
            }
        }

        function bepaal_eindbestemming() {

            if (!flatX && !flatZ) {
                if (axis === "x") {
                    if (dir === "inc") {
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) + 1.5);
                    } else if (dir === "dec") {
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) - 1.5);
                    }
                } else if (axis === "z") {
                    if (dir === "inc") {
                        return new Flat_Coord(quant_num(cube.position.x) + 1.5, quant_num(cube.position.z));
                    } else if (dir === "dec") {
                        return new Flat_Coord(quant_num(cube.position.x) - 1.5, quant_num(cube.position.z));
                    }
                }
            } else {
                if (flatZ && axis === "x") {
                    if (dir === "inc") {
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) + 1);
                    } else if (dir === "dec") {
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) - 1);
                    }
                }
                if (flatX && axis === "x") {
                    if (dir === "inc") {
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) + 1.5);
                    } else if (dir === "dec") {
                        return new Flat_Coord(quant_num(cube.position.x), quant_num(cube.position.z) - 1.5);
                    }
                } else if (flatX && axis === "z") {
                    if (dir === "inc") {
                        return new Flat_Coord(quant_num(cube.position.x) + 1, quant_num(cube.position.z));
                    } else if (dir === "dec") {
                        return new Flat_Coord(quant_num(cube.position.x) - 1, quant_num(cube.position.z));
                    }
                } else if (flatZ && axis === "z") {
                    if (dir === "inc") {
                        return new Flat_Coord(quant_num(cube.position.x) + 1.5, quant_num(cube.position.z));
                    } else if (dir === "dec") {
                        return new Flat_Coord(quant_num(cube.position.x) - 1.5, quant_num(cube.position.z));
                    }
                }
            }
        }

        function save_map_get(x, y) {
            let result;
            try {
                result = map.layout[Math.floor(y)][Math.floor(x)];
            } catch {
                result = false;
            }
            result = !!result;
            return result;
        }

        let eindbestemming = bepaal_eindbestemming();
        let op_speelveld;
        let op_speelveld2;
        if (eindbestemming.x % 1 === 0 && eindbestemming.y % 1 === 0) {
            op_speelveld = op_speelveld2 = save_map_get(eindbestemming.x, eindbestemming.y)
        } else if (eindbestemming.x % 1 !== 0 && eindbestemming.y % 1 === 0) {
            op_speelveld = save_map_get(eindbestemming.x + 0.5, eindbestemming.y)
            op_speelveld2 = save_map_get(eindbestemming.x - 0.5, eindbestemming.y);
            if (axis === "x") {
                changeR = true;
            }
            else changeR = false;
        } else if (eindbestemming.x % 1 === 0 && eindbestemming.y % 1 !== 0) {
            op_speelveld = save_map_get(eindbestemming.x, eindbestemming.y + 0.5)
            op_speelveld2 = save_map_get(eindbestemming.x, eindbestemming.y - 0.5);
            if (axis === "z") {
                changeR = true;
            }
            else changeR = false;
        } else {
            console.log("niet afgevangen");
            console.log(cube.position)
        }

        console.log(map.layout);
        console.log("opspeelveld " + op_speelveld);
        console.log("opspeelveld2 " + op_speelveld2);
        console.log("changeR" + changeR);
        if ((!op_speelveld ^ !op_speelveld2) && !changeR) {
            fall3();
            console.log("implement plz")
        }
        else if (!op_speelveld && !op_speelveld2) {
            fall();
        }
        else if (!op_speelveld && op_speelveld2) {
            fall2();
            console.log("fall2");
        }
        else if (op_speelveld && !op_speelveld2) {
            fall1();
            console.log("fall1");
        }
        else {
            let blockMoveInterval = setInterval(function () {
                setP(sRot);

                counter++;
                cube.rotateAroundWorldAxis(p, ax, r);

                dummy.position.x = cube.position.x;
                dummy.position.z = cube.position.z;

                if (counter >= 10) {
                    cube.rotation.x = correctRot(cube.rotation.x);
                    cube.rotation.z = correctRot(cube.rotation.z);

                    toggleFlat(axis);
                    eindcheck(eindbestemming);
                    console.log(cube.position);

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

        let blockFallInterval = setInterval(function () {
            if (animations_blocked) {
                clearInterval(blockFallInterval);
                animations_blocked = false;
            } else {
                setP(sRot);

                if (counter >= 10) {
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
                    changeR = false;
                    clearInterval(blockFallInterval);
                }
            }
        }, animInterval);
    }

    function fall1() {
        let blockFallInterval = setInterval(function () {
            if (animations_blocked) {
                clearInterval(blockFallInterval);
                animations_blocked = false;

            } else {
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

                setP(sRot);

                if (counter >= 20 && counter < 30) {
                    cubeY = cube.position.y -= 0.1;
                }
                else if (counter >= 30) {
                    cube.position.y -= 0.1;
                    cubeY = cube.position.y;
                    if (axis === 'z') {
                        if (dir === "dec") {
                            cube.position.z -= 0.1;
                            cubeZ -= 0.1;
                        }
                        else if (dir === "inc") {
                            cube.position.z += 0.1;
                            cubeZ += 0.1;
                        }
                    }
                    else if (axis === 'x') {
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
                    changeR = false;
                    clearInterval(blockFallInterval);
                }
            }
        }, animInterval);
    }

    function fall2() {
        let blockFallInterval = setInterval(function () {
            if (animations_blocked) {
                clearInterval(blockFallInterval);
                animations_blocked = false;
            } else {
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

                setP(sRot);

                if (counter >= 20 && counter < 30) {
                    cubeY = cube.position.y -= 0.1;
                }
                else if (counter >= 30) {
                    cube.position.y -= 0.1;
                    cubeY = cube.position.y;
                    if (axis === 'z') {
                        if (dir === "dec") {
                            cube.position.z -= 0.1;
                            cubeZ -= 0.1;
                        }
                        else if (dir === "inc") {
                            cube.position.z += 0.1;
                            cubeZ += 0.1;
                        }
                    }
                    else if (axis === 'x') {
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
                    changeR = false;
                    clearInterval(blockFallInterval);
                }
            }
        }, animInterval);
    }

    function fall3() {
        let blockFallInterval = setInterval(function () {
            if (animations_blocked) {
                clearInterval(blockFallInterval);
                animations_blocked = false;
            } else {

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
                setP(sRot);
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
                    clearInterval(blockFallInterval);
                }
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

function restart() {
    animations_blocked = true;
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }

    dummy = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshPhysicalMaterial({ color: 0x000000 }));
    cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 1), new THREE.MeshPhysicalMaterial({color: 0xFF0000}));
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

    load_level();
}

function load_level() {

    // Setup our 1st test map
    let geometry = new THREE.PlaneGeometry(squaresize, squaresize);
    let material = new THREE.MeshPhongMaterial({ color: colors.normal_square, side: THREE.DoubleSide });

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
    let light = new THREE.PointLight(0x404040);
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

    //animations_blocked = false;
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

function eindcheck(coord) {
    console.log("checking");
    console.log(coord)
    if (map.ends[0].x === coord.x && map.ends[0].y === coord.y ){
        console.log("gewonnen")
    }
}
