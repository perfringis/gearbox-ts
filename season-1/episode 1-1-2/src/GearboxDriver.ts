import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";

class GearboxDriver {
  private externalSystems: ExternalSystems = new ExternalSystems();
  private gearbox: Gearbox = new Gearbox();

  // prettier-ignore
  private characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500, 14];

  private gearBoxDriverMode!: number; // mode 1-Eco, 2-Comfort, 3-Sport

  private isMDynamicsMode!: boolean;

  private aggressiveMode!: number; // 1-3

  public handleGas(threshold: number): void {
    // prettier-ignore
    if (this.gearbox.getState() === 2) { // park
      return;
    }

    // prettier-ignore
    if (this.gearbox.getState() === 3) { // neutral
      return;
    }

    // prettier-ignore
    if (this.gearbox.getState() === 4) { // neutral
      return;
    }

    if (threshold < 0) {
      throw new Error();
    }

    if (threshold > 100) {
      throw new Error();
    }

    const currentGear: number = <number>this.gearbox.getCurrentGear();
    // prettier-ignore
    if (currentGear === 0) { // mozna dopisac
      throw new Error();
    }

    const currentRpm: number = this.externalSystems.getCurrentRpm();

    switch (this.gearBoxDriverMode) {
      case 1: {
        // prettier-ignore
        if (this.isMDynamicsMode && this.externalSystems.getAngularSpeed() > 50) {
          break;
        }

        // prettier-ignore
        if (currentRpm > <number>this.characteristics[0] && this.aggressiveMode === 1) {
          if (!(currentGear === this.gearbox.getMaxDrive())) {
            this.gearbox.setCurrentGear(currentGear + 1);
          }
        } else if (currentRpm > (<number>this.characteristics[0] * 130) / 100 && this.aggressiveMode === 2) {
          if (!(currentGear === this.gearbox.getMaxDrive())) {
            this.gearbox.setCurrentGear(currentGear + 1);
          }
        } else if (currentRpm > (<number>this.characteristics[0] * 130) / 100 && this.aggressiveMode === 3) {
          if (!(currentGear === this.gearbox.getMaxDrive())) {
            this.gearbox.setCurrentGear(currentGear + 1);
            //   this.soundModule.makeSound(40);
          }
        } else if (currentRpm < <number>this.characteristics[1]) {
          if (currentGear != 1) {
            this.gearbox.setCurrentGear(currentGear - 1);
          }
        }
        break;
      }

      case 2: {
        // prettier-ignore
        if (this.isMDynamicsMode && this.externalSystems.getAngularSpeed() > 50) {
          break;
        }

        // prettier-ignore
        if (currentRpm < <number>this.characteristics[2]) { // czy redukowac bo za male obroty
          if (currentGear != 1) {
            this.gearbox.setCurrentGear(currentGear - 1);
            break;
          }
        }

        // prettier-ignore
        // czy potrzebny nastepny bieg
        if (threshold < <number>this.characteristics[3] && this.aggressiveMode === 1) {
          if (currentRpm > <number>this.characteristics[4]) {
            if (currentGear != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(currentGear + 1);
            }
          }
        } else if (threshold < <number>this.characteristics[3] && this.aggressiveMode === 2) {
          if (currentRpm > (<number>this.characteristics[4] * 130) / 100) {
            if (currentGear != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(currentGear + 1);
            }
          }
        }

        if (
          threshold < <number>this.characteristics[3] &&
          this.aggressiveMode === 3
        ) {
          if (currentRpm > (<number>this.characteristics[4] * 130) / 100) {
            if (currentGear != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(currentGear + 1);
              //   this.soundModule.makeSound(40);
            }
          } else {
            // kickdown(ale jednak redukcja bo TIR)
            if (currentRpm < <number>this.characteristics[5]) {
              // nie sa zbyt wysokie
              if (currentGear != 1) {
                this.gearbox.setCurrentGear(currentGear - 1);
              }
            }
          }
          break;
        }
      }

      case 3: {
        // prettier-ignore
        if (this.isMDynamicsMode && this.externalSystems.getAngularSpeed() > 50) {
          break;
        }

        // prettier-ignore
        if (currentRpm < <number>this.characteristics[6]) { // czy zbyt obroty i trzeba zredukowac
          if (currentGear != 1) {
            this.gearbox.setCurrentGear(currentGear - 1);
            break;
          }
        }

        // prettier-ignore
        // czy potrzebny nastepny bieg?
        if (threshold < <number>this.characteristics[7] && this.aggressiveMode === 1) {
          if (currentRpm > <number>this.characteristics[8]) {
            if (currentGear != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(currentGear + 1);
            }
          }
        } else if (threshold < <number>this.characteristics[7] && this.aggressiveMode === 2) {
          if (currentRpm > <number>this.characteristics[8] && 130 / 100) {
            if (currentGear != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(currentGear + 1);
            }
          }
        } else if (threshold < <number>this.characteristics[7] && this.aggressiveMode === 3) {
          if (currentRpm > <number>this.characteristics[8] && 130 / 100) {
            if (currentGear != this.gearbox.getMaxDrive()) {
              this.gearbox.setCurrentGear(currentGear + 1);
              //   this.soundModule.makeSound(40);
            }
          }
        } else if (threshold < <number>this.characteristics[9]) {
          // lekki kickdown
          if (currentRpm < <number>this.characteristics[10]) {
            if (currentGear != 1) {
              this.gearbox.setCurrentGear(currentGear - 1);
            }
          }
        } else { // mocny kickdown - zapierdalamy! - TO JAKO NOWE WYMAGANIE
          if (currentRpm < <number>this.characteristics[11]) { // nie sa zbyt niskie
            if (currentGear != 1) {
              this.gearbox.setCurrentGear(currentGear - 1);
              if (this.gearbox.getCurrentGear() != 1) {
                this.gearbox.setCurrentGear(
                  <number>this.gearbox.getCurrentGear() - 1
                );
              }
            }
          }
        }
      }
    }
  }
}
