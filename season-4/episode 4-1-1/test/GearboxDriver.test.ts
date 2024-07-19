import { Characteristics } from "../src/Characteristics";
import {
  mock,
  instance,
  when,
  verify,
  _,
  deepEqual,
} from "@johanblumenberg/ts-mockito";
import { RpmProvider } from "../src/RpmProvider";
import { GearboxACL } from "../src/GearboxACL";
import { Gear } from "../src/Gear";
import { GearboxDriver } from "../src/GearboxDriver";
import { RpmRange } from "../src/RpmRange";
import { RPM } from "../src/RPM";

describe("GearboxDriverTest", () => {
  let rpmProvider: RpmProvider;
  let gearboxACL: GearboxACL;
  let characteristics: Characteristics;

  let gearTwo: Gear;
  let gearEight: Gear;
  let gearOne: Gear;

  let driver: GearboxDriver;

  beforeEach(() => {
    rpmProvider = mock(RpmProvider);
    gearboxACL = mock(GearboxACL);
    characteristics = mock(Characteristics);

    gearTwo = new Gear(2);
    gearEight = new Gear(8);
    gearOne = new Gear(1);

    driver = new GearboxDriver(
      instance(rpmProvider),
      instance(gearboxACL),
      instance(characteristics)
    );
  });

  test("should recalculate gear in drive mode", () => {
    // given
    driver.enableDrive();
    // and
    when(gearboxACL.maxGear()).thenReturn(gearEight);
    // and
    when(gearboxACL.firstGear()).thenReturn(gearOne);
    // and
    when(gearboxACL.currentGear()).thenReturn(gearOne);
    // and
    when(characteristics.optimalComfortRpmRange()).thenReturn(
      new RpmRange(RPM.k(2000), RPM.k(3000))
    );
    // and
    when(rpmProvider.current()).thenReturn(RPM.k(3200));

    // when
    driver.recalculate();

    // then
    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).once();
  });

  test("should not recalculate gear in reverse mode", () => {
    // given
    driver.enableReverse();

    // when
    driver.recalculate();

    // then
    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).never();
  });

  test("should not recalculate gear in park mode", () => {
    // given
    driver.enablePark();

    // when
    driver.recalculate();

    // then
    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).never();
  });

  test("should not recalculate gear in neural mode", () => {
    // given
    driver.enableNeutral();

    // when
    driver.recalculate();

    // then
    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).never();
  });
});
