# Source

[Functional Decomposition](https://wiki.c2.com/?FunctionalDecomposition)

# Current Implementation

As can be observed, the design from episode 4-1-1 is still flawed. This is a so-called case of functional decomposition. It is characterized by the fact that every if and every switch is delegated to a new class. A distinctive feature of this code is that in the `GearboxDriver` class, the calculation of the new gear is delegated to each new calculator. What is wrong with this? Firstly, the implementation of these calculators does not differ from each other at all. Secondly, in this case, we are only dealing with changes in the values of the passed parameters. There is no properly prepared and differentiated logic for each driving mode here. The characteristics of the revolutions and how many gears a given machine has changed, and that's it.

# class diagram

![](./episode%204-1-1_diagram.png)
