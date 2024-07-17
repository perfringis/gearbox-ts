# after

Kuba's proposal to apply better code readability as opposed to the coupling that has arisen. The current code has coupling between RPM and RpmRange. A better solution is definitely something like this:

Class `GearCalculator`.

```typescript
optimalRange.isExceeded(currentRpm)
```