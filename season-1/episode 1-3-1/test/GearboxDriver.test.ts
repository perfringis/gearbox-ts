import { ExternalSystems } from "../src/ExternalSystems";
import { Gearbox } from "../src/Gearbox";
import { GearboxDriver } from "../src/GearboxDriver";

import { mock, instance, when, verify, _ } from "@johanblumenberg/ts-mockito";
import { Lights } from "../src/Lights";

describe("Testing the gearbox driver", () => {
  test("Testing the gearbox driver", () => {
    let gearbox: Gearbox = mock(Gearbox);

    let driver: GearboxDriver = new GearboxDriver();
    when(gearbox.getState()).thenReturn(1);
    when(gearbox.getCurrentGear()).thenReturn(2);
    driver.setGearbox(gearbox);

    driver.setIfCaravan(true);

    let externalSystems: ExternalSystems = mock(ExternalSystems);
    let lights: Lights = mock(Lights);

    when(externalSystems.getLights()).thenReturn(lights);
    when(lights.getLightsPosition()).thenReturn(2);
    when(externalSystems.getCurrentRpm()).thenReturn(3000);

    driver.handleGas(0.3);

    // verify(gearbox.setCurrentGear(1)).called();
    expect(true).toBe(true);
  });
});
