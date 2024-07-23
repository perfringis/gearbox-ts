import { RPM } from "./RPM";

export class RpmRange {
  private start: RPM;
  private end: RPM;

  constructor(start: RPM, end: RPM) {
    if (start.compareTo(end) > 0) {
      throw new Error("Wrong range data, end is greater than start");
    }

    this.start = start;
    this.end = end;
  }

  static of(from: RPM, to: RPM): RpmRange {
    return new RpmRange(from, to);
  }

  startGreaterThan(rpm: RPM): boolean {
    return rpm.compareTo(this.start) < 0;
  }

  endSmallerThan(rpm: RPM): boolean {
    return rpm.compareTo(this.end) > 0;
  }

  leftHalf(): RpmRange {
    return new RpmRange(
      this.start,
      this.end.minus(this.start).divideBy(2).add(this.start)
    );
  }

  moveRight(ratio: number) {
    const addToStart: RPM = this.start.scale(ratio);
    const addToEnd: RPM = this.end.scale(ratio);

    return new RpmRange(this.start.add(addToStart), this.end.add(addToEnd));
  }

  toString(): string {
    return `RpmRange{start=${this.start}, end=${this.end}}`;
  }
}
