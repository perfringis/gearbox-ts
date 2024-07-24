import { Gear } from "../../src/driver/Gear";

describe("GearTest", () => {
  test("cannot have gear with negative representation", () => {
    expect(() => {
      new Gear(-2);
    }).toThrow(new Error(`Invalid numeric representation: -2`));
  });

  test("should create next gear", () => {
    expect(new Gear(5)).toEqual(new Gear(4).next());
    expect(new Gear(3)).toEqual(new Gear(2).next());
    expect(new Gear(2)).toEqual(new Gear(1).next());
  });

  test("should create previous gear", () => {
    expect(new Gear(5)).toEqual(new Gear(6).previous());
    expect(new Gear(3)).toEqual(new Gear(4).previous());
    expect(new Gear(2)).toEqual(new Gear(3).previous());
  });

  test("should compare greater gear", () => {
    expect(new Gear(5).greaterThan(new Gear(4))).toEqual(true);
    expect(new Gear(4).greaterThan(new Gear(3))).toEqual(true);

    expect(new Gear(5).greaterThan(new Gear(6))).toEqual(false);
    expect(new Gear(6).greaterThan(new Gear(6))).toEqual(false);
  });

  test("should be less or equal to given gear", () => {
    expect(new Gear(5).lessOrEqualTo(new Gear(5))).toEqual(true);
    expect(new Gear(4).lessOrEqualTo(new Gear(6))).toEqual(true);

    expect(new Gear(5).lessOrEqualTo(new Gear(4))).toEqual(false);
    expect(new Gear(6).lessOrEqualTo(new Gear(3))).toEqual(false);
  });
});
