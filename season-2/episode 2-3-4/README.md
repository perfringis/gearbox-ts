# Retrospective after Adding New Logic before Extracting Common Business Logic

Currently, at this stage, after adding some new logic, we can see that the code in 3 places does not possess the same logic.

# Introduction of Value Object

Here is a proposal that came from the intern. This implementation was prepared by Kuba.

```typescript
class Threshold {
    private readonly threshold: number;

    constructor(threshold: number) {
        if (threshold < 0) {
            throw new Error();
        }

        this.threshold = threshold;
    }
}
```

Why is this code better than the current state?

1. It encapsulates certain logic.
2. You cannot modify the threshold value.
3. There are no side effects.
4. The implementation is in one place, and any change occurs only in this place.
5. From this point on, we can assume that the `Threshold` object is always correct because we have validation in the constructor.

# Kuba Provides Examples of Value Objects

First and last name. ISBN number of a book.

# What If We Have an Incorrect Threshold in Our Company?

Then we simply create a new class `InvalidThreshold`.

# When Do We Deal with a Good Value Object?

There is a general rule. A good value object has only two attributes it operates on. In the example above, in the threshold implementation, we have only one attribute for now. The second one that would appear would be the last one we could add.

Of course, this rule is too restrictive. In reality, we should aim for two attributes in a given value object.

# An Interesting Example from Sławek

What if we need to have a new threshold because we cannot go into high gear as we might lose the warranty?

In such a case, we can write a `cutoff` method that returns a reduced threshold and returns a new `Threshold` object.

```typescript
class Threshold {
    private readonly threshold: number;

    constructor(threshold: number) {
        if (threshold < 0) {
            throw new Error();
        }

        this.threshold = threshold;
    }

    isKickdown(): boolean {
        return this.threshold > 0.5;
    }

    cutoff(): Threshold {
        return new Threshold(this.threshold * 0.5);
    }
}
```

# Why Do We Want to Split into Smaller Boxes?

Because we want to see which objects are strongly and weakly related to other objects.

# Cohesion vs Coupling

## Very Strong Cohesion

This example is nested in the context of a medical system.

```typescript
class Client {
    readonly isDead;
    name: string;

    changeName(newName: string): void {
        if (isDead) {
            throw new Error();
        }
        this.name = newName;
    }
}
```

How to look at cohesion? See how many fields are used by the methods in a given class!

# Very Weak Cohesion

```typescript
class Client {
    readonly isDead;
    name: string;

    isChangeOfAddressYearAgo: boolean;
    street: string;
    city: string;

    changeName(newName: string): void {
        if (isDead) {
            throw new Error();
        }
        this.name = newName;
    }

    changeAddress(street: string, city: string): void {
        if (isChangeOfAddressYearAgo) {
            throw new Error();
        }
        this.street = street;
        this.city = city;
    }
}
```

In this case, as you can see, cohesion has significantly decreased. Variables are not used in all methods. There is a clear division of logic.

# Look for Anti-Requirements to Determine Code Separation

Try to confront all attributes in the class with each other.