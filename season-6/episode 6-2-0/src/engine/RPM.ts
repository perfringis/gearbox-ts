import { RpmRange } from "./RpmRange";

export class RPM {
  private rpm: number;

  static k(k: number): RPM {
    return RPM.rpm(k * 1000);
  }

  static rpm(rpm: number): RPM {
    return new RPM(rpm);
  }

  constructor(rpm: number) {
    if (rpm < 0) {
      throw new Error(`Negative RPM: ${rpm}`);
    }
    this.rpm = rpm;
  }

  public compareTo(otherRpm: RPM): number {
    if (this.rpm > otherRpm.rpm) {
      return 1;
    } else if (this.rpm < otherRpm.rpm) {
      return -1;
    } else {
      return 0;
    }
  }

  isBellow(range: RpmRange): boolean {
    return range.startGreaterThan(this);
  }

  isAbove(range: RpmRange): boolean {
    return range.endSmallerThan(this);
  }

  minus(subtract: RPM): RPM {
    return new RPM(this.rpm - subtract.rpm);
  }

  divideBy(divider: number): RPM {
    return new RPM(this.rpm / divider);
  }

  add(toAdd: RPM): RPM {
    return new RPM(this.rpm + toAdd.rpm);
  }

  toString(): string {
    return `RPM{rpm=${this.rpm}}`;
  }

  scale(shiftPercentage: number): RPM {
    return new RPM(this.rpm * shiftPercentage);
  }
}
