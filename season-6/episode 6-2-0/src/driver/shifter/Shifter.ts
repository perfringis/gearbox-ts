import { Gear } from "../Gear";

export interface Shifter {
  changeGearTo(newGear: Gear): void;

  currentGear(): Gear;

  getMaxDrive(): Gear;
}
