class SkyBox extends THREE.Group {
    constructor(textPath, left, right, up, down, front, back, type) {
        super();
        var imagePrefix = "textures/" + textPath;

        var directions = [left, right, up, down, front, back];

        var imageSuffix = type;

        var skyGeometry = new THREE.CubeGeometry(1250, 1250, 1250);

        var materialArray = [];

        for (var i = 0; i < 6; i++)

            materialArray.push(new THREE.MeshBasicMaterial({

                map: THREE.ImageUtils.loadTexture(imagePrefix + directions[i] + imageSuffix),

                side: THREE.BackSide

            }));

        var skyMaterial = new THREE.MeshFaceMaterial(materialArray);

        var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
        skyBox.position.y = 0;

        this.add(skyBox);
    }
}

