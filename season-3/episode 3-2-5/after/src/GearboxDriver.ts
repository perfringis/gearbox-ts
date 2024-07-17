import { Gear } from "./Gear";
import { GearboxACL } from "./GearboxACL";
import { GearCalculator } from "./GearCalculator";
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
  private gearCalculator: GearCalculator;
  private state: DriverState = DriverState.Park;

  constructor(
    rpmProvider: RpmProvider,
    gearbox: GearboxACL,
    gearCalculator: GearCalculator
  ) {
    this.rpmProvider = rpmProvider;
    this.gearbox = gearbox;
    this.gearCalculator = gearCalculator;
  }

  recalculate(): void {
    if ((this.state = DriverState.Drive)) {
      const newGear: Gear = this.gearCalculator.calculateGear(
        this.rpmProvider.current(),
        this.gearbox.currentGear()
      );
      this.gearbox.changeGearTo(newGear);
    }
  }
}
