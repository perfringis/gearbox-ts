import { Gear } from "../../driver/Gear";
import { Gearbox } from "./Gearbox";
import { Shifter } from "../../driver/shifter/Shifter";

export class ZF8Shifter implements Shifter {
  private zf8gearbox: Gearbox;

  constructor(zf8gearbox: Gearbox) {
    this.zf8gearbox = zf8gearbox;
  }

  changeGearTo(newGear: Gear): void {
    this.zf8gearbox.setCurrentGear(newGear.toIntValue());
  }

  currentGear(): Gear {
    return new Gear(<number>this.zf8gearbox.getCurrentGear());
  }

  getMaxDrive(): Gear {
    return new Gear(this.zf8gearbox.getMaxDrive());
  }
}
