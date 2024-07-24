import { MaintainGear } from "../../../src/carspecific/boringcommoncar/MaintainGear";
import { GearCalculator } from "../../../src/driver/calculator/GearCalculator";
import { Gear } from "../../../src/driver/Gear";
import { RPM } from "../../../src/engine/RPM";

describe("MaintainGearTest", () => {
    let maintainGear: GearCalculator = new MaintainGear();

    beforeEach(() => {
        maintainGear = new MaintainGear();
    });

    test("should maintain gear",() => {
        expect(new Gear(4)).toEqual(maintainGear.calculate(RPM.k(20), new Gear(4)));
    });
});
