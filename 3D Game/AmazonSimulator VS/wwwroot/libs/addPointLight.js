class addPointLight extends THREE.Group {

    constructor(mesh, color, posx, posy, posz) {
        super();
        var light = new THREE.PointLight(color);
        mesh.add(light);
        mesh.add(light.position);
        light.position.set(posx, posy, posz);
        light.intensity = 2;
        light.distance = 1;
    }
}