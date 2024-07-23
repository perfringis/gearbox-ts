export class Gear {
  private numRepresentation!: number;

  constructor(numRepresentation: number) {
    // prettier-ignore
    if (numRepresentation < 0) {
      throw new Error(`Invalid numeric representation: ${this.numRepresentation}`);
    }

    this.numRepresentation = numRepresentation;
  }

  greaterThan(gear: Gear): boolean {
    return this.numRepresentation > gear.numRepresentation;
  }

  lessOrEqualTo(gear: Gear): boolean {
    return this.numRepresentation <= gear.numRepresentation;
  }

  next(): Gear {
    return new Gear(this.numRepresentation + 1);
  }

  previous(): Gear {
    return new Gear(this.numRepresentation - 1);
  }

  toIntValue(): number {
    return this.numRepresentation;
  }

  equals(otherGear: Gear): boolean {
    return this.numRepresentation === otherGear.numRepresentation;
  }

  toString(): string {
    return `Gear{numRepresentation=${this.numRepresentation}}`;
  }
}
