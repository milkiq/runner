var renderer, scene, container, camera, controls, light;
var Height, Width;
var start = false;

var it = Math.PI / 30;
var its = Math.PI / 30;
var the = 1;
var stop;
var q = 2;
var u = 0;
var t = 10;
var now = 0;
var last = 0;
var speed = 0.005;
var bgcolor;

var getRandomColor = function() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

function oppositeColor(a) {
    a = a.replace('#', '');
    var c16, c10, max16 = 15,
        b = [];
    for (var i = 0; i < a.length; i++) {
        c16 = parseInt(a.charAt(i), 16); //  to 16进制
        c10 = parseInt(max16 - c16, 10); // 10进制计算
        b.push(c10.toString(16)); // to 16进制
    }
    return '#' + b.join('');
}

function handleWindowResize() {
    if (mql.matches) {
        Height = window.innerWidth;
        Width = window.innerHeight;
        document.getElementsByTagName('body')[0].style.width = Width + 'px';
        document.getElementsByTagName('body')[0].style.height = Height + 'px';
        document.getElementById('text').style.width = Width + 'px';
        document.getElementById('text').style.height = Height + 'px';
        renderer.setSize(Width, Height);
        camera.aspect = Width / Height;
        camera.updateProjectionMatrix();
    } else {
        Height = window.innerHeight;
        Width = window.innerWidth;
        document.getElementsByTagName('body')[0].style.width = Width + 'px';
        document.getElementsByTagName('body')[0].style.height = Height + 'px';
        document.getElementById('text').style.width = Width + 'px';
        document.getElementById('text').style.height = Height + 'px';
        renderer.setSize(Width, Height);
        camera.aspect = Width / Height;
        camera.updateProjectionMatrix();
    }
}

function createScene() {
    if (mql.matches) {
        Height = window.innerWidth;
        Width = window.innerHeight;
    } else {
        Height = window.innerHeight;
        Width = window.innerWidth;
    }
    //renderer
    renderer = new THREE.WebGLRenderer({
        alpha: true, //背景透明
        antialias: true //抗锯齿
    })
    renderer.setSize(Width, Height);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('world');
    container.appendChild(renderer.domElement);

    //scene
    scene = new THREE.Scene;

    // lights
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);
    var light = new THREE.DirectionalLight(0xf6dbb2);
    light.position.set(-1, -1, -1);
    scene.add(light);
    var light = new THREE.AmbientLight(0x222222);
    scene.add(light);

    //camera
    aspectRatio = Width / Height;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
    );
    camera.position.x = 0;
    camera.position.z = 600;
    camera.position.y = 300;
    camera.lookAt(scene.position);
    scene.add(camera);
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.addEventListener('change', render);

    window.addEventListener('resize', handleWindowResize, false);
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    update();
    if (q == 1) {
        console.log('game over');
        return;
    }
    if (q == 0) {
        ground.mesh.rotation.z += speed;
        what[0].mesh.rotation.x += speed;
        what[1].mesh.rotation.x += speed;
        if (what[last].mesh.rotation.x > Math.PI / 7) {
            if (what[last].mesh.rotation.x % (Math.PI / 4) >= 0) {
                var lastX = what[last].mesh.rotation.x;
                scene.remove(what[last].mesh);
                what[last] = new What();
                what[last].mesh.position.y = -3200;
                what[last].mesh.position.z -= 400;
                what[last].mesh.rotation.x = lastX - Math.PI / 2;
                scene.add(what[last].mesh);
                if (last == 0) {
                    last = 1;
                } else {
                    last = 0;
                }
            }
        }
        document.getElementById('s').innerHTML = "score:" + parseInt(ground.mesh.rotation.z * 40 / Math.PI);
        var gg = parseInt(ground.mesh.rotation.z * 40 / Math.PI) / 100;
        speed = 0.005 + gg * 0.001;
        runnerUpDate();
    }
    // for (var k = 0; k < what.nTrees; k++) {
    //     what.trees[k].mesh.rotation.x -= .015;
    // }
    // runner.mesh.children[3].rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 100);
    requestAnimationFrame(animate);
    // controls.update();
    render();
}

Tree = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "tree";

    var nBlocs = 4 + Math.random() * 2;
    for (var i = 0; i < nBlocs; i++) {
        var treeX = 15 + Math.random() * 10;
        var treeZ = 15 + Math.random() * 10;
        var geom = new THREE.CubeGeometry(treeX, 300, treeZ);
        var mat = new THREE.MeshLambertMaterial({
            color: getRandomColor(),
            // wireframe: true
        });
        var m = new THREE.Mesh(geom.clone(), mat);
        m.position.x = i * 15;
        m.position.y = 10 + Math.random() * 5;
        m.position.z = 10 + Math.random() * 5;
        var s = .5 + Math.random() * .9;
        m.scale.set(1, s, 1);
        m.castShadow = true;
        m.receiveShadow = true;
        this.mesh.add(m);
    }
}

Ground = function() {
    var geom = new THREE.CylinderGeometry(3000, 3000, 4000, 35, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    var mat = new THREE.MeshPhongMaterial({
        // color: 0x826529,
        color: getRandomColor(),
        shading: THREE.FlatShading
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
}

What = function() {
    this.mesh = new THREE.Object3D();
    this.nTrees = 15;
    this.trees = [];
    var stepAngle = Math.PI / 4 / this.nTrees;

    for (var i = 0; i < this.nTrees; i++) {
        var c = new Tree();
        this.trees.push(c);
        var a = stepAngle * i;
        var h = 3000;
        c.mesh.position.y = Math.cos(a) * h;
        c.mesh.position.z = Math.sin(a) * h;
        c.mesh.position.x = -2000 + Math.random() * 4000;
        c.mesh.rotation.x = a; // + Math.PI / 2;
        var s = 0.5 + Math.random() * 3;
        c.mesh.scale.set(s, s, s);
        this.mesh.add(c.mesh);
    }
}

var ground;

function createGround() {
    ground = new Ground();
    ground.mesh.rotation.y = Math.PI / 2;
    ground.mesh.position.z -= 400;
    ground.mesh.position.y = -3200;
    scene.add(ground.mesh);
}

var what = [];

function createWhat() {
    what[0] = new What();
    what[0].mesh.position.y = -3200;
    what[0].mesh.position.z -= 400;
    what[0].mesh.rotation.x = -Math.PI / 3;
    what[1] = new What();
    what[1].mesh.position.y = -3200;
    what[1].mesh.position.z -= 400;
    what[1].mesh.rotation.x = -Math.PI * 7 / 12;
    scene.add(what[0].mesh);
    scene.add(what[1].mesh);
}

function init() {
    bgcolor = getRandomColor();
    document.getElementsByTagName('body')[0].style.backgroundColor = bgcolor;
    document.getElementById('s').style.color = oppositeColor(bgcolor);
    createScene();
    createGround();
    createWhat();
    createRunner();
    animate();
}

// window.addEventListener('load', start, false);
window.addEventListener('load', init, false);


function moveIt(where) {
    if (u <= 40 && u >= -40) {
        if (where == 'left') {
            runner.mesh.position.x -= t;
            u -= t;
            requestAnimationFrame(moveIt.bind('left', 'left'));
        } else {
            runner.mesh.position.x += t;
            u += t;
            requestAnimationFrame(moveIt.bind('right', 'right'));
        }
    } else {
        var that = u;
        u = 0;
        // console.log('that:' + that);
        return;
    }
}

function keyDown(e) {
    var currKey = 0,
        e = e || event;
    currKey = e.keyCode || e.which || e.charCode;
    // var keyName = String.fromCharCode(currKey);
    // alert("按键码: " + currKey);
    if (currKey == 37 && runner.mesh.position.x > -400 && start === true) {
        moveIt('left');
        // runner.mesh.position.x -= 10;
        runnerX -= 50;
    }
    if (currKey == 39 && runner.mesh.position.x < 400 && start === true) {
        moveIt('right');
        // runner.mesh.position.x += 10;
        runnerX += 50;
    }
    if (currKey == 32 && start === false) {
        q = 0;
        document.getElementById('tips').style.display = 'none';
        start = true;
    }
}
document.onkeydown = keyDown;

function touchStartFunc(evt) {
    try {
        evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

        var touch = evt.touches[0]; //获取第一个触点
        var x = Number(touch.pageX); //页面触点X坐标
        var y = Number(touch.pageY); //页面触点Y坐标
        //记录触点初始位置

        var mPos;
        if (mql.matches) {
            mPos = Height / 2;
        }
        else{
            mPos = Width / 2;
        }

        if (start === false) {
            q = 0;
            document.getElementById('tips').style.display = 'none';
            start = true;
        } else {
            if (x < mPos && runner.mesh.position.x > -400) {
                moveIt('left');
                // runner.mesh.position.x -= 10;
                runnerX -= 50;
            }
            if (x > mPos && runner.mesh.position.x < 400) {
                moveIt('right');
                // runner.mesh.position.x += 10;
                runnerX += 50;
            }
        }

    } catch (e) {
        alert('touchSatrtFunc：' + e.message);
    }
}
document.addEventListener('touchstart', touchStartFunc, false);

var mql = window.matchMedia("(orientation: portrait)");

var timer = setInterval(function() {
    if (mql.matches) {
        Height = window.innerWidth;
        Width = window.innerHeight;
        document.getElementsByTagName('body')[0].style.width = Width + 'px';
        document.getElementsByTagName('body')[0].style.height = Height + 'px';
        document.getElementById('text').style.width = Width + 'px';
        document.getElementById('text').style.height = Height + 'px';
        document.getElementById('tips').style.width = Width + 'px';
        document.getElementById('tips').style.height = Height + 'px';
        document.getElementById('s').style.width = Width + 'px';
        document.getElementById('s').style.height = Height + 'px';
        renderer.setSize(Width, Height);
        camera.aspect = Width / Height;
        camera.updateProjectionMatrix();
    } else {
        Height = window.innerHeight;
        Width = window.innerWidth;
        document.getElementsByTagName('body')[0].style.width = Width + 'px';
        document.getElementsByTagName('body')[0].style.height = Height + 'px';
        document.getElementById('text').style.width = Width + 'px';
        document.getElementById('text').style.height = Height + 'px';
        document.getElementById('tips').style.width = Width + 'px';
        document.getElementById('tips').style.height = Height + 'px';
        document.getElementById('s').style.width = Width + 'px';
        document.getElementById('s').style.height = Height + 'px';
        renderer.setSize(Width, Height);
        camera.aspect = Width / Height;
        camera.updateProjectionMatrix();
    }
}, 300);