import { Characteristics } from "../src/carspecific/bmw/Characteristics";
import { Gearbox } from "../src/gearboxspecific/zf8/Gearbox";
import { GearboxACL } from "../src/GearboxACL";
import { OptimalRange } from "../src/carspecific/boringcommoncar/OptimalRange";
import { DefaultGearCalculators } from "../src/DefaultGearCalculators";

describe("GearCalculatorsTest", () => {
  let gearCalculators: DefaultGearCalculators;

  beforeEach(() => {
    gearCalculators = new DefaultGearCalculators(
      new Characteristics(),
      new GearboxACL(new Gearbox())
    );
  });

  test("should return calculator for eco mode", () => {
    // given
    gearCalculators.enableEco();

    // when
    const ecoCalculator: OptimalRange = gearCalculators.choose();

    // then
    expect(ecoCalculator).toBeInstanceOf(OptimalRange);
  });
});
