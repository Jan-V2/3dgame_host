class createObject {
    constructor(sizeX, sizeY, sizeZ, name, cast, receive) {
        var geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        var cubeMaterials;
        if (name === "cube") {
            cubeMaterials = [
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.DoubleSide }), //LEFT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.DoubleSide }), //RIGHT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.DoubleSide }), //TOP
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.DoubleSide }), //BOTTOM
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.DoubleSide }), //FRONT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.DoubleSide }), //BACK
            ];
        }
        else if (name === "plane") {
            cubeMaterials = [
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/RockTex.png"), side: THREE.DoubleSide }), //LEFT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/RockTex.png"), side: THREE.DoubleSide }), //RIGHT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/RockTex.png"), side: THREE.DoubleSide }), //TOP
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/RockTex.png"), side: THREE.DoubleSide }), //BOTTOM
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/RockTex.png"), side: THREE.DoubleSide }), //FRONT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/RockTex.png"), side: THREE.DoubleSide }), //BACK
            ];
        }
        else if (name === "trigger") {
            cubeMaterials = [
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/GoldTex.png"), side: THREE.DoubleSide }), //LEFT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/GoldTex.png"), side: THREE.DoubleSide }), //RIGHT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/GoldTex.png"), side: THREE.DoubleSide }), //TOP
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/GoldTex.png"), side: THREE.DoubleSide }), //BOTTOM
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/GoldTex.png"), side: THREE.DoubleSide }), //FRONT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/GoldTex.png"), side: THREE.DoubleSide }), //BACK
            ];
        }
        else if (name === "bridge") {
            cubeMaterials = [
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.DoubleSide }), //LEFT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.DoubleSide }), //RIGHT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.DoubleSide }), //TOP
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.DoubleSide }), //BOTTOM
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.DoubleSide }), //FRONT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.DoubleSide }), //BACK
            ];
        }
        else if (name === "end") {
            cubeMaterials = [
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.DoubleSide }), //LEFT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.DoubleSide }), //RIGHT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.DoubleSide }), //TOP
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.DoubleSide }), //BOTTOM
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.DoubleSide }), //FRONT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.DoubleSide }), //BACK
            ];
        }

        var material = new THREE.MeshFaceMaterial(cubeMaterials);
        var object = new THREE.Mesh(geometry, material);

        object.name = name;
        object.castShadow = cast;
        object.receiveShadow = receive;

        return object;
    }
}