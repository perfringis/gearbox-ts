import { Gear } from "./Gear";
import { Shifter } from "./shifter/Shifter";
import { GearCalculator } from "./calculator/GearCalculator";
import { RpmProvider } from "../engine/RpmProvider";
import { GearCalculators } from "./calculator/GearCalculators";

enum DriverState {
  Reverse,
  Neutral,
  Park,
  Drive,
}

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private shifter: Shifter;
  private gearCalculators: GearCalculators;
  private state: DriverState = DriverState.Park;

  // prettier-ignore
  constructor(rpmProvider: RpmProvider, shifter: Shifter, gearCalculators: GearCalculators) {
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
