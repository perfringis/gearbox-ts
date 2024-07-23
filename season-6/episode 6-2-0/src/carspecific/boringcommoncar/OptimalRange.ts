import { Gear } from "../../driver/Gear";
import { GearCalculator } from "../../driver/calculator/GearCalculator";
import { GearRange } from "../../driver/GearRange";
import { RPM } from "../../engine/RPM";
import { RpmRange } from "../../engine/RpmRange";

export class OptimalRange implements GearCalculator {
  private optimalRange: RpmRange;
  private range: GearRange;

  constructor(range: GearRange, optimalRange: RpmRange) {
    this.optimalRange = optimalRange;
    this.range = range;
  }

  calculate(currentRpm: RPM, currentGear: Gear) {
    const gear: Gear = this.calculate(currentRpm, currentGear);
    return this.range.trim(gear);
  }

  calculateGear(currentRpm: RPM, currentGear: Gear): Gear {
    if (currentRpm.isBellow(this.optimalRange)) {
      return currentGear.previous();
    } else if (currentRpm.isAbove(this.optimalRange)) {
      return currentGear.next();
    } else {
      return currentGear;
    }
  }
}
