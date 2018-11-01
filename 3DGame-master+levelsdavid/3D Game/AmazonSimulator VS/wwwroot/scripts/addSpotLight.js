class addSpotLight extends THREE.Group {

    constructor(mesh, color, posx, posy, posz, tposx, tposy, tposz) {
        super();
        var light = new THREE.SpotLight(color);
        mesh.add(light);
        mesh.add(light.position);
        scene.add(light.target);
        light.position.set(posx, posy, posz);
        light.target.position.set(tposx, tposy, tposz);
        light.intensity = 1;
        light.angle = Math.PI / 15;
        light.decay = 2;
        light.distance = 30;
    }
}