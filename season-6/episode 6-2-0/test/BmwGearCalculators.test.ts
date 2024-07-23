// import { mock, when } from "@johanblumenberg/ts-mockito";
// import { BmwGearCalculators } from "../src/carspecific/bmw/calculator/BmwGearCalculators";
// import { ZF8Shifter } from "../src/gearboxspecific/zf8/ZF8Shifter";
// import { Gear } from "../src/driver/Gear";
// import { Characteristics } from "../src/carspecific/bmw/Characteristics";
// import { BmwExternalSystems } from "../src/carspecific/bmw/BmwExternalSystems";

// describe("BmwGearCalculatorsTest", () => {
//   let bmwGearCalculators: BmwGearCalculators;
//   let zf8Shifter: ZF8Shifter;

//   beforeEach(() => {
//     zf8Shifter = zf8ShifterWith8Gears();
//     bmwGearCalculators = new BmwGearCalculators(
//       bmwCharacteristics(),
//       zf8Shifter,
//       bmwExternalSystems()
//     );
//   });

//   const zf8ShifterWith8Gears = (): ZF8Shifter => {
//     const stub: ZF8Shifter = mock(ZF8Shifter);
//     when(stub.getMaxDrive()).thenReturn(new Gear(8));

//     return stub;
//   };

//   const bmwCharacteristics = (): Characteristics => {
//     return new Characteristics();
//   };

//   const bmwExternalSystems = (): BmwExternalSystems => {
//     return new BmwExternalSystems();
//   };
// });
