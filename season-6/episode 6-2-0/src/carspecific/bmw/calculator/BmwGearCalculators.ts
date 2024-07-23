import { AggressiveLevel } from "./AggresiveLevel";
import { BmwExternalSystems } from "../BmwExternalSystems";
import { Characteristics } from "../Characteristics";
import { DoubleKickdown } from "./DoubleKickdown";
import { Gear } from "../../../driver/Gear";
import { GearCalculator } from "../../../driver/calculator/GearCalculator";
import { GearCalculators } from "../../../driver/calculator/GearCalculators";
import { GearRange } from "../../../driver/GearRange";
import { Kickdown } from "./Kickdown";
import { MaintainGear } from "../../boringcommoncar/MaintainGear";
import { OptimalRange } from "../../boringcommoncar/OptimalRange";
import { Shifter } from "../../../driver/shifter/Shifter";

enum DriveMode {
  Eco,
  Comfort,
  Sport,
}

export class BmwGearCalculators implements GearCalculators {
  private mode: DriveMode = DriveMode.Comfort;
  private readonly characteristics: Characteristics;
  private readonly shifter: Shifter;
  private readonly bmwExternalSystems: BmwExternalSystems;
  private mDynamics!: boolean;
  private aggressiveLevel: AggressiveLevel = AggressiveLevel.FIRST;
  private kickedDown!: boolean;

  // prettier-ignore
  constructor(characteristics: Characteristics, shifter: Shifter, bmwExternalSystems: BmwExternalSystems) {
    this.characteristics = characteristics;
    this.shifter = shifter;
    this.bmwExternalSystems = bmwExternalSystems;
}

  suggest(): GearCalculator {
    if (this.isDrifting()) {
      return new MaintainGear();
    }

    // prettier-ignore
    if (this.mode === DriveMode.Eco) {
      return new OptimalRange(this.gearRange(), this.characteristics.optimalEcoRpmRange());
    }

    // prettier-ignore
    if (this.mode === DriveMode.Comfort) {
      if (this.kickedDown) {
        return new Kickdown(this.gearRange(), this.aggressiveLevel.modify(this.characteristics.optimalComfortRpmRange()));
      } else {
        return new OptimalRange(this.gearRange(), this.aggressiveLevel.modify(this.characteristics.optimalComfortRpmRange()));
      }
    }

    // prettier-ignore
    if (this.mode === DriveMode.Sport) {
        if (this.kickedDown) {
            return new DoubleKickdown(this.gearRange(), this.aggressiveLevel.modify(this.characteristics.optimalSportRpmRange()));
        } else {
            return new OptimalRange(this.gearRange(), this.aggressiveLevel.modify(this.characteristics.optimalSportRpmRange()));
        }
    }

    // prettier-ignore
    return new OptimalRange(this.gearRange(), this.aggressiveLevel.modify(this.characteristics.optimalComfortRpmRange()));
  }

  ecoMode(): void {
    this.mode = DriveMode.Eco;
  }

  comfortMode(): void {
    this.mode = DriveMode.Comfort;
  }

  sportMode(): void {
    this.mode = DriveMode.Sport;
  }

  enableMDynamics(): void {
    this.mDynamics = true;
  }

  disableMDynamics(): void {
    this.mDynamics = false;
  }

  setAggressiveLevel(level: AggressiveLevel): void {
    this.aggressiveLevel = level;
  }

  kickdownEnabled(): void {
    this.kickedDown = true;
  }

  kickdownDisabled(): void {
    this.kickedDown = false;
  }

  private isDrifting(): boolean {
    // prettier-ignore
    return (this.mDynamics && this.bmwExternalSystems.getAngularSpeed() > this.characteristics.angularSpeedForDrifting());
  }

  gearRange(): GearRange {
    return new GearRange(new Gear(1), this.shifter.getMaxDrive());
  }
}
