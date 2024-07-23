import { RpmRange } from "../../../engine/RpmRange";

export class AggressiveLevel {
  public static readonly FIRST: AggressiveLevel = new AggressiveLevel(0);
  public static readonly SECOND: AggressiveLevel = new AggressiveLevel(0.1);
  public static readonly THIRD: AggressiveLevel = new AggressiveLevel(0.3);

  private ratio: number;

  constructor(ratio: number) {
    this.ratio = ratio;
  }

  modify(range: RpmRange): RpmRange {
    return range.moveRight(this.ratio);
  }
}
