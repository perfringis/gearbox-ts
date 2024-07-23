import { Gear } from "../../../driver/Gear";
import { GearCalculator } from "../../../driver/calculator/GearCalculator";
import { GearRange } from "../../../driver/GearRange";
import { RPM } from "../../../engine/RPM";
import { RpmRange } from "../../../engine/RpmRange";

export class Kickdown implements GearCalculator {
  private readonly range: GearRange;
  private readonly optimalRange: RpmRange;

  constructor(range: GearRange, optimalRange: RpmRange) {
    this.range = range;
    this.optimalRange = optimalRange;
  }

  calculate(rpm: RPM, current: Gear): Gear {
    if (!rpm.isAbove(this.optimalRange)) {
      return current.previous();
    } else {
      return current;
    }
  }
}
