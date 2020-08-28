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
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const loadingScreen = document.getElementById( 'loading-screen' );

    THREE.DefaultLoadingManager.onLoad = function ( ) {
        loadingScreen.classList.add( 'fade-out' );
        loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
    };
		
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
    var mtlLoader = new MTLLoader();
    mtlLoader.load(modelurl + '.mtl', function (materials) {
        materials.preload();
        var loader = new OBJLoader();
        loader.setMaterials(materials);
        loader.load(modelurl + '.obj',
        function (object) {
            var offset = 5;    
            var box = new THREE.Box3().setFromObject(object);
            var center = new THREE.Vector3();

            var size = box.getSize();
            const maxDim = Math.max( size.x, size.y, size.z );
            const fov = camera.fov * ( Math.PI / 180 );
            let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );
            cameraZ *= offset; // zoom out a little so that objects don't fill the screen
            camera.position.z = cameraZ;

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

    function onTransitionEnd( event ) {
        event.target.remove();      
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }

        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    
    requestAnimationFrame(render);
}

animate();