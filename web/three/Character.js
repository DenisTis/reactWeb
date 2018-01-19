import * as THREE from 'three';
import Path from 'three-pathfinding';

import MapStore from '../flux/stores/MapStore';

const ZONE = 'MapZone';

export default class Character {
  constructor(newPosition, scene) {
    this.position = newPosition;
    this.target = false;
    this.pathfinder = new Path();
    this.scene = scene;
    this.pathlines = null;
    MapStore.addChangeListener(
      'STORE_NAVIGATE_TO_LOCATION',
      this.setTarget.bind(this)
    );
  }

  setTarget() {
    let selectLocation = MapStore.getSelectLocation();
    this.target = this.scene.getObjectByName(selectLocation);
  }

  updateCharacter() {
    //Navigation mesh seems to be too big
    if (this.target) {
      let navigationMesh = this.scene.getObjectByName('Island_1');
      if (!navigationMesh || !navigationMesh.geometry) {
        return;
      }
      let geometry = new THREE.Geometry().fromBufferGeometry(
        navigationMesh.geometry
      );
      this.pathfinder.setZoneData(ZONE, Path.createZone(geometry));
      // Find path from A to B.
      let groupID = this.pathfinder.getGroup(ZONE, this.position);
      // this.position.copy(this.target.position);
      let path = this.pathfinder.findPath(
        this.position,
        this.target.position,
        ZONE,
        groupID
      );
      //probably move character before!
      this.drawNavigationPath(path, this.position);
      //test that this is called only once
      this.target = null;
    }
  }

  drawNavigationPath(path, characterPosition) {
    if (this.pathlines) {
      this.scene.remove(this.pathlines);
    }
    let material = new THREE.LineBasicMaterial({
      color: 0x0000ff,
      linewidth: 2
    });
    let geometry = new THREE.Geometry();
    geometry.vertices.push(characterPosition);
    // Draw debug lines
    for (var i = 0; i < path.length; i++) {
      geometry.vertices.push(path[i].clone().add(new THREE.Vector3(0, 0.2, 0)));
    }
    this.pathLines = new THREE.Line(geometry, material);
    this.scene.add(this.pathLines);
  }
}
