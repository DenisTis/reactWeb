import MapSceneHelper from './MapSceneHelper';
import Character from './Character';

export default class MapScene {
  constructor() {
    this.animate = this.animate.bind(this);
  }

  initialize(mount) {
    this.mount = mount;
    let threeObject = MapSceneHelper.createSceneObjects(mount);
    this.camera = threeObject.camera;
    this.scene = threeObject.scene;
    this.renderer = threeObject.renderer;
    this.controls = threeObject.controls;
    this.character = threeObject.character;
    this.characterControl = new Character(this.character.position, this.scene);
    this.start();
    return;
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
    MapSceneHelper.updateLocations(this.scene, this.mount, this.camera);
    this.characterControl.updateCharacter();
    this.renderer.render(this.scene, this.camera);
  }
}
