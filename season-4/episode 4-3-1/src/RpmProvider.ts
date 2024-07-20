import { ExternalSystems } from "./ExternalSystems";
import { RPM } from "./RPM";

export class RpmProvider {
  private externalSystems: ExternalSystems;

  constructor(externalSystems: ExternalSystems) {
    this.externalSystems = externalSystems;
  }

  current(): RPM {
    return RPM.k(this.externalSystems.getCurrentRpm());
  }
}
