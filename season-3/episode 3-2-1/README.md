# before

Since our implementation of BlaBla meets the metrics, we can now name it. What does the BlaBla class do? It calculates the gear based on the current RPM and gear. How do we name a class that calculates? Of course, GearCalculator.

Class `GearCalculator`

```typescript
export class GearCalculator {
    private minRpm: number;
    private maxRpm: number;
    private maxDrive: number;
  
    constructor(minRpm: number, maxRpm: number, maxDrive: number) {
      this.minRpm = minRpm;
      this.maxRpm = maxRpm;
      this.maxDrive = maxDrive;
    }
  
    public calculate(currentRpm: number, currentGear: number): number {
      if (currentRpm > this.maxRpm) {
        if (currentGear === this.maxDrive) {
          return currentGear;
        }
        return currentGear + 1;
      }
  
      if (currentRpm < this.minRpm) {
        if (currentGear === 1) {
          return currentGear;
        }
        return currentGear - 1;
      }
  
      return currentGear;
    }
  }
```

Script `main.ts`:

```typescript
import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";
import { GearCalculator } from "./GearCalculator";

class MyProgram {
  private readonly externalSystems: ExternalSystems = new ExternalSystems();
  // prettier-ignore
  private readonly characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500];
  private readonly gearbox: Gearbox = new Gearbox();

  main(): void {
    const currentRpm: number = this.externalSystems.getCurrentRpm();
    const minRpm: number = <number>this.characteristics[1];
    const maxRpm: number = <number>this.characteristics[0];
    const currentGear: number = <number>this.gearbox.getCurrentGear();
    const maxDrive: number = this.gearbox.getMaxDrive();

    const gear: number = new GearCalculator(minRpm, maxRpm, maxDrive).calculate(currentRpm, currentGear);

    this.gearbox.setCurrentGear(gear);
  }
}

new MyProgram().main();

```

# after

Just before the tests, Kuba added the implementation of the RPM class. This class is responsible for checking if a given RPM can be negative or exceed the upper limit (if such a limit existed). Thanks to this, we remove the responsibility of correct RPM values from the GearCalculator class. Then minRpm, maxRpm, and currentRpm are transformed into value objects. After these transformations, Kuba wrote tests for the GearCalculator class.

Class `RPM`:

```typescript
export class RPM {
  private rpm: number;

  static k(k: number): RPM {
    return RPM.rpm(k * 1000);
  }

  static rpm(rpm: number): RPM {
    return new RPM(rpm);
  }

  constructor(rpm: number) {
    if (rpm < 0) {
      throw new Error(`Negative RPM: ${rpm}`);
    }
    this.rpm = rpm;
  }

  greaterThan(rpm: RPM): boolean {
    return this.compareTo(rpm) > 0;
  }

  lowerThan(rpm: RPM): boolean {
    return this.compareTo(rpm) < 0;
  }

  public compareTo(otherRpm: RPM): number {
    if (this.rpm > otherRpm.rpm) {
      return 1;
    } else if (this.rpm < otherRpm.rpm) {
      return -1;
    } else {
      return 0;
    }
  }
}

```

Class `GearCalculator`:

```typescript
import { RPM } from "./RPM";

export class GearCalculator {
  private minRpm: RPM;
  private maxRpm: RPM;
  private maxDrive: number;

  constructor(minRpm: RPM, maxRpm: RPM, maxDrive: number) {
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.maxDrive = maxDrive;
  }

  public calculate(currentRpm: RPM, currentGear: number): number {
    if (currentRpm.greaterThan(this.maxRpm)) {
      if (currentGear === this.maxDrive) {
        return currentGear;
      }
      return currentGear + 1;
    }

    if (currentRpm.lowerThan(this.minRpm)) {
      if (currentGear === 1) {
        return currentGear;
      }
      return currentGear - 1;
    }

    return currentGear;
  }
}

```

Script `main.ts`:

```typescript
import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";
import { GearCalculator } from "./GearCalculator";
import { RPM } from "./RPM";

class MyProgram {
  private readonly externalSystems: ExternalSystems = new ExternalSystems();
  // prettier-ignore
  private readonly characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500];
  private readonly gearbox: Gearbox = new Gearbox();

  main(): void {
    const currentRpm: number = this.externalSystems.getCurrentRpm();
    const minRpm: number = <number>this.characteristics[1];
    const maxRpm: number = <number>this.characteristics[0];
    const currentGear: number = <number>this.gearbox.getCurrentGear();
    const maxDrive: number = this.gearbox.getMaxDrive();

    const gear: number = new GearCalculator(
      RPM.rpm(minRpm),
      RPM.rpm(maxRpm),
      maxDrive
    ).calculate(RPM.rpm(currentRpm), currentGear);

    this.gearbox.setCurrentGear(gear);
  }
}

new MyProgram().main();

```

# value object versus Utils

In the case of utilities, the representation of business logic fades away. A new person on the project would likely create their own utility, which would be somewhat similar to the old one. Additionally, we are still working with primitive types.