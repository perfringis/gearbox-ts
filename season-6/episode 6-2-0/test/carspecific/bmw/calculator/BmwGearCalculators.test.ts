import { instance, mock, when } from "@johanblumenberg/ts-mockito";
import { BmwGearCalculators } from "../../../../src/carspecific/bmw/calculator/BmwGearCalculators";
import { ZF8Shifter } from "../../../../src/gearboxspecific/zf8/ZF8Shifter";
import { Gear } from "../../../../src/driver/Gear";
import { Characteristics } from "../../../../src/carspecific/bmw/Characteristics";
import { BmwExternalSystems } from "../../../../src/carspecific/bmw/BmwExternalSystems";
import { GearCalculator } from "../../../../src/driver/calculator/GearCalculator";
import { MaintainGear } from "../../../../src/carspecific/boringcommoncar/MaintainGear";
import { DoubleKickdown } from "../../../../src/carspecific/bmw/calculator/DoubleKickdown";

describe("BmwGearCalculatorsTest", () => {
  let zf8Shifter: ZF8Shifter;
  let bmwGearCalculators: BmwGearCalculators;

  beforeEach(() => {
    zf8Shifter = zf8ShifterWith8Gears();
    // prettier-ignore
    bmwGearCalculators = new BmwGearCalculators(bmwCharacteristics(), instance(zf8Shifter), bmwExternalSystems());
  });

  test("should maintain gear when drifting with m dynamics", () => {
    // given
    bmwGearCalculators.enableMDynamics();

    // when
    const suggestedCalculator: GearCalculator = bmwGearCalculators.suggest();

    // then
    expect(suggestedCalculator).toBeInstanceOf(MaintainGear);
  });

  test("should suggest double kickdown when kickdown in sport mode", () => {
    // given
    bmwGearCalculators.kickdownEnabled();
    // and
    bmwGearCalculators.sportMode();

    // when
    const suggestedCalculator: GearCalculator = bmwGearCalculators.suggest();

    // then
    expect(suggestedCalculator).toBeInstanceOf(DoubleKickdown);
  });

  const zf8ShifterWith8Gears = (): ZF8Shifter => {
    const stub: ZF8Shifter = mock(ZF8Shifter);
    when(stub.getMaxDrive()).thenReturn(new Gear(8));

    return stub;
  };

  const bmwExternalSystems = (): BmwExternalSystems => {
    return new BmwExternalSystems();
  };

  const bmwCharacteristics = (): Characteristics => {
    return new Characteristics();
  };
});
