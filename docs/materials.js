
// object that contains all the textures used in the game.
class Materials {
    constructor(sizeX, sizeY, sizeZ, name, cast, receive) {
        var geometry = new THREE.BoxGeometry(sizeX, sizeY, sizeZ);
        var cubeMaterials;
        if (name === "cube") {
            cubeMaterials = [
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTexLg.png"), side: THREE.FrontSide }), //LEFT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTexLg.png"), side: THREE.FrontSide }), //RIGHT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.FrontSide }), //TOP
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTex.png"), side: THREE.FrontSide }), //BOTTOM
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTexLg.png"), side: THREE.FrontSide }), //FRONT
                new THREE.MeshPhysicalMaterial({ map: new THREE.TextureLoader().load("textures/JukeboxTexLg.png"), side: THREE.FrontSide }) //BACK
            ];
        }
        else if (name === "plane") {
            cubeMaterials = [
                new THREE.MeshPhongMaterial({ color: 0xD8D8D8, side: THREE.FrontSide }), //LEFT
                new THREE.MeshPhongMaterial({ color: 0xD8D8D8, side: THREE.FrontSide }), //RIGHT
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/IronTex.png"), side: THREE.FrontSide }), //TOP
                new THREE.MeshPhongMaterial({ color: 0xD8D8D8, side: THREE.FrontSide }), //BOTTOM
                new THREE.MeshPhongMaterial({ color: 0xD8D8D8, side: THREE.FrontSide }), //FRONT
                new THREE.MeshPhongMaterial({ color: 0xD8D8D8, side: THREE.FrontSide }) //BACK
            ];
        }
        else if (name === "fragile") {
            cubeMaterials = [
                new THREE.MeshPhongMaterial({ color: 0x878787, side: THREE.FrontSide }), //LEFT
                new THREE.MeshPhongMaterial({ color: 0x878787, side: THREE.FrontSide }), //RIGHT
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/IronFragileTex.png"), side: THREE.FrontSide }), //TOP
                new THREE.MeshPhongMaterial({ color: 0x878787, side: THREE.FrontSide }), //BOTTOM
                new THREE.MeshPhongMaterial({ color: 0x878787, side: THREE.FrontSide }), //FRONT
                new THREE.MeshPhongMaterial({ color: 0x878787, side: THREE.FrontSide }) //BACK
            ];
        }
        else if (name === "trigger") {
            cubeMaterials = [
                new THREE.MeshPhongMaterial({ color: 0xFFD637, side: THREE.FrontSide }), //LEFT
                new THREE.MeshPhongMaterial({ color: 0xFFD637, side: THREE.FrontSide }), //RIGHT
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/GoldTex.png"), side: THREE.FrontSide }), //TOP
                new THREE.MeshPhongMaterial({ color: 0xFFD637, side: THREE.FrontSide }), //BOTTOM
                new THREE.MeshPhongMaterial({ color: 0xFFD637, side: THREE.FrontSide }), //FRONT
                new THREE.MeshPhongMaterial({ color: 0xFFD637, side: THREE.FrontSide }) //BACK
            ];
        }
        else if (name === "antiTrigger") {
            cubeMaterials = [
                new THREE.MeshPhongMaterial({ color: 0xD71404, side: THREE.FrontSide }), //LEFT
                new THREE.MeshPhongMaterial({ color: 0xD71404, side: THREE.FrontSide }), //RIGHT
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/RedTex.png"), side: THREE.FrontSide }), //TOP
                new THREE.MeshPhongMaterial({ color: 0xD71404, side: THREE.FrontSide }), //BOTTOM
                new THREE.MeshPhongMaterial({ color: 0xD71404, side: THREE.FrontSide }), //FRONT
                new THREE.MeshPhongMaterial({ color: 0xD71404, side: THREE.FrontSide }) //BACK
            ];
        }
        else if (name === "bridge") {
            cubeMaterials = [
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //LEFT
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //RIGHT
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.FrontSide }), //TOP
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //BOTTOM
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //FRONT
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }) //BACK
            ];
        }
        else if (name === "antiBridge") {
            cubeMaterials = [
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //LEFT
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //RIGHT
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/PlanksTex.png"), side: THREE.FrontSide }), //TOP
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //BOTTOM
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }), //FRONT
                new THREE.MeshPhongMaterial({ color: 0x74603A, side: THREE.FrontSide }) //BACK
            ];
        }
        else if (name === "end") {
            cubeMaterials = [
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.BackSide }), //LEFT
                new THREE.MeshPhongMaterial({ visible: false }), //RIGHT
                new THREE.MeshPhongMaterial({ visible: false }), //TOP
                new THREE.MeshPhongMaterial({ visible: false }), //BOTTOM
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.BackSide }), //FRONT
                new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/DiamondTex.png"), side: THREE.BackSide }) //BACK
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