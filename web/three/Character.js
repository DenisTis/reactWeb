import * as THREE from 'three';

import MapActions from '../flux/actions/MapActions';
import { Vector3 } from 'three';

export default class Character {
  constructor(newPosition) {
    this.position = newPosition;
    this.target = false;
  }

  setTarget(newTarget) {
    this.target = newTarget;
  }
}
