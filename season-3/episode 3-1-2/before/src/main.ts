import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";

export class MyProgram {
  private readonly externalSystems: ExternalSystems = new ExternalSystems();
  // prettier-ignore
  private readonly characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500];
  private readonly gearbox: Gearbox = new Gearbox();

  main(): void {
    // prettier-ignore
    if (this.externalSystems.getCurrentRpm() > <number>this.characteristics[0]) {
      if (this.gearbox.getMaxDrive() >= <number>this.gearbox.getCurrentGear()) {
        this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
        console.log("No reduction");
      }
    } else if (this.externalSystems.getCurrentRpm() > <number>this.characteristics[1]) {
      if (<number>this.gearbox.getCurrentGear() != 1) {
        this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
        console.log("Reduction");
      }
    }
  }
}

new MyProgram().main();
