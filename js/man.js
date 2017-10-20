Runner = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "runner";
    var color = getRandomColor();
    var color0 = getRandomColor();

    //head
    var geomHead = new THREE.BoxGeometry(70, 55, 80, 1, 1, 1);
    var matHead = new THREE.MeshLambertMaterial({
        color: 0xffc092
    });
    var head = new THREE.Mesh(geomHead, matHead);
    head.position.y += 72;
    head.position.z -= 10;
    head.castShadow = true;
    head.receiveShadow = true;
    this.mesh.add(head);

    //body
    var geomBody = new THREE.BoxGeometry(80, 100, 60, 1, 3, 1);
    var matBody = new THREE.MeshLambertMaterial({
        // color: 0x003d7c
        color: color
    });
    var body = new THREE.Mesh(geomBody, matBody);
    body.position.y -= 5;
    body.castShadow = true;
    body.receiveShadow = true;
    this.mesh.add(body);

    //arm
    var geomArm = new THREE.BoxGeometry(20, 80, 30, 1, 1, 1);
    var matArm = new THREE.MeshLambertMaterial({
        color: 0xffc092
    });
    var armLeft = new THREE.Mesh(geomArm, matArm);
    armLeft.castShadow = true;
    armLeft.receiveShadow = true;
    armLeft.position.x -= 50;
    armLeft.position.y -= 8;
    var armRight = armLeft.clone();
    armRight.position.x += 100;
    this.mesh.add(armLeft);
    this.mesh.add(armRight);

    //leg
    var geomLeg = new THREE.BoxGeometry(35, 120, 26, 1, 1, 1);
    var matLeg = new THREE.MeshLambertMaterial({
        //color: 0x003d7c
        color: color
    });
    var legLeft = new THREE.Mesh(geomLeg, matLeg);
    legLeft.castShadow = true;
    legLeft.receiveShadow = true;
    legLeft.position.x -= 22.4;
    legLeft.position.y -= 90;
    var legRight = legLeft.clone();
    legRight.position.x += 44.8;
    this.mesh.add(legLeft);
    this.mesh.add(legRight);

    //hair
    var geomHair0 = new THREE.BoxGeometry(82, 30, 25, 1, 1, 1);
    var matHair0 = new THREE.MeshLambertMaterial({
        // color: 0x6a2000
        color: color0
    });
    var hair0 = new THREE.Mesh(geomHair0, matHair0);
    hair0.position.y += 80;
    hair0.position.z += 32;
    hair0.castShadow = true;
    hair0.receiveShadow = true;
    var geomHair1 = new THREE.BoxGeometry(82, 15, 82, 1, 1, 1);
    var matHair1 = new THREE.MeshLambertMaterial({
        // color: 0x6a2000
        color: color0
    });
    var hair1 = new THREE.Mesh(geomHair1, matHair1);
    hair1.position.y += 100;
    hair1.position.z -= 5;
    hair1.castShadow = true;
    hair1.receiveShadow = true;
    this.mesh.add(hair0);
    this.mesh.add(hair1);

    //ear
    var geomEar = new THREE.BoxGeometry(20, 20, 15, 1, 1, 1);
    var matEar = new THREE.MeshLambertMaterial({
        color: 0xffc092
    });
    var earLeft = new THREE.Mesh(geomEar, matEar);
    earLeft.castShadow = true;
    earLeft.receiveShadow = true;
    earLeft.position.x -= 50;
    earLeft.position.y += 72;
    var earRight = earLeft.clone();
    earRight.position.x += 100;
    this.mesh.add(earLeft);
    this.mesh.add(earRight);


    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
}

var runner;

function createRunner() {
    runner = new Runner();
    runner.mesh.scale.set(0.5, 0.7, 0.5);
    runner.mesh.position.z += 150;
    runner.mesh.position.y -= 130;
    scene.add(runner.mesh);
}

function runnerUpDate() {
    if (the == 1) {
        runner.mesh.children[2].rotation.x -= it;
        runner.mesh.children[2].position.z += 40 * Math.sin(it);
        runner.mesh.children[2].position.y += 40 - 40 * Math.cos(it);
        runner.mesh.children[3].rotation.x += it;
        runner.mesh.children[3].position.z -= 40 * Math.sin(it);
        runner.mesh.children[3].position.y -= 40 - 40 * Math.cos(it);
        runner.mesh.children[4].rotation.x += it;
        runner.mesh.children[4].position.z -= 60 * Math.sin(it);
        runner.mesh.children[4].position.y -= 60 - 60 * Math.cos(it);
        runner.mesh.children[5].rotation.x -= it;
        runner.mesh.children[5].position.z += 60 * Math.sin(it);
        runner.mesh.children[5].position.y += 60 - 60 * Math.cos(it);
        its += it;
        if (its > Math.PI / 4) {
            the = 0;
        }
    } else {
        runner.mesh.children[2].rotation.x += it;
        runner.mesh.children[2].position.z -= 40 * Math.sin(it);
        runner.mesh.children[2].position.y -= 40 - 40 * Math.cos(it);
        runner.mesh.children[3].rotation.x -= it;
        runner.mesh.children[3].position.z += 40 * Math.sin(it);
        runner.mesh.children[3].position.y += 40 - 40 * Math.cos(it);
        runner.mesh.children[4].rotation.x -= it;
        runner.mesh.children[4].position.z += 60 * Math.sin(it);
        runner.mesh.children[4].position.y += 60 - 60 * Math.cos(it);
        runner.mesh.children[5].rotation.x += it;
        runner.mesh.children[5].position.z -= 60 * Math.sin(it);
        runner.mesh.children[5].position.y -= 60 - 60 * Math.cos(it);
        its -= it;
        if (its < -Math.PI / 4) {
            the = 1;
        }
    }

    for (var i = 0; i < 3; i++) {
        originPoint[i] = new THREE.Vector3(runnerX - 30 + 30 * i, -130, 150);
    }//front&top
    for (var i = 3; i < 6; i++) {
        originPoint[i] = new THREE.Vector3(runnerX - 30 + 30 * (i-3), -30, 150);
    }//front&middle
    for (var i = 6; i < 9; i++) {
        originPoint[i] = new THREE.Vector3(runnerX - 30 + 30 * (i-6), -270, 150);
    }//front&bottom
    for (var i = 9; i < 12; i++) {
        originPoint[i] = new THREE.Vector3(runnerX - 30 + 30 * (i-9), -130, 150);
    }//behind
    for (var i = 12; i < 15; i++) {
        originPoint[i] = new THREE.Vector3(runnerX - 30, -150 + 20 * (i-12), 150);
    }//left
    for (var i = 15; i < 18; i++) {
        originPoint[i] = new THREE.Vector3(runnerX + 30, -150 + 20 * (i-15), 150);
    }//right
}