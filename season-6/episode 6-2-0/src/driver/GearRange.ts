import { Gear } from "./Gear";

export class GearRange {
  private first!: Gear;
  private maxGear!: Gear;

  constructor(first: Gear, maxGear: Gear) {
    // prettier-ignore
    if (first.greaterThan(maxGear)) {
      throw new Error(`Invalid Range. ${first.toIntValue()} is greater than ${maxGear.toIntValue()}`);
    }

    this.first = first;
    this.maxGear = maxGear;
  }

  trim(gear: Gear) {
    if (gear.greaterThan(this.maxGear)) {
      return this.maxGear;
    }
    if (gear.lessOrEqualTo(this.first)) {
      return this.first;
    }
    return gear;
  }
}
