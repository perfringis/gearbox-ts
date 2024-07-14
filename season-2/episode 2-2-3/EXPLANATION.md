# If It Were an 8k Line Script

In such a case, cognitive overload occurs. We have a certain decision tree, which means a very large number of nested if statements. The code still looks procedural. Sławek mentioned that in the next parts, he will teach me when the procedural paradigm is appropriate.

# Human Working Memory

Sławek mentions that a long time ago, studies were conducted on human working memory, specifically how many "handles" a person can have in their memory in the context of intellectual work. It turns out that we have about four such handles, and we can remember one thing very well.

# Attempt to Understand the Code

At this level of complexity, my understanding becomes blurry. I need to keep track of several factors and the context in which I am entering a given piece of code. Additionally, the technical layer "leaks" into the GearboxDriver class.

# Kuba's Proposal

A better idea would be to create smaller sub-procedures that would encapsulate the logic of gear shifting in a given mode.

# Gold Quote from Kuba

You don't look for abstractions. You notice abstractions.

# Extracting Code into a Utility

Sławek gives the example of a `Utils` class, which started innocently. After some time, it grew to uncontrollable sizes, containing common code that was "extracted into a utility." A characteristic feature of such a `Utils` class is a very large number of `boolean` variables.

Another example is a base class that "extracts" common code or common functionality, which is against the [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle). Inheritance is not meant for extracting common logic.

What does the object-oriented paradigm say? Inheritance is a technique that is supposed to support polymorphism. What is polymorphism? It is variable behaviors.

# Several Similar Screens

Sławek talks about another example where there were 3 views. These were very similar views. One view had a button, the other didn't. If the business designed 3 similar views, it means that in the future, 3 different business processes will be handled.

# The Don't Repeat Yourself Principle - DRY

The DRY principle is not about code duplication but about the duplication of behaviors/business logic.

# When Does Duplication Hurt Us?

When we change that code. We change it often and might forget about the places where we should change the code.

# When Does Code Duplication Make Sense?

Assume we have certain business logic for calculating land tax. Suddenly, this tax calculation changes. It is better to keep the old code, copy the old code, and create a new method to start modifying it. Interestingly, you cannot change the old code and add a few lines, even if the old code calculates incorrectly. It turns out that there are other processes correcting the final tax value. The new code is a copy but does not interfere with the operation of the old code, which is legally protected.