import { RPM } from "../src/engine/RPM";

describe("RPM test", () => {
  test("cannot have negative RPMs", () => {
    expect(() => {
      RPM.rpm(-2);
    }).toThrow(new Error("Negative RPM: -2"));
  });

  test("kilos should be equals to units", () => {
    expect(new RPM(2000)).toEqual(RPM.k(2));
    expect(new RPM(2500)).toEqual(RPM.k(2.5));
    expect(new RPM(2700)).toEqual(RPM.k(2.7));
    expect(new RPM(500)).toEqual(RPM.k(0.5));
    expect(new RPM(0)).toEqual(RPM.k(0));
  });
});
