export class GearCalculator {
  private minRpm: number;
  private maxRpm: number;
  private maxDrive: number;

  constructor(minRpm: number, maxRpm: number, maxDrive: number) {
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.maxDrive = maxDrive;
  }

  public calculate(currentRpm: number, currentGear: number): number {
    if (currentRpm > this.maxRpm) {
      if (currentGear === this.maxDrive) {
        return currentGear;
      }
      return currentGear + 1;
    }

    if (currentRpm < this.minRpm) {
      if (currentGear === 1) {
        return currentGear;
      }
      return currentGear - 1;
    }

    return currentGear;
  }
}
