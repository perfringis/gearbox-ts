import { Gear } from "./Gear";
import { GearRange } from "./GearRange";
import { RPM } from "./RPM";
import { RpmRange } from "./RpmRange";

export class GearCalculator {
  private optimalRange: RpmRange;
  private gearRange: GearRange;

  constructor(optimalRange: RpmRange, gearRange: GearRange) {
    this.optimalRange = optimalRange;
    this.gearRange = gearRange;
  }

  calculateGear(currentRpm: RPM, currentGear: Gear) {
    const gear: Gear = this.calculate(currentRpm, currentGear);
    return this.gearRange.trim(gear);
  }

  private calculate(currentRpm: RPM, currentGear: Gear): Gear {
    if (currentRpm.isAbove(this.optimalRange)) {
      return currentGear.next();
    }

    if (currentRpm.isBellow(this.optimalRange)) {
      return currentGear.previous();
    }

    return currentGear;
  }
}
