import { Characteristics } from "../src/Characteristics";
import { Gearbox } from "../src/Gearbox";
import { GearboxACL } from "../src/GearboxACL";
import { GearCalculator } from "../src/GearCalculator";
import { GearCalculators } from "../src/GearCalculators";

describe("GearCalculatorsTest", () => {
  let gearCalculators: GearCalculators;

  beforeEach(() => {
    gearCalculators = new GearCalculators(
      new Characteristics(),
      new GearboxACL(new Gearbox())
    );
  });

  test("should return calculator for eco mode", () => {
    // given
    gearCalculators.enableEco();

    // when
    const ecoCalculator: GearCalculator = gearCalculators.choose();

    // then
    expect(ecoCalculator).toBeInstanceOf(GearCalculator);
  });
});
