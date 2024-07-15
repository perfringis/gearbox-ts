# Getter i Setter jako samo zło

Okazuje sie że jest takie przeswiadczenie, ze Getter i Setter są wyznacznikami enkapsulacji. W praktyce jest odwrotnie. Getter i Setter łamie enkapsulacje oraz eksponuje wnętrze klasy na zewnątrz. W przypadku z kodu metoda `setGear` posiada jakąś logikę. W sumie jest to zła nazwa metody. Obecna nazwa nie daje jasnych przesłanek jej zachowania. `setGear` nic nie wnosi może lepiej powinna sie nazywac `changeGear`.

Tutaj przykład jak można dostać sie do bebechów klasy `Gearbox` w inny sposób.

```typescript
driver.getGearbox().setCurrentGear(2);
```

# Przykład no. 2

```typescript
class Offer {
active: boolean;

setActive(active: boolean) {
this.active = active;
}
}
```

Kuba podaje fajny przykład kiedy kod nie wyraża intencji oraz biznesu klienta.

Załóżmy, że mamy taki oto kodu jak wyżej. Taka implementacje oferty. Oto dwa przykłady gdy logika biznesowa nie jest wyrażona w kodzie:

1. Załóżmy, że wyłączamy ofertę kiedy ona przestaje być rentowna.
2. Kiedy po prostu w ofercie są jakieś błędy.

Ten kod gubi intencje.

Zalozmy, ze teraz dostajemy wymaganie odnoszace sie tylko do punktu drugiego. Nie wiemy jak podejść nawet do implementacji.

# ORM a getters and setters

Jest wiele podejść jak to zrobić dobrze w kontekście gdy ORM wymaga na encjach getterów i setterów.

# Programowanie obiektowe czy strukturalne?

Programowanie struktura danych jest okej, kiedy dana struktura jest dla mnie kontraktem. Kiedy klasa jest stabilna. W ogole sie nie zmienia.

Książka wujka boba mówi o tym, ze struktur używasz wtedy kiedy obiektu są stabilne, a obiektów w tedy gdy chcesz dokonać enkapsulacji. Ustawiasz atrybuty w klasie na prywatne.

Nasza implementacja bazuje na sygnałach!

------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Getter and Setter as Pure Evil

It turns out there's a belief that Getters and Setters are indicators of encapsulation. In practice, it's the opposite. Getters and Setters break encapsulation and expose the internals of a class to the outside. For example, in the code, the method `setGear` contains some logic. It's a bad method name. The current name doesn't provide clear indications of its behavior. `setGear` doesn't convey anything; perhaps it should be better named changeGear.

Here is an example of how one can access the internals of the `Gearbox` class in another way.

```typescript
driver.getGearbox().setCurrentGear(2);
```
# Example No. 2

```typescript
class Offer {
    active: boolean;

    setActive(active: boolean) {
    this.active = active;
    }
}
```

Kuba provides a good example of when code does not express the client's intent and business logic.

Let's assume we have the code as shown above. Such an implementation of an offer. Here are two examples where business logic is not expressed in the code:

1. Let's assume we disable the offer when it stops being profitable.
2. When there are simply some errors in the offer.

This code loses the intent.

Let's assume that now we get a requirement that relates only to the second point. We don't even know how to approach the implementation.

# ORM and Getters and Setters

There are many approaches on how to do this correctly in the context where ORM requires getters and setters on entities.

# Object-Oriented or Structural Programming?

Programming with data structures is okay when the data structure is a contract for me. When the class is stable. It doesn't change at all.

Uncle Bob's book talks about using structures when objects are stable, and objects when you want to achieve encapsulation. You set the attributes in a class to private.

Our implementation is based on signals!