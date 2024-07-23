import { RPM } from "../../engine/RPM";
import { RpmRange } from "../../engine/RpmRange";

export class Characteristics {
  // prettier-ignore
  private characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500, 40];

  optimalRange() {
    // prettier-ignore
    return new RpmRange(RPM.k(<number>this.characteristics[1]), RPM.k(<number>this.characteristics[4]));
  }

  optimalComfortRpmRange(): RpmRange {
    // prettier-ignore
    return new RpmRange(RPM.k(<number>this.characteristics[1]), RPM.k(<number>this.characteristics[4]));
  }

  optimalEcoRpmRange(): RpmRange {
    // prettier-ignore
    return new RpmRange(RPM.k(<number>this.characteristics[2]), RPM.k(<number>this.characteristics[4]));
  }

  optimalSportRpmRange(): RpmRange {
    // prettier-ignore
    return new RpmRange(RPM.k(<number>this.characteristics[14]), RPM.k(<number>this.characteristics[15]));
  }

  angularSpeedForDrifting(): number {
    return <number>this.characteristics[16];
  }
}
