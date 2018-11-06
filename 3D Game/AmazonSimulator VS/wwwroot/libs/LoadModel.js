class Model extends THREE.Group {

    constructor(modelPath, modelName, texturePath, textureName, onload) {
        super();
        new THREE.MTLLoader()
            .setPath(texturePath)
            .setMaterialOptions({ side: THREE.DoubleSide })
            .load(textureName, function (materials) {
                materials.preload();
                new THREE.OBJLoader()
                    .setPath(modelPath)
                    .setMaterials(materials)
                    .load(modelName, function (object) {
                        onload(object);
                    }, function () { }, function (e) { console.log("Error loading model"); console.log(e); });
            });
    }
}