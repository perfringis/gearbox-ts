import { Characteristics } from "./Characteristics";
import { ComfortCalculator } from "./ComfortCalculator";
import { EcoCalculator } from "./EcoCalculator";
import { Gear } from "./Gear";
import { GearboxACL } from "./GearboxACL";
import { GearCalculator } from "./GearCalculator";
import { GearRange } from "./GearRange";
import { RpmProvider } from "./RpmProvider";
import { SportCalculator } from "./SportCalculator";

enum DriverState {
  Reverse,
  Neutral,
  Park,
  Drive,
}

enum DriveMode {
  Eco,
  Comfort,
  Sport,
}

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private gearbox: GearboxACL;
  private characteristics: Characteristics;
  private state: DriverState = DriverState.Park;
  private driveMode: DriveMode = DriveMode.Comfort;

  constructor(
    rpmProvider: RpmProvider,
    gearbox: GearboxACL,
    characteristics: Characteristics
  ) {
    this.rpmProvider = rpmProvider;
    this.gearbox = gearbox;
    this.characteristics = characteristics;
  }

  recalculate(): void {
    if ((this.state === DriverState.Drive)) {
      const newGear: Gear = this.chooseCalculator().calculateGear(
        this.rpmProvider.current(),
        this.gearbox.currentGear()
      );
      this.gearbox.changeGearTo(newGear);
    }
  }

  enableDrive() {
    this.state = DriverState.Drive;
  }

  enablePark() {
    this.state = DriverState.Park;
  }

  enableReverse() {
    this.state = DriverState.Reverse;
  }

  enableNeutral() {
    this.state = DriverState.Neutral;
  }

  chooseCalculator(): GearCalculator {
    if (this.driveMode === DriveMode.Eco) {
      return new EcoCalculator(
        this.characteristics.optimalEcoRpmRange(),
        new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
      );
    }

    if (this.driveMode === DriveMode.Comfort) {
      return new ComfortCalculator(
        this.characteristics.optimalComfortRpmRange(),
        new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
      );
    }

    if (this.driveMode === DriveMode.Sport) {
      return new SportCalculator(
        this.characteristics.optimalSportRpmRange(),
        new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
      );
    }

    return new ComfortCalculator(
      this.characteristics.optimalComfortRpmRange(),
      new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
    );
  }
}
