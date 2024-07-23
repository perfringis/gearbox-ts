import { Gear } from "../src/driver/Gear";
import { OptimalRange } from "../src/carspecific/boringcommoncar/OptimalRange";
import { GearRange } from "../src/driver/GearRange";
import { RPM } from "../src/engine/RPM";
import { RpmRange } from "../src/engine/RpmRange";

describe("GearCalculatorTest", () => {
  const calculator: OptimalRange = new OptimalRange(
    new RpmRange(RPM.k(2), RPM.k(3)),
    new GearRange(new Gear(1), new Gear(8))
  );

  test("should shift up when above max RPM", () => {
    // when
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(3300), new Gear(6));

    // then
    expect(nextGear).toEqual(new Gear(7));
  });

  test("should shift down when below min RPM", () => {
    // when
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(1300), new Gear(6));

    // then
    expect(nextGear).toEqual(new Gear(5));
  });

  test("should do nothing within optimal RPM", () => {
    // when
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(2300), new Gear(6));

    // then
    expect(nextGear).toEqual(new Gear(6));
  });

  test("should do nothing when max gear reached", () => {
    // when
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(3300), new Gear(8));

    // then
    expect(nextGear).toEqual(new Gear(8));
  });

  test("should do nothing when minimal gear reached", () => {
    // when
    const nextGear: Gear = calculator.calculateGear(RPM.rpm(1300), new Gear(1));

    // then
    expect(nextGear).toEqual(new Gear(1));
  });
});
