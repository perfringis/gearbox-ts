import { GearCalculator } from "../src/GearCalculator";
import { RPM } from "../src/RPM";

describe("GearCalculatorTest", () => {
  const calculator: GearCalculator = new GearCalculator(RPM.k(2), RPM.k(3), 8);

  test("should shift up when above max RPM", () => {
    // when
    const nextGear: number = calculator.calculate(RPM.rpm(3300), 6);

    // then
    expect(nextGear).toBe(7);
  });

  test("should shift down when below min RPM", () => {
    // when
    const nextGear: number = calculator.calculate(RPM.rpm(1300), 6);

    // then
    expect(nextGear).toBe(5);
  });

  test("should do nothing within optimal RPM", () => {
    // when
    const nextGear: number = calculator.calculate(RPM.rpm(2300), 6);

    // then
    expect(nextGear).toBe(6);
  });

  test("should do nothing when max gear reached", () => {
    // when
    const nextGear: number = calculator.calculate(RPM.rpm(3300), 8);

    // then
    expect(nextGear).toBe(8);
  });

  test("should do nothing when minimal gear reached", () => {
    // when
    const nextGear: number = calculator.calculate(RPM.rpm(1300), 1);

    // then
    expect(nextGear).toBe(1);
  });
});
