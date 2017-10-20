var crash = false;
var collideMeshList = [];
var ray = [];
var originPoint = [];
var runnerX = 0;
var where = [];
for (var i = 0; i < 9; i++) {
    where[i] = new THREE.Vector3(0, 0, -1);
}
for (var i = 9; i < 12; i++) {
    where[i] = new THREE.Vector3(0, 0, 1);
}
for (var i = 12; i < 15; i++) {
    where[i] = new THREE.Vector3(-1, 0, 0);
}
for (var i = 15; i < 18; i++) {
    where[i] = new THREE.Vector3(1, 0, 0);
}

function update() {
    var movingCube = runner.mesh.children[10];
    collideMeshList = what[last].mesh.children;
    var length;
    for (var v = 0; v < 18; v++) {
        ray[v] = new THREE.Raycaster(originPoint[v], where[v]);
        var collisionResults = ray[v].intersectObjects(collideMeshList, true);
        if (v < 12) {
            length = 50;
        } else {
            length = 15;
        }
        if (collisionResults.length > 0 && collisionResults[0].distance < length) {
            crash = true;
            console.log(collisionResults[0].distance + ' ' + v);
            collisionResults[0].object.material.color.set(0x000000);
            render();
            document.getElementById('text').style.display = "block";
            q = 1;
            break;
        } else {
            crash = false;
        }
    }
    // console.log(crash);
}