# Attitude Change, Enthusiasm, Bitterness

Change in Attitude: The intern is already making snide remarks. First symptoms of frustration.

# Scrum

Scrum: The intern already wants to interrupt the sprint. Unfortunately, this is typical behavior of people who have read their first book on Scrum.

# From a Technical Perspective

From a Technical Perspective: The code could be created in an isolated location. This way, changing weak code in this isolated location would be very quick.

# Optional Type in Java

Optional Type in Java Code like this:

```java
Optional<Integer> lightsPosition = Optional.ofNullable(externalSystems.getLights().getLightsPosition());

if (lightsPosition.isPresent()) {
// logic here
}
```

The contract for such behavior is simply to return a value and check if the returned value is not null. It is no different from the code currently implemented by the intern. He also checks if `externalSystems.getLights().getLightsPosition()` is not null.

# Violation of the Law of Demeter

Violation of the Law of Demeter: As can be seen, `externalSystems` is an external API provided by an outside company. One of the characteristic features of this API is the violation of the Law of Demeter. With each subsequent GET-type function, we delve deeper into the internal mechanisms of this API. More information here [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter).

# Facade Design Pattern

Facade Design Pattern: The best solution to the problem of violating the Law of Demeter is to isolate the bad code using a Facade.

# Time as a Factor in Bad Code

Time as a Factor in Bad Code: One of the main causes of bad code is time. And what do we ask the programmer if we give you an infinite amount of time, how would you do it better? What things do you take into account? What aspects do you consider whether they are architectural or technical to make different decisions?