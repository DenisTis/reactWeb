import * as THREE from 'three';

import MapActions from '../flux/actions/MapActions';

//import OrbitControls from "orbit-controls-es6";
import OrbitControls from './OrbitControlsEnh';
import GLTF2Loader from 'three-gltf2-loader';
GLTF2Loader(THREE);

export default class MapScene {
  constructor() {
    this.animate = this.animate.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  initialize(mount) {
    this.mount = mount;
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    const backgroundColor = new THREE.Color(0xc5eafd);
    const scene = new THREE.Scene();
    scene.background = backgroundColor;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = -5;
    camera.position.y = 3;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enablePan = false;
    //this.controls.autoRotate = true;

    this.controls.minDistance = 2;
    this.controls.maxDistance = 4;
    this.controls.minPolarAngle = 0; //inclination to look top-down
    this.controls.maxPolarAngle = Math.PI / 6; // around 10% inclination to ground
    //this.controls.maxPolarAngle = Math.PI / 2.5; // around 10% inclination to ground

    //Add lights
    //This is the environment light
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //improve fog color and quality later
    scene.fog = new THREE.Fog('grey', 5, 20);

    var mainLight = new THREE.DirectionalLight(0xffffff, 0.4);
    mainLight.position.set(0, 20, -20);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // var helper = new THREE.CameraHelper(mainLight.shadow.camera);
    // scene.add(helper);

    //Add character
    let characterGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.3, 8);
    var characterMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.character = new THREE.Mesh(characterGeometry, characterMaterial);
    scene.add(this.character);

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

        //scene.fog = THREE.FogExp2(0xefd1b5, 0.0025);

        // gltf.animations; // Array<THREE.AnimationClip>
        // gltf.scene; // THREE.Scene
        // gltf.scenes; // Array<THREE.Scene>
        // gltf.cameras; // Array<THREE.Camera>
      },
      // called when loading is in progresses
      this.onLoad,
      // called when loading has errors
      function(error) {
        console.log('An error happened');
        console.log(error);
      }
    );

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  onLoad(xhr) {
    let loaded = Math.floor(xhr.loaded / xhr.total * 100) + '';
    MapActions.updatePercentage(loaded);
  }

  updateLocations() {
    if (
      this.scene.getObjectByName('Locations') &&
      this.scene.getObjectByName('Locations').children
    ) {
      let locations = this.scene.getObjectByName('Locations').children;
      let reactLocations = [];
      for (let location of locations) {
        reactLocations.push({
          id: location.name,
          position: this.calculateLocationPosition(location)
        });
      }
      MapActions.updateLocations(reactLocations);
    }
  }

  calculateLocationPosition(location) {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    let textPosition = new THREE.Vector3(0, 0, 0);
    textPosition.copy(location.position);
    //Height position
    textPosition.y = 1;
    let projectedPosition = textPosition.project(this.camera);
    projectedPosition.x = (projectedPosition.x + 1) / 2 * width;
    projectedPosition.y = -(projectedPosition.y - 1) / 2 * height;
    return {
      left: projectedPosition.x,
      top: projectedPosition.y
    };
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }

  animate() {
    this.controls.update();

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.updateLocations();
    this.renderer.render(this.scene, this.camera);
  }
}
