import { Characteristics } from "./Characteristics";
import { GearboxACL } from "./GearboxACL";
import { GearCalculator } from "./GearCalculator";
import { GearRange } from "./GearRange";

enum DriveMode {
  Eco,
  Comfort,
  Sport,
}

export class GearCalculators {
  private driveMode: DriveMode = DriveMode.Comfort;
  private characteristics: Characteristics;
  private gearboxACL: GearboxACL;

  constructor(characteristics: Characteristics, gearboxACL: GearboxACL) {
    this.characteristics = characteristics;
    this.gearboxACL = gearboxACL;
  }

  choose(): GearCalculator {
    if (this.driveMode === DriveMode.Eco) {
      return new GearCalculator(
        this.characteristics.optimalEcoRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    } 

    if (this.driveMode === DriveMode.Comfort) {
      return new GearCalculator(
        this.characteristics.optimalComfortRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    if (this.driveMode === DriveMode.Sport) {
      return new GearCalculator(
        this.characteristics.optimalSportRpmRange(),
        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
      );
    }

    return new GearCalculator(
      this.characteristics.optimalComfortRpmRange(),
      new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
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
}
