import { RPM } from "../../src/engine/RPM";
import { RpmRange } from "../../src/engine/RpmRange";

describe("Test RpmRange class", () => {
  test("should create invalid range", () => {
    expect(() => {
      new RpmRange(RPM.k(5), RPM.k(3));
    }).toThrow(new Error("Wrong range data, end is greater than start"));
  });

  test("should create valid range", () => {
    expect(() => {
      new RpmRange(RPM.k(3), RPM.k(5));
    }).not.toThrow(new Error("Wrong range data, end is greater than start"));
  });

  test("should move to the right", () => {
    // given
    const range: RpmRange = RpmRange.of(RPM.k(3), RPM.k(4));

    // when

    // then
    expect(RpmRange.of(RPM.k(4.5), RPM.k(6))).toEqual(range.moveRight(0.5));
    expect(RpmRange.of(RPM.k(6), RPM.k(8))).toEqual(range.moveRight(1));
    expect(RpmRange.of(RPM.k(3), RPM.k(4))).toEqual(range.moveRight(0));
  });

  test("should calculate left half", () => {
    // given
    const range: RpmRange = RpmRange.of(RPM.k(3), RPM.k(4));

    // when

    // then
    expect(RpmRange.of(RPM.k(3), RPM.k(3.5))).toEqual(range.leftHalf());
  });
});
