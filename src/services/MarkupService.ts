export default class MarkupService {
  Markup: number;
  Amount: number;
  Rate: number;

  constructor(markup: number, amount: number, rate: number, currencyPair: string, clientBuyCurrency: string, clientSellCurrency: string) {
    this.Markup = markup;
    this.Amount = amount;

    if (currencyPair.startsWith(clientSellCurrency))
      this.Rate = rate;
    else
      this.Rate = (1 / rate);
  }

  EffectiveRate() : number {
    return this.Rate * (1 - this.Markup);
  }

  PaytronMarkup() : number {
    return this.BaseAmount() - this.FinalAmount();
  }

  FinalAmount() : number {
    return this.Amount * this.EffectiveRate();
  }

  BaseAmount() : number {
    return this.Amount * this.Rate;
  }
}