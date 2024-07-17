import { Gear } from "./Gear";
import { RPM } from "./RPM";

export class GearCalculator {
  private minRpm: RPM;
  private maxRpm: RPM;
  private maxDrive: Gear;

  constructor(minRpm: RPM, maxRpm: RPM, maxDrive: Gear) {
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.maxDrive = maxDrive;
  }

  public calculate(currentRpm: RPM, currentGear: Gear): Gear {
    if (currentRpm.greaterThan(this.maxRpm)) {
      if (currentGear.equals(this.maxDrive)) {
        return currentGear;
      }
      return currentGear.next();
    }

    if (currentRpm.lowerThan(this.minRpm)) {
      if (currentGear.equals(new Gear(1))) {
        return currentGear;
      }
      return currentGear.previous();
    }

    return currentGear;
  }
}
