# Source

[Functional Decomposition](https://wiki.c2.com/?FunctionalDecomposition)

# Current Implementation

As can be observed, the design from episode 4-1-1 is still flawed. This is a so-called case of functional decomposition. It is characterized by the fact that every if and every switch is delegated to a new class. A distinctive feature of this code is that in the `GearboxDriver` class, the calculation of the new gear is delegated to each new calculator. What is wrong with this? Firstly, the implementation of these calculators does not differ from each other at all. Secondly, in this case, we are only dealing with changes in the values of the passed parameters. There is no properly prepared and differentiated logic for each driving mode here. The characteristics of the revolutions and how many gears a given machine has changed, and that's it.

# What changed?

## GearboxDriver.ts

```diff
import { Characteristics } from "./Characteristics";
import { ComfortCalculator } from "./ComfortCalculator";
import { EcoCalculator } from "./EcoCalculator";
import { Gear } from "./Gear";
import { GearboxACL } from "./GearboxACL";
import { GearCalculator } from "./GearCalculator";
import { GearRange } from "./GearRange";
import { RpmProvider } from "./RpmProvider";
import { SportCalculator } from "./SportCalculator";

enum DriverState {
  Reverse,
  Neutral,
  Park,
  Drive,
}

+enum DriveMode {
+  Eco,
+  Comfort,
+  Sport,
+}

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private gearbox: GearboxACL;
  private characteristics: Characteristics;
  private state: DriverState = DriverState.Park;
+ private driveMode: DriveMode = DriveMode.Comfort;

  constructor(
    rpmProvider: RpmProvider,
    gearbox: GearboxACL,
+    characteristics: Characteristics
  ) {
    this.rpmProvider = rpmProvider;
    this.gearbox = gearbox;
    this.characteristics = characteristics;
  }

  recalculate(): void {
    if ((this.state === DriverState.Drive)) {
      const newGear: Gear = this.chooseCalculator().calculateGear(
        this.rpmProvider.current(),
        this.gearbox.currentGear()
      );
      this.gearbox.changeGearTo(newGear);
    }
  }

+  enableDrive() {
+    this.state = DriverState.Drive;
+  }
+
+  enablePark() {
+    this.state = DriverState.Park;
+  }
+
+  enableReverse() {
+    this.state = DriverState.Reverse;
+  }
+
+  enableNeutral() {
+    this.state = DriverState.Neutral;
+  }
+
+  chooseCalculator(): GearCalculator {
+    if (this.driveMode === DriveMode.Eco) {
+      return new EcoCalculator(
+        this.characteristics.optimalEcoRpmRange(),
+        new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
+      );
+    }
+
+    if (this.driveMode === DriveMode.Comfort) {
+      return new ComfortCalculator(
+        this.characteristics.optimalComfortRpmRange(),
+        new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
+      );
+    }
+
+    if (this.driveMode === DriveMode.Sport) {
+      return new SportCalculator(
+        this.characteristics.optimalSportRpmRange(),
+        new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
+      );
+    }
+
+    return new ComfortCalculator(
+      this.characteristics.optimalComfortRpmRange(),
+      new GearRange(this.gearbox.firstGear(), this.gearbox.maxGear())
+    );
+  }
}

```

# class diagram

![](./episode%204-1-1_diagram.png)

# tests

## GearboxDriver.test.ts

```diff
+import { Characteristics } from "../src/Characteristics";
+import {
+  mock,
+  instance,
+  when,
+  verify,
+  _,
+  deepEqual,
+} from "@johanblumenberg/ts-mockito";
+import { RpmProvider } from "../src/RpmProvider";
+import { GearboxACL } from "../src/GearboxACL";
+import { Gear } from "../src/Gear";
+import { GearboxDriver } from "../src/GearboxDriver";
+import { RpmRange } from "../src/RpmRange";
+import { RPM } from "../src/RPM";
+
+describe("GearboxDriverTest", () => {
+  let rpmProvider: RpmProvider;
+  let gearboxACL: GearboxACL;
+  let characteristics: Characteristics;
+
+  let gearTwo: Gear;
+  let gearEight: Gear;
+  let gearOne: Gear;
+
+  let driver: GearboxDriver;
+
+  beforeEach(() => {
+    rpmProvider = mock(RpmProvider);
+    gearboxACL = mock(GearboxACL);
+    characteristics = mock(Characteristics);
+
+    gearTwo = new Gear(2);
+    gearEight = new Gear(8);
+    gearOne = new Gear(1);
+
+    driver = new GearboxDriver(
+      instance(rpmProvider),
+      instance(gearboxACL),
+      instance(characteristics)
+    );
+  });
+
+  test("should recalculate gear in drive mode", () => {
+    // given
+    driver.enableDrive();
+    // and
+    when(gearboxACL.maxGear()).thenReturn(gearEight);
+    // and
+    when(gearboxACL.firstGear()).thenReturn(gearOne);
+    // and
+    when(gearboxACL.currentGear()).thenReturn(gearOne);
+    // and
+    when(characteristics.optimalComfortRpmRange()).thenReturn(
+      new RpmRange(RPM.k(2000), RPM.k(3000))
+    );
+    // and
+    when(rpmProvider.current()).thenReturn(RPM.k(3200));
+
+    // when
+    driver.recalculate();
+
+    // then
+    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).once();
+  });
+
+  test("should not recalculate gear in reverse mode", () => {
+    // given
+    driver.enableReverse();
+
+    // when
+    driver.recalculate();
+
+    // then
+    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).never();
+  });
+
+  test("should not recalculate gear in park mode", () => {
+    // given
+    driver.enablePark();
+
+    // when
+    driver.recalculate();
+
+    // then
+    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).never();
+  });
+
+  test("should not recalculate gear in neural mode", () => {
+    // given
+    driver.enableNeutral();
+
+    // when
+    driver.recalculate();
+
+    // then
+    verify(gearboxACL.changeGearTo(deepEqual(gearTwo))).never();
+  });
+});

```