import {
  mock,
  instance,
  when,
  verify,
  _,
  deepEqual,
} from "@johanblumenberg/ts-mockito";
import { DefaultRpmProvider } from "../src/DefaultRpmProvider";
import { GearboxACL } from "../src/GearboxACL";
import { Gear } from "../src/driver/Gear";
import { GearboxDriver } from "../src/driver/GearboxDriver";
import { RPM } from "../src/engine/RPM";
import { DefaultGearCalculators } from "../src/DefaultGearCalculators";
import { OptimalRange } from "../src/carspecific/boringcommoncar/OptimalRange";
import { GearRange } from "../src/driver/GearRange";
import { RpmRange } from "../src/engine/RpmRange";

describe("GearboxDriverTest", () => {
  let rpmProvider: DefaultRpmProvider;
  let gearboxACL: GearboxACL;
  let gearCalculators: DefaultGearCalculators;

  let gearTwo: Gear;
  let gearEight: Gear;
  let gearOne: Gear;

  let driver: GearboxDriver;

  beforeEach(() => {
    rpmProvider = mock(DefaultRpmProvider);
    gearboxACL = mock(GearboxACL);
    gearCalculators = mock(DefaultGearCalculators);

    gearTwo = new Gear(2);
    gearEight = new Gear(8);
    gearOne = new Gear(1);

    driver = new GearboxDriver(
      instance(rpmProvider),
      instance(gearboxACL),
      instance(gearCalculators)
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
    when(rpmProvider.current()).thenReturn(RPM.k(3200));
    // and
    when(gearCalculators.choose()).thenReturn(
      new OptimalRange(
        new RpmRange(RPM.k(2000), RPM.k(3000)),
        new GearRange(new Gear(1), new Gear(8))
      )
    );
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
