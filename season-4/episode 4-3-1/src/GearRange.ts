import { Gear } from "./Gear";

export class GearRange {
  private minGear: Gear;
  private maxGear: Gear;

  constructor(minGear: Gear, maxGear: Gear) {
    if (minGear.greaterThan(maxGear)) {
      throw new Error("Invalid gear range");
    }

    this.minGear = minGear;
    this.maxGear = maxGear;
  }

  trim(gear: Gear) {
    if (gear.greaterThan(this.maxGear)) {
      return this.maxGear;
    } else if (gear.lowerOrEqualTo(this.minGear)) {
      return this.minGear;
    } else {
      return gear;
    }
  }
}
