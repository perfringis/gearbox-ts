# Meta-model

[Managing complexity through the tripartite division of logic – Open/Closed Principle in practice](https://bottega.com.pl/pdf/materialy/receptury/ocp.pdf)

# class diagram

![](./episode%204-3-1_diagram.png)

# What changed?

## GearCalculators.ts

```diff
+import { Characteristics } from "./Characteristics";
+import { GearboxACL } from "./GearboxACL";
+import { GearCalculator } from "./GearCalculator";
+import { GearRange } from "./GearRange";
+
+enum DriveMode {
+  Eco,
+  Comfort,
+  Sport,
+}
+
+export class GearCalculators {
+  private driveMode: DriveMode = DriveMode.Comfort;
+  private characteristics: Characteristics;
+  private gearboxACL: GearboxACL;
+
+  constructor(characteristics: Characteristics, gearboxACL: GearboxACL) {
+    this.characteristics = characteristics;
+    this.gearboxACL = gearboxACL;
+  }
+
+  choose(): GearCalculator {
+    if (this.driveMode === DriveMode.Eco) {
+      return new GearCalculator(
+        this.characteristics.optimalEcoRpmRange(),
+        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
+      );
+    } 
+
+    if (this.driveMode === DriveMode.Comfort) {
+      return new GearCalculator(
+        this.characteristics.optimalComfortRpmRange(),
+        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
+      );
+    }
+
+    if (this.driveMode === DriveMode.Sport) {
+      return new GearCalculator(
+        this.characteristics.optimalSportRpmRange(),
+        new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
+      );
+    }
+
+    return new GearCalculator(
+      this.characteristics.optimalComfortRpmRange(),
+      new GearRange(this.gearboxACL.firstGear(), this.gearboxACL.maxGear())
+    );
+  }
+
+  enableEco() {
+    this.driveMode = DriveMode.Eco;
+  }
+
+  enableComfort() {
+    this.driveMode = DriveMode.Comfort;
+  }
+
+  enableSport() {
+    this.driveMode = DriveMode.Sport;
+  }
+}

```

## GearboxDriver.ts

```diff
import { Characteristics } from "./Characteristics";
import { Gear } from "./Gear";
import { GearboxACL } from "./GearboxACL";
import { GearCalculator } from "./GearCalculator";
import { GearCalculators } from "./GearCalculators";
import { RpmProvider } from "./RpmProvider";

enum DriverState {
  Reverse,
  Neutral,
  Park,
  Drive,
}

export class GearboxDriver {
  private rpmProvider: RpmProvider;
  private gearbox: GearboxACL;
+ private gearCalculators: GearCalculators;
  private state: DriverState = DriverState.Park;

  constructor(
    rpmProvider: RpmProvider,
    gearbox: GearboxACL,
+    gearCalculators: GearCalculators
  ) {
    this.rpmProvider = rpmProvider;
    this.gearbox = gearbox;
+    this.gearCalculators = gearCalculators;
  }

  recalculate(): void {
    if (this.state === DriverState.Drive) {
+      const gearCalculator: GearCalculator = this.gearCalculators.choose();
      const newGear: Gear = gearCalculator.calculateGear(
        this.rpmProvider.current(),
        this.gearbox.currentGear()
      );
      this.gearbox.changeGearTo(newGear);
    }
  }

  enableDrive() {
    this.state = DriverState.Drive;
  }

  enablePark() {
    this.state = DriverState.Park;
  }

  enableReverse() {
    this.state = DriverState.Reverse;
  }

  enableNeutral() {
    this.state = DriverState.Neutral;
  }
}

```

# tests

## GearCalculators.test.ts

```diff
+import { Characteristics } from "../src/Characteristics";
+import { Gearbox } from "../src/Gearbox";
+import { GearboxACL } from "../src/GearboxACL";
+import { GearCalculator } from "../src/GearCalculator";
+import { GearCalculators } from "../src/GearCalculators";
+
+describe("GearCalculatorsTest", () => {
+  let gearCalculators: GearCalculators;
+
+  beforeEach(() => {
+    gearCalculators = new GearCalculators(
+      new Characteristics(),
+      new GearboxACL(new Gearbox())
+    );
+  });
+
+  test("should return calculator for eco mode", () => {
+    // given
+    gearCalculators.enableEco();
+
+    // when
+    const ecoCalculator: GearCalculator = gearCalculators.choose();
+
+    // then
+    expect(ecoCalculator).toBeInstanceOf(GearCalculator);
+  });
+});

```