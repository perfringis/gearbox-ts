export class Gear {
  private gear: number;

  constructor(gear: number) {
    if (gear < 0) {
      throw new Error("Negative representation of gear");
    }

    this.gear = gear;
  }

  next(): Gear {
    return new Gear(this.gear + 1);
  }

  previous(): Gear {
    return new Gear(this.gear - 1);
  }

  equals(otherGear: Gear): boolean {
    return this.gear === otherGear.gear;
  }

  greaterThan(gear: Gear): boolean {
    return this.gear > gear.gear;
  }

  lowerOrEqualTo(gear: Gear): boolean {
    return this.gear <= gear.gear;
  }

  toIntValue(): number {
    return this.gear;
  }
}
