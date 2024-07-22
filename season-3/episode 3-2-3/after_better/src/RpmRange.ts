import { RPM } from "./RPM";

export class RpmRange {
  private minRpm: RPM;
  private maxRpm: RPM;

  constructor(minRpm: RPM, maxRpm: RPM) {
    if (minRpm.compareTo(maxRpm) > 0) {
      throw new Error("Wrong RPMs");
    }

    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
  }

  startGreaterThan(rpm: RPM): boolean {
    return this.minRpm.compareTo(rpm) > 0;
  }

  endSmallerThan(rpm: RPM): boolean {
    return this.maxRpm.compareTo(rpm) < 0;
  }

  isAboveExceeded(currentRpm: RPM): boolean {
    return currentRpm.greaterThan(this.maxRpm);
  }

  isBelowExceeded(currentRpm: RPM): boolean {
    return currentRpm.lowerThan(this.maxRpm);
  }
}
