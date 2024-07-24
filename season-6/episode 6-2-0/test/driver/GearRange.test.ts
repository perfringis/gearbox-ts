import { Gear } from "../../src/driver/Gear";
import { GearRange } from "../../src/driver/GearRange";

describe("GearRangeTest", () => {
  const oneToEight: GearRange = new GearRange(new Gear(1), new Gear(8));

  test("cannot create invalid range", () => {
    expect(() => {
      new GearRange(new Gear(2), new Gear(1));
    }).toThrow(new Error("Invalid Range. 2 is greater than 1"));
  });

  test("should create valid range", () => {
    expect(() => {
      new GearRange(new Gear(1), new Gear(2));
    }).not.toThrow(new Error("Invalid Range. 1 is greater than 2"));
  });

  test("should trim when too high gear", () => {
    expect(new Gear(8)).toEqual(oneToEight.trim(new Gear(9)));
  });

  test("should trim when too low gear", () => {
    expect(new Gear(1)).toEqual(oneToEight.trim(new Gear(0)));
  });
});
