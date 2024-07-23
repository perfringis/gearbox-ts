import { Gear } from "../src/driver/Gear";
import { GearRange } from "../src/driver/GearRange";

describe("GearRangeTest", () => {
  const oneToEight: GearRange = new GearRange(new Gear(1), new Gear(8));

  test("cannot create invalid range", () => {
    expect(() => {
      new GearRange(new Gear(2), new Gear(1));
    }).toThrow(new Error("Invalid gear range"));
  });

  test("should trim when too high gear", () => {
    expect(new Gear(8)).toEqual(oneToEight.trim(new Gear(8)));
  });

  test("should trim when too low gear", () => {
    expect(new Gear(1)).toEqual(oneToEight.trim(new Gear(0)));
  });
});
