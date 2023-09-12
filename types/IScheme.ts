export interface IScheme {
  base: number;
  w1s1: number;
  w1s2: number;
  w1s3: number;
  w2s1: number;
  w2s2: number;
  w2s3: number;
  w3s1: number;
  w3s2: number;
  w3s3: number;
  w4s1: number;
  w4s2: number;
  w4s3: number;
}
export class Scheme implements IScheme {
  CalculateBase = (oneRm: number): number =>
    Math.round(oneRm * this.base * 10) / 10;
  Calculate = (oneRm: number, weekSet: number, lift: string): number => {
    const baseResult = this.CalculateBase(oneRm);
    if (lift === "sq" || lift === "dl") {
      return Math.round((baseResult * weekSet) / 2.5) * 2.5;
    } else {
      return Math.round(baseResult * weekSet);
    }
  };
  base = 0.9;
  w1s1 = 0.65;
  w1s2 = 0.75;
  w1s3 = 0.85;
  w2s1 = 0.7;
  w2s2 = 0.8;
  w2s3 = 0.9;
  w3s1 = 0.75;
  w3s2 = 0.85;
  w3s3 = 0.95;
  w4s1 = 0.4;
  w4s2 = 0.5;
  w4s3 = 0.6;
}
