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

  greaterThan(rpm: RPM): boolean {
    return this.compareTo(rpm) > 0;
  }

  lowerThan(rpm: RPM): boolean {
    return this.compareTo(rpm) < 0;
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
}
