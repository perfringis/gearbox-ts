import { Characteristics } from "./Characteristics";
import { Gear } from "./Gear";
import { GearboxACL } from "./GearboxACL";
import { GearCalculator } from "./GearCalculator";
import { GearCalculators } from "./GearCalculators";
import { RpmProvider } from "./RpmProvider";

enum DriverState {
  Reverse,
  Neutral,
  Park,
  Drive,
}

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private gearbox: GearboxACL;
  private gearCalculators: GearCalculators;
  private state: DriverState = DriverState.Park;

  constructor(
    rpmProvider: RpmProvider,
    gearbox: GearboxACL,
    gearCalculators: GearCalculators
  ) {
    this.rpmProvider = rpmProvider;
    this.gearbox = gearbox;
    this.gearCalculators = gearCalculators;
  }

  recalculate(): void {
    if (this.state === DriverState.Drive) {
      const gearCalculator: GearCalculator = this.gearCalculators.choose();
      const newGear: Gear = gearCalculator.calculateGear(
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
}
