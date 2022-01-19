import React from 'react';
import {cleanup, render} from '@testing-library/react';
import CurrencyRow from '../CurrencyRow';

afterEach(cleanup);

it('CurrencyRow redners text box and select', () => {
  const {getByRole} = render(
    <CurrencyRow 
        currencyOptions={['AUD','USD']} 
        selectedCurrency="AUD" 
        onChangeCurrency={jest.fn()} 
        amount='1' 
        onChangeAmount={jest.fn()} />,
  );

  const input = getByRole('input')
  expect(input).toBeTruthy()
  const select = getByRole('select')
  expect(select).toBeTruthy()
});