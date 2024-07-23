import { Gear } from "../Gear";
import { RPM } from "../../engine/RPM";

export interface GearCalculator {
  calculate(rpm: RPM, current: Gear): Gear;
}
