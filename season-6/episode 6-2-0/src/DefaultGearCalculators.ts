import { Characteristics } from "./carspecific/bmw/Characteristics";
import { GearboxACL } from "./GearboxACL";
import { OptimalRange } from "./carspecific/boringcommoncar/OptimalRange";
import { GearRange } from "./driver/GearRange";

enum DriveMode {
  Eco,
  Comfort,
  Sport,
}

export class DefaultGearCalculators {
  private driveMode: DriveMode = DriveMode.Comfort;
  private characteristics: Characteristics;
  private gearboxACL: GearboxACL;

  constructor(characteristics: Characteristics, gearboxACL: GearboxACL) {
    this.characteristics = characteristics;
    this.gearboxACL = gearboxACL;
  }

  choose(): OptimalRange {
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

  enableEco() {
    this.driveMode = DriveMode.Eco;
  }

  enableComfort() {
    this.driveMode = DriveMode.Comfort;
  }

  enableSport() {
    this.driveMode = DriveMode.Sport;
  }

  suggest(): import("./driver/calculator/GearCalculator").GearCalculator {
    throw new Error("Method not implemented.");
  }
}
