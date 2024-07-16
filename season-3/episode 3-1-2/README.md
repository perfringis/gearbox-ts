# Code Improvement

Slawek and Kuba act as consultants. They don't know what the client's domain is about.

# Bottom-up Analysis

The best solution is a bottom-up analysis. Start with functions in classes. Then classes, and finally business processes.

# Code Fragment Analysis

```typescript
import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";

class MyProgram {
  private readonly externalSystems: ExternalSystems = new ExternalSystems();
  // prettier-ignore
  private readonly characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500];
  private readonly gearbox: Gearbox = new Gearbox();

  main(): void {
    // prettier-ignore
    if (this.externalSystems.getCurrentRpm() > <number>this.characteristics[0]) {
      if (this.gearbox.getMaxDrive() >= <number>this.gearbox.getCurrentGear()) {
        this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
        console.log("No reduction");
      }
    } else if (this.externalSystems.getCurrentRpm() > <number>this.characteristics[1]) {
      if (<number>this.gearbox.getCurrentGear() != 1) {
        this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
        console.log("Reduction");
      }
    }
  }
}

new MyProgram().main();
```

1. The fragment is related to shifting up or down gears.
2. When to shift up or down depends on the characteristics and the current RPM!
3. The following dependencies are visible: to externalSystems, to characteristics, to getMaxDrive, to getCurrentGear.

# When to Start Writing Tests During Project Refactoring?

When we have some understanding of the responsibility division between classes. This approach is called exploratory programming. For now, we are looking for the initial shape of the solution.

# Further Observations

Gear shifting depends only on:

1. Engine RPM.
2. Current gear.

And a few constants:

1. A constant from the characteristics.
2. A constant from getMaxDrive.

# Responsibility of This Code Fragment

In this case, we only want to test this fragment. Move it to another class.

# Coupling in Code When Moving Code Fragments

We need to think about how to reduce coupling during testing.

# The Gibberish Game

[The Gibberish Game](https://gregfyoung.wordpress.com/2012/02/28/the-gibberish-game/)

This is a game where we delay naming a class. Over time, we want the name to emerge naturally.

# Before Versus After

This is the code before the changes:

The main goal we want to achieve is to decouple the business logic from dependencies such as `getCurrentRpm`, `minRpm`, `maxRpm`, `getCurrentGear`, and `getMaxDrive`.

```typescript
import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";

class MyProgram {
  private readonly externalSystems: ExternalSystems = new ExternalSystems();
  // prettier-ignore
  private readonly characteristics: Object[] = [2000, 1000, 1000, 0.5, 2500, 4500, 1500, 0.5, 5000, 0.7, 5000, 5000, 1500, 2000, 3000, 6500];
  private readonly gearbox: Gearbox = new Gearbox();

  main(): void {
    // prettier-ignore
    if (this.externalSystems.getCurrentRpm() > <number>this.characteristics[0]) {
      if (this.gearbox.getMaxDrive() >= <number>this.gearbox.getCurrentGear()) {
        this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() + 1);
        console.log("No reduction");
      }
    } else if (this.externalSystems.getCurrentRpm() > <number>this.characteristics[1]) {
      if (<number>this.gearbox.getCurrentGear() != 1) {
        this.gearbox.setCurrentGear(<number>this.gearbox.getCurrentGear() - 1);
        console.log("Reduction");
      }
    }
  }
}

new MyProgram().main();
```

Here is the new implementation of the code:

```typescript
import { ExternalSystems } from "./ExternalSystems";
import { Gearbox } from "./Gearbox";

class BlaBla {
  private minRpm: number;
  private maxRpm: number;
  private maxDrive: number;

  constructor(minRpm: number, maxRpm: number, maxDrive: number) {
    this.minRpm = minRpm;
    this.maxRpm = maxRpm;
    this.maxDrive = maxDrive;
  }

  public invoke(currentRpm: number, currentGear: number): number {
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

    const gear: number = new BlaBla(minRpm, maxRpm, maxDrive).invoke(currentRpm, currentGear);

    this.gearbox.setCurrentGear(gear);
  }
}

new MyProgram().main();
```

# 3C Theory

Theory prepared by Google.

## Call Coupling

This is coupling at call time. I depend on someone because someone passed me these parameters.

## Contain Coupling

This is coupling where a class contains references to other objects.

## Create Coupling

This is coupling where we create collaborators. This does not mean creating a new string, but creating a new business object.

# How Do We Choose Attributes and Parameters?

Class attributes are values that usually change rarely (or not at all). Our attributes are minRpm (lower limit), maxRpm (upper limit), and maxDrive (the maximum gear we can shift to).

What is a parameter?

What can change at any moment. In our example, currentRpm and currentGear.

SRP or Single Responsibility Principle is a fancy name for a class characterized by high cohesion.

One reason for change = change in the rule, for example, how gears change.

# Coupling and the Lifetime of Attributes and Parameters

In our case, currentRpm and currentGear have a very short lifespan. They need to be updated frequently. For minRpm, maxRpm, and maxDrive, this is not necessary. They are more like constants.
