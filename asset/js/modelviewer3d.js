import * as THREE from './node_modules/three/build/three.module.js';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

function animate() {
    var renderer = new THREE.WebGLRenderer();

    const fov = 75;
    const aspect = 1;
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const loadingManager = new THREE.LoadingManager( () => {
	
		const loadingScreen = document.getElementById( 'loading-screen' );
		loadingScreen.classList.add( 'fade-out' );
		loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
		
	} );

    const modeldiv = document.querySelector('.model-viewer-3d');
    modeldiv.appendChild(renderer.domElement);
    var modelurl = modeldiv.dataset.modelurl;
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.4);
    scene.add(ambientLight);
    var pointLight = new THREE.PointLight(0xffffff, 0.8);
    camera.add(pointLight);
    scene.add(camera);
    var pivoter = new THREE.Group();
    scene.add(pivoter);
    var controls = new OrbitControls( camera, renderer.domElement );
    controls.autoRotate = true;
    controls.addEventListener('start', function(){
        controls.autoRotate = false;
    })
    var mtlLoader = new MTLLoader(loadingManager);
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

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.zoom = 2.5;
        camera.updateProjectionMatrix();
        }

        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
}

animate();