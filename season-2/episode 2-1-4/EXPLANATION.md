# Presentation Layer and Business Logic (Mechanism of Action)

The intern starts observing the pressing of the gas and brake pedals in the cabin and translates this into the operation of our controller. This is his view of the world. A philosophical question from Sławek: Are we modeling the real world or a particular projection or perspective of the real world? Here, Sławek refers to the concept of a model from Domain-Driven Design (DDD). This means each of us has a certain view of the world. A better description is perspective or context. A given word can have different meanings in different fields of life.

This is simply naive modeling through the presentation layer.

# Simple Projects vs. Complex Projects

Kuba gives a good example. There are parts of projects where simple implementation through the user layer makes sense, but in the case of complex systems where for a particular method we need to perform several complex operations.

# Beginnings of a Young Programmer

In the beginning, everyone drops the hammer. Initially, we were more concerned with the syntax of the language than with the problem to be implemented. The start of a new person in the company is always difficult. Initially, getting acquainted with the system is burdened with cognitive overload.

# Discussion of the Current Design

In the `GearboxDriver` class, we have dependencies on the low-level `Gearbox` class, which manages the physical representation of the gearbox. `GearboxDriver` also depends on certain characteristics, which in other cases would be read in a different way, possibly by some other external service. At this current stage, the `GearboxDriver` class has already become a god class. A god class knows everything, can do everything, and knows everyone.

# Vocabulary Leakage

In the `GearboxDriver` class, there is vocabulary leakage from technical layers. The supplier's library model has leaked into our `GearboxDriver` class. What if the external `Gearbox` library supplier changes? Kuba asked an interesting question: Why should the `Gearbox` class supplied by some vendor be the subject of another class, in this case, `GearboxDriver`

# Dependency Implementation Method in `GearboxDriver`

It is better to inject dependencies through the constructor. This will make testing easier later on. If a class cannot exist without a given dependency, we explicitly define the dependency by injecting it into the constructor.