import { OptimalRange } from "../../../src/carspecific/boringcommoncar/OptimalRange";
import { Gear } from "../../../src/driver/Gear";
import { GearRange } from "../../../src/driver/GearRange";
import { RPM } from "../../../src/engine/RPM";
import { RpmRange } from "../../../src/engine/RpmRange";

describe("OptimalRangeGearCalculatorTest", () => {
  let gearRange: GearRange = new GearRange(new Gear(1), new Gear(8));
  let rpmRange: RpmRange = RpmRange.of(RPM.k(2), RPM.k(3.5));
  let calculator: OptimalRange = new OptimalRange(gearRange, rpmRange);

  test("a new calculated gear should be one down", () => {
    // given
    const currentGear: Gear = new Gear(2);

    // when
    const calculated: Gear = calculator.calculate(RPM.k(1), currentGear);

    // then
    expect(new Gear(1)).toEqual(calculated);
  });

  test("a new calculated gear should be one up", () => {
    // given
    const currentGear: Gear = new Gear(2);

    // when
    const calculated: Gear = calculator.calculate(RPM.k(4), currentGear);

    // then
    expect(new Gear(3)).toEqual(calculated);
  });
});
