import { Gear } from "./Gear";
import { DefaultGearCalculators } from "../DefaultGearCalculators";
import { DefaultRpmProvider } from "../DefaultRpmProvider";
import { Shifter } from "./shifter/Shifter";
import { GearCalculator } from "./calculator/GearCalculator";

enum DriverState {
  Reverse,
  Neutral,
  Park,
  Drive,
}

export class GearboxDriver {
  private rpmProvider: DefaultRpmProvider;
  private shifter: Shifter;
  private gearCalculators: DefaultGearCalculators;
  private state: DriverState = DriverState.Park;

  // prettier-ignore
  constructor(rpmProvider: DefaultRpmProvider, shifter: Shifter, gearCalculators: DefaultGearCalculators) {
    this.rpmProvider = rpmProvider;
    this.shifter = shifter;
    this.gearCalculators = gearCalculators;
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

  recalculate(): void {
    if (this.state === DriverState.Drive) {
      const newGear: Gear = this.suggestedGear();
      this.shifter.changeGearTo(newGear);
    }
  }

  suggestedGear(): Gear {
    const gearCalculator: GearCalculator = this.gearCalculators.suggest();
    // prettier-ignore
    return gearCalculator.calculate(this.rpmProvider.current(), this.shifter.currentGear());
  }
}
