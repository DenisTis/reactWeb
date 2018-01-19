import * as THREE from 'three';
//import OrbitControls from "orbit-controls-es6";
import OrbitControls from './OrbitControlsEnh';
import GLTF2Loader from 'three-gltf2-loader';
GLTF2Loader(THREE);

import MapActions from '../flux/actions/MapActions';

export default new class MapSceneHelper {
  updateLocations(scene, mount, camera) {
    if (
      scene.getObjectByName('Locations') &&
      scene.getObjectByName('Locations').children
    ) {
      let locations = scene.getObjectByName('Locations').children;
      let reactLocations = [];
      for (let location of locations) {
        reactLocations.push({
          id: location.name,
          position: this.calculateLocationPosition(mount, camera, location)
        });
      }
      MapActions.updateLocations(reactLocations);
    }
  }

  calculateLocationPosition(mount, camera, location) {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    let textPosition = new THREE.Vector3(0, 0, 0);
    textPosition.copy(location.position);
    //Height position
    textPosition.y = 1;
    let projectedPosition = textPosition.project(camera);
    projectedPosition.x = (projectedPosition.x + 1) / 2 * width;
    projectedPosition.y = -(projectedPosition.y - 1) / 2 * height;
    return {
      left: projectedPosition.x,
      top: projectedPosition.y
    };
  }

  onSceneLoad(xhr) {
    let loaded = Math.floor(xhr.loaded / xhr.total * 100) + '';
    MapActions.updatePercentage(loaded);
  }

  createSceneControls(camera, domElement) {
    let controls = new OrbitControls(camera, domElement);
    controls.enablePan = false;
    //this.controls.autoRotate = true;

    controls.minDistance = 2;
    controls.maxDistance = 4;
    controls.minPolarAngle = 0; //inclination to look top-down
    controls.maxPolarAngle = Math.PI / 6; // around 10% inclination to ground
    //this.controls.maxPolarAngle = Math.PI / 2.5; // around 10% inclination to ground
    return controls;
  }

  createSceneObjects(mount) {
    let width = mount.clientWidth;
    let height = mount.clientHeight;
    let backgroundColor = new THREE.Color(0xc5eafd);
    let scene = new THREE.Scene();
    scene.background = backgroundColor;

    let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = -5;
    camera.position.y = 3;
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    let controls = this.createSceneControls(camera, renderer.domElement);

    //Add lights
    //This is the environment light
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //improve fog color and quality later
    scene.fog = new THREE.Fog('grey', 5, 20);

    let mainLight = new THREE.DirectionalLight(0xffffff, 0.4);
    mainLight.position.set(0, 20, -20);
    mainLight.castShadow = true;

    // var helper = new THREE.CameraHelper(mainLight.shadow.camera);
    // scene.add(helper);

    //Add character
    let characterGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 8);
    var characterMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    let character = new THREE.Mesh(characterGeometry, characterMaterial);

    let loader = new THREE.GLTFLoader();
    loader.load(
      'assets/scene.glb',
      function(gltf) {
        // //update as 100% loaded
        // this.onLoad({total: 1});
        //TODO - in the loaded model, shadows are not working.
        //I still did not find out how to solve it.
        //        gltf.scene.castShadow = true;
        for (let child of gltf.scene.children) {
          // child.castShadow = true;
          // child.receiveShadow = true;
          for (let subChild of child.children) {
            subChild.castShadow = true;
            subChild.receiveShadow = true;
            console.log('test no console');
          }
          //scene.add(child);
        }
        scene.add(gltf.scene);

        character.position.z = -2;
        scene.add(character);

        scene.add(ambientLight);
        scene.add(mainLight);

        //scene.fog = THREE.FogExp2(0xefd1b5, 0.0025);

        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Scene
        // gltf.scenes; // Array<THREE.Scene>
        // gltf.cameras; // Array<THREE.Camera>
      },
      // called when loading is in progresses
      this.onSceneLoad,
      // called when loading has errors
      function(error) {
        console.log('An error happened');
        console.log(error);
      }
    );

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    mount.appendChild(this.renderer.domElement);

    return {
      scene: scene,
      camera: camera,
      renderer: renderer,
      controls: controls,
      character: character
    };
  }
}();
