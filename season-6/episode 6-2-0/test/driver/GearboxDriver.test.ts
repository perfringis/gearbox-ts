import {
  instance,
  when,
  verify,
  _,
  deepEqual,
  imock,
} from "@johanblumenberg/ts-mockito";
import { GearboxDriver } from "../../src/driver/GearboxDriver";
import { GearCalculators } from "../../src/driver/calculator/GearCalculators";
import { Shifter } from "../../src/driver/shifter/Shifter";
import { RpmProvider } from "../../src/engine/RpmProvider";
import { RPM } from "../../src/engine/RPM";
import { Gear } from "../../src/driver/Gear";
import { OptimalRange } from "../../src/carspecific/boringcommoncar/OptimalRange";
import { GearRange } from "../../src/driver/GearRange";
import { RpmRange } from "../../src/engine/RpmRange";

describe("GearboxDriverTest", () => {
  let driver: GearboxDriver;

  let gearCalculators: GearCalculators;
  let shifter: Shifter;
  let rpmProvider: RpmProvider;

  beforeEach(() => {
    rpmProvider = imock();
    shifter = imock();
    gearCalculators = imock();

    driver = new GearboxDriver(
      instance(rpmProvider),
      instance(shifter),
      instance(gearCalculators)
    );
  });

  test("should not shift in park mode", () => {
    // given
    driver.enablePark();

    // when
    driver.recalculate();

    // then
    verify(shifter.changeGearTo).never();
    verify(shifter.currentGear).never();
    verify(shifter.getMaxDrive).never();
  });

  test("should not shift in neutral mode", () => {
    // given
    driver.enableNeutral();

    // when
    driver.recalculate();

    // then
    verify(shifter.changeGearTo).never();
    verify(shifter.currentGear).never();
    verify(shifter.getMaxDrive).never();
  });

  test("should shift to recalculated gear in drive mode and optimal range calculator", () => {
    // given
    driver.enableDrive();
    // and
    when(rpmProvider.current()).thenReturn(RPM.k(4));
    // and
    when(shifter.currentGear()).thenReturn(new Gear(4));
    // and
    when(gearCalculators.suggest()).thenReturn(
      new OptimalRange(
        new GearRange(new Gear(1), new Gear(8)),
        RpmRange.of(RPM.k(2), RPM.k(3.5))
      )
    );

    // when
    driver.recalculate();

    // then
    verify(shifter.changeGearTo(deepEqual(new Gear(5)))).once();
  });
});
