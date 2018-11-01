// inclare variables that are needed here so it's all grouped nicely
var camera, scene, renderer;
var cameraControls;
// Path needs to be changed for both or we keep them doesn't really matter
var modelPath = "/3dmodels/";
var texturesPath = "/textures/models/";
var dummy = new THREE.Object3D;
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
var changeR = false;
var flatX = false;
var flatZ = false;
var counter = 0;
var animInterval = 22;
var p;
var ax;
let squareSize = 1;
var inputReady = true;
let map;
let playerPosition;

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

// Sets up a connection with the server and handles the server commands
function startUp(level) {
    map = level;
    init3d(level);
    initInput();
    animate();
}

// Sets up all the stuff we need
function init3d() {
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
    window.addEventListener('resize', onWindowResize, false);

    // Setup the materials for the groundplanes
    var geometry = new THREE.PlaneGeometry(squareSize, squareSize);
    var material = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });

    // Create the groundplanes
    for (let i = 0; i < map.layout.length; i++) {
        for (let j = 0; j < map.layout[0].length; j++) {
            if (map.layout[i][j]){
                let plane = new THREE.Mesh(geometry, material);
                plane.rotation.x = Math.PI / 2.0;
                plane.position.z = squareSize*i;
                plane.position.x = squareSize*j;
                plane.receiveShadow = true;
                plane.castShadow = false;
                scene.add(plane);
            }
        }
    }

    cubeX = map.starts[0].x;
    cubeZ = map.starts[0].y;
    playerPosition = new flatCoord(map.starts[0].x, map.starts[0].y);

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
    camera.position.z = dummy.position.z - 3;
    camera.position.y = 15;
    camera.position.x = dummy.position.x - 20;
    camera.zoom = 2.5;
    camera.updateProjectionMatrix();
    cameraControls.update();

    // Add lighting to the scene
    var light = new THREE.PointLight(0x404040);
    light.position.x = -40;
    light.position.z = -40;
    light.position.y = 60;
    light.castShadow = true;
    light.shadowMapWidth = 2048; // default is 512
    light.shadowMapHeight = 2048; // default is 512
    light.intensity = 3;
    scene.add(light);

    light = new THREE.AmbientLight(0x404040);
    light.intensity = 2;
    scene.add(light);
}

function initInput() {
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
        } else if (endpoint.x % 1 !== 0 && endpoint.y % 1 === 0){
            validSpace = saveMapGet(endpoint.x+0.5, endpoint.y)
            validSpace2 = saveMapGet(endpoint.x - 0.5, endpoint.y);
            if (axis === "x") {
                changeR = true;
            }
            else changeR = false;
        } else if (endpoint.x % 1 === 0 && endpoint.y % 1 !== 0){
            validSpace = saveMapGet(endpoint.x, endpoint.y+0.5)
            validSpace2 = saveMapGet(endpoint.x, endpoint.y - 0.5);
            if (axis === "z") {
                changeR = true;
            }
            else changeR = false;
        }else{
            console.log("niet afgevangen");
            console.log(cube.position)
        }

        console.log(map.layout);
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
        var blockMoveInterval = setInterval(function () {
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
                winCheck(givenEndpoint);
                console.log(cube.position);

                inputReady = true;

                clearInterval(blockMoveInterval);
            }
        }, animInterval);
    }

    function fall() {
        var blockFallInterval = setInterval(function () {
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
                clearInterval(blockFallInterval);
            }
        }, animInterval);
    }

    function fall1() {
        var blockFallInterval = setInterval(function () {
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
                clearInterval(blockFallInterval);
            }
        }, animInterval);
    }

    function fall2() {
        var blockFallInterval = setInterval(function () {
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
                clearInterval(blockFallInterval);
            }
        }, animInterval);
    }

    function fall3() {
        var blockFallInterval = setInterval(function () {
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
                clearInterval(blockFallInterval);
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
                console.log("z as")
                if (dir === "inc") {
                    return new flatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1.5);
                } else if (dir === "dec") {
                    return new flatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1.5);
                }
            } else if (axis === "z") {
                console.log("x as")

                if (dir === "inc") {
                    console.log("inc")

                    return new flatCoord(quantNum(cube.position.x) + 1.5, quantNum(cube.position.z));
                } else if (dir === "dec") {
                    console.log("dec")

                    return new flatCoord(quantNum(cube.position.x) - 1.5, quantNum(cube.position.z));
                }
            }
        } else {
            if (flatZ && axis === "x") {
                if (dir === "inc") {
                    return new flatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1);
                } else if (dir === "dec") {
                    return new flatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1);
                }
            } if (flatX && axis === "x") {
                if (dir === "inc") {
                    return new flatCoord(quantNum(cube.position.x), quantNum(cube.position.z) + 1.5);
                } else if (dir === "dec") {
                    return new flatCoord(quantNum(cube.position.x), quantNum(cube.position.z) - 1.5);
                }
            } else if (flatX && axis === "z") {
                if (dir === "inc") {
                    return new flatCoord(quantNum(cube.position.x) + 1, quantNum(cube.position.z));
                } else if (dir === "dec") {
                    return new flatCoord(quantNum(cube.position.x) - 1, quantNum(cube.position.z));
                }
            } else if (flatZ && axis === "z") {
                if (dir === "inc") {
                    return new flatCoord(quantNum(cube.position.x) + 1.5, quantNum(cube.position.z));
                } else if (dir === "dec") {
                    return new flatCoord(quantNum(cube.position.x) - 1.5, quantNum(cube.position.z));
                }
            }
        }
    }

    function saveMapGet(x, y) {
        let result;
        console.log("x " + Math.floor(y) + " y " + Math.floor(x));
        try {
            result = map.layout[Math.floor(y)][Math.floor(x)];
        } catch {
            result = false;
        }
        result = !!result;
        console.log(result);
        return result;
    }

    function winCheck(coord) {
        console.log("checking");
        console.log(coord)

        if (map.ends[0].x === coord.x && map.ends[0].y === coord.y) {
            console.log("gewonnen")
        }
    }
}

function flatCoord(x, y) {
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
