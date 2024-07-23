import { Gear } from "../../driver/Gear";
import { GearCalculator } from "../../driver/calculator/GearCalculator";
import { RPM } from "../../engine/RPM";

export class MaintainGear implements GearCalculator {
  calculate(rpm: RPM, current: Gear): Gear {
    return current;
  }
}
