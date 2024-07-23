import { Gear } from "./driver/Gear";
import { Gearbox } from "./gearboxspecific/zf8/Gearbox";

export class GearboxACL {
  private gearbox: Gearbox;

  constructor(gearbox: Gearbox) {
    this.gearbox = gearbox;
  }

  changeGearTo(newGear: Gear): void {
    this.gearbox.setCurrentGear(newGear.toIntValue());
  }

  currentGear(): Gear {
    return new Gear(<number>this.gearbox.getCurrentGear());
  }

  firstGear(): Gear {
    return new Gear(1);
  }

  maxGear(): Gear {
    const maxDrive: number = this.gearbox.getMaxDrive();
    return new Gear(maxDrive);
  }
}
