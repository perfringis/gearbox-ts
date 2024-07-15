import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";

enum DriverMode {
  Eco,
  Comfort,
  Sport,
}

export class GearboxDriver {
  // prettier-ignore
  private characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500];

  private gearbox!: Gearbox;
  private externalSystems!: ExternalSystems;

  private mode: DriverMode = DriverMode.Comfort;

  handleGas(threshold: number): void {
    if (<number>this.gearbox.getState() == 2) {
      return;
    }

    if (<number>this.gearbox.getState() == 3) {
      return;
    }

    if (<number>this.gearbox.getState() == 4) {
      return;
    }

    let currentRpm: number = this.externalSystems.getCurrentRpm();

    switch (this.mode) {
      case DriverMode.Eco: {
        if (currentRpm > <number>this.characteristics[0]) {
          if (
            this.gearbox.getMaxDrive() >= <number>this.gearbox.getCurrentGear()
          ) {
            this.gearbox.setCurrentGear(
              <number>this.gearbox.getCurrentGear() + 1
            );
            console.log("No reduction");
          }
        } else if (currentRpm > <number>this.characteristics[1]) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(
              <number>this.gearbox.getCurrentGear() - 1
            );
            console.log("Reduction");
          }
        }

        break;
      }
      case DriverMode.Comfort: {
        if (threshold < 0.5) {
          if (currentRpm > <number>this.characteristics[2]) {
            if (
              this.gearbox.getMaxDrive() >=
              <number>this.gearbox.getCurrentGear()
            ) {
              this.gearbox.setCurrentGear(
                <number>this.gearbox.getCurrentGear() + 1
              );
              console.log("No reduction");
            }
          } else if (currentRpm > <number>this.characteristics[3]) {
            if (<number>this.gearbox.getCurrentGear() != 1) {
              this.gearbox.setCurrentGear(
                <number>this.gearbox.getCurrentGear() - 1
              );
              console.log("Reduction");
            }
          }
        } else {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(
              <number>this.gearbox.getCurrentGear() - 1
            );
            console.log("Reduction");
          }
        }

        break;
      }
      case DriverMode.Sport: {
        if (threshold <= 0.5) {
          if (currentRpm > <number>this.characteristics[6]) {
            if (
              this.gearbox.getMaxDrive() >=
              <number>this.gearbox.getCurrentGear()
            ) {
              this.gearbox.setCurrentGear(
                <number>this.gearbox.getCurrentGear() + 1
              );
              console.log("No reduction");
            }
          } else if (currentRpm > <number>this.characteristics[7]) {
            if (<number>this.gearbox.getCurrentGear() != 1) {
              this.gearbox.setCurrentGear(
                <number>this.gearbox.getCurrentGear() - 1
              );
              console.log("Reduction");
            }
          }
        } else if (threshold > 0.5) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(
              <number>this.gearbox.getCurrentGear() - 1
            );
            console.log("Reduction");
          }
        } else if (threshold > 0.7) {
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(
              <number>this.gearbox.getCurrentGear() - 1
            );
            console.log("Reduction");
          }
          if (<number>this.gearbox.getCurrentGear() != 1) {
            this.gearbox.setCurrentGear(
              <number>this.gearbox.getCurrentGear() - 1
            );
            console.log("Reduction");
          }
        }

        break;
      }
    }
  }

  public getGearbox(): Gearbox {
    return this.gearbox;
  }

  public setGearbox(value: Gearbox) {
    this.gearbox = value;
  }

  public getExternalSystems(): ExternalSystems {
    return this.externalSystems;
  }

  public setExternalSystems(value: ExternalSystems) {
    this.externalSystems = value;
  }
}
