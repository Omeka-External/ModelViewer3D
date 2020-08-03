import * as THREE from './node_modules/three/build/three.module.js';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
camera.position.z = 2;
renderer.setSize(400, 400);
const modeldiv = document.querySelector('.model-viewer-3d');
modeldiv.appendChild(renderer.domElement);
var modelurl = modeldiv.dataset.modelurl;
console.log(modelurl);
var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4);
scene.add(ambientLight);
var pointLight = new THREE.PointLight(0xffffff, 0.8);
camera.add(pointLight);
scene.add(camera);
var pivoter = new THREE.Group();
scene.add(pivoter);
var controls = new OrbitControls( camera, renderer.domElement );
var mtlLoader = new MTLLoader();
mtlLoader.load(modelurl + '.mtl', function (materials) {
    materials.preload();
    var loader = new OBJLoader();
    loader.setMaterials(materials);
    loader.load(modelurl + '.obj',
    function (object) {
        var box = new THREE.Box3().setFromObject(object);
        var center = new THREE.Vector3();
        box.getCenter(center);
        object.position.sub(center);
        pivoter.add(object);
    });
});
function animate() {
    requestAnimationFrame(animate);
    controls.autoRotate = true;
    controls.update();
    //pivoter.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();