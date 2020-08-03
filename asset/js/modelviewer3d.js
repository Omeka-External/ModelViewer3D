import * as THREE from './node_modules/three/build/three.module.js';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
//                    camera.position.z = 5;
const modeldiv = document.querySelector('.model-viewer-3d');
renderer.setSize(400,400);
modeldiv.appendChild(renderer.domElement);
// Our Javascript will go here.
            var modelurl = modeldiv.dataset.modelurl;
            console.log(modelurl);
            var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4);
            scene.add(ambientLight);
            var pointLight = new THREE.PointLight(0xffffff, 0.8);
            camera.add(pointLight);
            scene.add(camera);

            var model;
            var mtlLoader = new MTLLoader();
            mtlLoader.load(modelurl + '.mtl', function (materials) {
                materials.preload();

                var loader = new OBJLoader();
                loader.setMaterials(materials);
                // loader.load('3D_Meadowood.obj',
                loader.load(modelurl + '.obj',
                function (object) {
            /*
                        object.scale.x = 200.0;
                        object.scale.y = 200.0;
                        object.scale.z = 200.0;
            */
                        object.position.x = 0;
                        object.position.y = 0;
                        object.position.z = 0;
                        scene.add(object);
                        camera.position.z = 2;
                        //renderer.render(scene, camera);
                        model = object;
                });
            });

            function animate() {
                requestAnimationFrame( animate);
            if (model) model.rotation.y += 0.01;
                renderer.render(scene, camera);
                }
            animate();
            //renderer.render(scene, camera);