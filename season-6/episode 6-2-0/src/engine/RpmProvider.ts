import { RPM } from "./RPM";

export interface RpmProvider {
  current(): RPM;
}
