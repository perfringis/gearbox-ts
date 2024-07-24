import { RPM } from "../../src/engine/RPM";
import { RpmRange } from "../../src/engine/RpmRange";

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

  // prettier-ignore
  test("rpm should be above range", () => {
    expect(RPM.rpm(2000).isAbove(RpmRange.of(RPM.rpm(1000), RPM.rpm(1999)))).toEqual(true);
    expect(RPM.rpm(2000).isAbove(RpmRange.of(RPM.rpm(1000), RPM.rpm(1000)))).toEqual(true);
    expect(RPM.rpm(2000).isAbove(RpmRange.of(RPM.rpm(1998), RPM.rpm(1999)))).toEqual(true);

    expect(RPM.rpm(2000).isAbove(RpmRange.of(RPM.rpm(1000), RPM.rpm(2000)))).toEqual(false);
    expect(RPM.rpm(2000).isAbove(RpmRange.of(RPM.rpm(10), RPM.rpm(2001)))).toEqual(false);
    expect(RPM.rpm(2000).isAbove(RpmRange.of(RPM.rpm(2000), RPM.rpm(3000)))).toEqual(false);
    expect(RPM.rpm(2000).isAbove(RpmRange.of(RPM.rpm(2001), RPM.rpm(3000)))).toEqual(false);
  });

  // prettier-ignore
  test("rpm should be below range", () => {
    expect(RPM.rpm(2000).isBellow(RpmRange.of(RPM.rpm(2001), RPM.rpm(2500)))).toEqual(true);
    expect(RPM.rpm(2000).isBellow(RpmRange.of(RPM.rpm(3000), RPM.rpm(4000)))).toEqual(true);
  
    expect(RPM.rpm(2000).isBellow(RpmRange.of(RPM.rpm(2000), RPM.rpm(2001)))).toEqual(false);
    expect(RPM.rpm(2000).isBellow(RpmRange.of(RPM.rpm(1998), RPM.rpm(1999)))).toEqual(false);
    expect(RPM.rpm(2000).isBellow(RpmRange.of(RPM.rpm(1998), RPM.rpm(2000)))).toEqual(false);
  });

  test("rpm should scale", () => {
    expect(RPM.rpm(1000)).toEqual(RPM.rpm(2000).scale(0.5));
    expect(RPM.rpm(4000)).toEqual(RPM.rpm(2000).scale(2));
    expect(RPM.rpm(5200)).toEqual(RPM.rpm(2000).scale(2.6));
  });
});
