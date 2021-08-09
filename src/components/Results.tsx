import '../App.css';
import MarkupService from '../services/MarkupService';

export interface IResults {
  CurrencyPair: string;
  ClientBuyCurrency: string;
  ClientSellCurrency: string;
  Amount: number;
  Rate: number;
}

export const Results : React.FC<IResults> = (props) => {

  const markupService = new MarkupService(0.005, props.Amount, props.Rate, props.CurrencyPair, props.ClientBuyCurrency, props.ClientSellCurrency);

  return (
    <div className="Results">
      <div>Target currency: {props.ClientBuyCurrency}</div>
      <div>Base Rate: {props.Rate}</div>
      <div>Base Amount: {(markupService.BaseAmount()).toFixed(2) }</div> 
      <div>Paytron Rate: { (markupService.EffectiveRate()).toFixed(4) } </div>
      <div>Paytron Markup: { (markupService.PaytronMarkup()).toFixed(4) } </div>
      <div>Final Amount: { (markupService.FinalAmount()).toFixed(4) } </div>
    </div>

  );
} 