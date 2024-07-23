import { ExternalSystems } from "./ExternalSystems";
import { RPM } from "./engine/RPM";

export class DefaultRpmProvider {
  private externalSystems: ExternalSystems;

  constructor(externalSystems: ExternalSystems) {
    this.externalSystems = externalSystems;
  }

  current(): RPM {
    return RPM.k(this.externalSystems.getCurrentRpm());
  }
}
