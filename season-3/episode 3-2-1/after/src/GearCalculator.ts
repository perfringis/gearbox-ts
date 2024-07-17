import { RPM } from "./RPM";

export class GearCalculator {
  private minRpm: RPM;
  private maxRpm: RPM;
  private maxDrive: number;

  constructor(minRpm: RPM, maxRpm: RPM, maxDrive: number) {
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.maxDrive = maxDrive;
  }

  public calculate(currentRpm: RPM, currentGear: number): number {
    if (currentRpm.greaterThan(this.maxRpm)) {
      if (currentGear === this.maxDrive) {
        return currentGear;
      }
      return currentGear + 1;
    }

    if (currentRpm.lowerThan(this.minRpm)) {
      if (currentGear === 1) {
        return currentGear;
      }
      return currentGear - 1;
    }

    return currentGear;
  }
}
