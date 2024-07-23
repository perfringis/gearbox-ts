import { RPM } from "../src/engine/RPM";
import { RpmRange } from "../src/engine/RpmRange";

describe("Test RpmRange class", () => {
  test("should create invalid range", () => {
    expect(() => {
      new RpmRange(RPM.k(5), RPM.k(3));
    }).toThrow(new Error("Wrong RPMs"));
  });

  test("should create valid range", () => {
    expect(() => {
      new RpmRange(RPM.k(3), RPM.k(5));
    }).not.toThrow(new Error("Wrong RPMs"));
  });
});
