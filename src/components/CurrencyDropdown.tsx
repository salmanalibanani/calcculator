import { useEffect, useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@material-ui/core';

export interface Currency {
  currencyCode: string;
  currencyName: string;
}

export const CurrencyDropdown : React.FC<TextFieldProps> = (props) => {

  const currencies:Currency[] = [
    {
      'currencyCode': 'AUD',
      'currencyName': 'Australian Dollar'
    },
    {
      'currencyCode': 'USD',
      'currencyName': 'US Dollar'
    },
    {
      'currencyCode': 'GBP',
      'currencyName': 'Pound sterling'
    },
  ] ;

  return (
      <TextField select value={currencies.length > 0 ? currencies[0].currencyCode : ''} {...props}>
        {currencies.map((c: Currency) => (
          <MenuItem key={c.currencyCode} value={c.currencyCode}>
            {c.currencyName} ({c.currencyCode})
          </MenuItem>
        ))}
      </TextField>
  );
};