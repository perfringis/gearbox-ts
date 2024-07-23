import { RPM } from "../engine/RPM";
import { RpmProvider } from "../engine/RpmProvider";

export class N55EngineRpmProvider implements RpmProvider {
  private rpm: number = 2000;

  setRpm(rpm: number): void {
    this.rpm = rpm;
  }

  current(): RPM {
    return RPM.k(this.rpm);
  }
}
