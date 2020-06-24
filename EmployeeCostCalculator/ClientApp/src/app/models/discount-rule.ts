export class DiscountRule{
  //TODO: better use Person or even employee to apply possible future complex rule
  constructor(
    private readonly rule : (name: string) => boolean,
    private readonly discount: number) {
  }

  public applyDiscount(name : string, cost:number) : number {
    if(!cost) return cost;
    if(this.rule(name)) {
      return cost * (1 - this.discount);
    } else {
      return cost;
    }
  }
}
