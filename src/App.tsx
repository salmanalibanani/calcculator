import './App.css';
import { CurrencyDropdown } from './components/CurrencyDropdown';
import { useFormik } from 'formik';
import { Button, FormLabel, TextField } from '@material-ui/core';
import * as Yup from 'yup'
import { Results } from './components/Results';
import axios from 'axios';

interface RateRequest {
  clientBuyCurrency: string;
  clientSellCurrency: string;
  currencyPair: string;
  amount: number;
  showResults: boolean;
  rate: number;
}
function App() {
  

  const validationSchema = Yup.object().shape({
    clientBuyCurrency: Yup.string().required('Buy currency is required.'),
    clientSellCurrency: Yup.string().required('Sell currency is required.'),
    amount: Yup.number().min(1, "Minimum amount is 1.").required('Amount is required.'),
  });

  const formik = useFormik<RateRequest>({
    initialValues: {
      clientBuyCurrency: '', 
      clientSellCurrency: '',
      currencyPair: '',
      amount: 0,
      showResults: false,
      rate: 0,
    },
    validationSchema: validationSchema, 

    onSubmit: async (values) => {
      try {
        var r = await axios.get(`https://wnvgqqihv6.execute-api.ap-southeast-2.amazonaws.com/Public/public/rates?Buy=${formik.values.clientBuyCurrency}&Sell=${formik.values.clientSellCurrency}&Amount=${formik.values.amount}&Fixed=sell`);
        if (r.data.clientRate) {
          formik.values.showResults = true;
          formik.values.rate = r.data.midMarketRate;
          formik.values.currencyPair = r.data.currencyPair;
        }
        else {
          console.log('Handle exception here.');
        }
      }
      catch (e)
      {
        console.log("There was some error");
        console.log(e);
      }
    }
  });

  return (
    <div className="App">
    <form onSubmit={formik.handleSubmit}>
        <div>
        <TextField 
          id="amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          style={{ width: 300 }}
          label="Amount"
        /> 
        <br />
        <div className="ErrorMessage">
        { formik.touched.amount && formik.errors.amount }
        </div>
        </div>
        <div>
        <CurrencyDropdown 
          id="clientSellCurrency"
          name="clientSellCurrency"
          value={formik.values.clientSellCurrency}
          onChange={formik.handleChange}
          error={formik.touched.clientSellCurrency && Boolean(formik.errors.clientSellCurrency)}
          style={{ width: 300 }}
          label="Sell"
        />
        <br />
        <div className="ErrorMessage">
        { formik.touched.clientSellCurrency && formik.errors.clientSellCurrency }
        </div>
        </div>
        <div>
        <CurrencyDropdown
          id="clientBuyCurrency"
          name="clientBuyCurrency"
          value={formik.values.clientBuyCurrency}
          onChange={formik.handleChange}
          error={formik.touched.clientBuyCurrency && Boolean(formik.errors.clientBuyCurrency)}
          style={{ width: 300 }}
          label="Buy"
        />
        <br />
        <div className="ErrorMessage">
        { formik.touched.clientBuyCurrency && formik.errors.clientBuyCurrency }
        </div>
        </div>
      <div>
        <br />
        <Button type="submit" variant="contained">
          Convert
        </Button>
      </div>

      { formik.values.showResults && <Results ClientBuyCurrency={formik.values.clientBuyCurrency} ClientSellCurrency={formik.values.clientSellCurrency} CurrencyPair={formik.values.currencyPair} Amount={formik.values.amount} Rate={formik.values.rate} />   }

    </form>
    </div>
  );
}

export default App;
