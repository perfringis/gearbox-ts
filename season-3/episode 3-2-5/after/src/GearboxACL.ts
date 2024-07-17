import { Gear } from "./Gear";
import { Gearbox } from "./Gearbox";

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
}
