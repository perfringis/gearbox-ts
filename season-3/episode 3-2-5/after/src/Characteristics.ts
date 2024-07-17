import { RPM } from "./RPM";
import { RpmRange } from "./RpmRange";

export class Characteristics {
  private characteristics: Object[] = [
    2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500,
    2000, 3000, 6500,
  ];

  optimalRange() {
    return new RpmRange(
      RPM.k(<number>this.characteristics[1]),
      RPM.k(<number>this.characteristics[4])
    );
  }
}
