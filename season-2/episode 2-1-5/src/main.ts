import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";
import { GearboxDriver } from "./GearboxDriver";

let driver: GearboxDriver = new GearboxDriver();
let gearbox: Gearbox = new Gearbox();
let externalSystems: ExternalSystems = new ExternalSystems();
gearbox.setCurrentGear(3);
gearbox.setGearBoxCurrentParams([4, 3]);
externalSystems.setCurrentRpm(3000);
driver.setGearbox(gearbox);
driver.setExternalSystems(externalSystems);

driver.handleGas();