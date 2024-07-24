import { Characteristics } from "./carspecific/bmw/Characteristics";
import { GearboxACL } from "./GearboxACL";
import { OptimalRange } from "./carspecific/boringcommoncar/OptimalRange";
import { GearRange } from "./driver/GearRange";
import { GearCalculators } from "./driver/calculator/GearCalculators";
import { GearCalculator } from "./driver/calculator/GearCalculator";

enum DriveMode {
  Eco,
  Comfort,
  Sport,
}

export class DefaultGearCalculators implements GearCalculators {
  private driveMode: DriveMode = DriveMode.Comfort;
  private characteristics: Characteristics;
  private gearboxACL: GearboxACL;

  constructor(characteristics: Characteristics, gearboxACL: GearboxACL) {
    this.characteristics = characteristics;
    this.gearboxACL = gearboxACL;
  }

  enableEco() {
    this.driveMode = DriveMode.Eco;
  }

  enableComfort() {
    this.driveMode = DriveMode.Comfort;
  }

  enableSport() {
    this.driveMode = DriveMode.Sport;
  }

  suggest(): GearCalculator {
    if (this.driveMode === DriveMode.Eco) {
      return new OptimalRange(
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear()),
        this.characteristics.optimalEcoRpmRange()
      );
    }

    if (this.driveMode === DriveMode.Comfort) {
      return new OptimalRange(
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear()),
        this.characteristics.optimalComfortRpmRange()
      );
    }

    if (this.driveMode === DriveMode.Sport) {
      return new OptimalRange(
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear()),
        this.characteristics.optimalSportRpmRange()
      );
    }

    return new OptimalRange(
      new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear()),
      this.characteristics.optimalComfortRpmRange()
    );
  }
}
