import { Characteristics } from "./Characteristics";
import { Lights } from "./Lights";

export class BmwExternalSystems {
  private currentRpm: number = 10;
  private angularSpeed: number = 150;
  private lights: Lights = new Lights();
  private characteristics: Characteristics = new Characteristics();

  constructor() {}

  angularSpeedForDrifting(): number {
    return this.characteristics.angularSpeedForDrifting();
  }

  setCurrentRpm(currentRpm: number): void {
    this.currentRpm = currentRpm;
  }

  getAngularSpeed(): number {
    return this.angularSpeed;
  }

  setAngularSpeed(angularSpeed: number): void {
    this.angularSpeed = angularSpeed;
  }

  getLights(): Lights {
    return this.lights;
  }
}
