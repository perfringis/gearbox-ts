import { Gear } from "./Gear";
import { RPM } from "./RPM";
import { RpmRange } from "./RpmRange";

export class GearCalculator {
  private optimalRange: RpmRange;
  private maxDrive: Gear;

  constructor(optimalRange: RpmRange, maxDrive: Gear) {
    this.optimalRange = optimalRange;
    this.maxDrive = maxDrive;
  }

  public calculate(currentRpm: RPM, currentGear: Gear): Gear {
    if (currentRpm.isAbove(this.optimalRange)) {
      if (currentGear.equals(this.maxDrive)) {
        return currentGear;
      }
      return currentGear.next();
    }

    if (currentRpm.isBellow(this.optimalRange)) {
      if (currentGear.equals(new Gear(1))) {
        return currentGear;
      }
      return currentGear.previous();
    }

    return currentGear;
  }
}
