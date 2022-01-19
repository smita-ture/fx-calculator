import { useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import { currencyOptions, convert } from './utils/currenyData'

function App() {
  const [formCurrency, setFormCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(0)
  const [isFromAmount, setIsFromAmount] = useState(true)

  let toAmount = 0, fromAmount = 0
  if(isFromAmount) {
    fromAmount = (Math.round(amount * 100) / 100).toFixed(2)
    const toAmt = convert(amount, 0, formCurrency,  toCurrency)
    toAmount = (Math.round(toAmt * 100) / 100).toFixed(2)
  } else {
    toAmount =  (Math.round(amount * 100) / 100).toFixed(2)
    const fromAmt = convert(0, amount, formCurrency,  toCurrency)
    fromAmount = (Math.round(fromAmt * 100) / 100).toFixed(2)
  }
  
  return (
    <>
      <h1>FX Calculator</h1>
      <CurrencyRow 
        currencyOptions={currencyOptions()}
        selectedCurrency={formCurrency}
        onChangeCurrency={e => setFormCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={e => {
          setAmount(e.target.value)
          setIsFromAmount(true)
          }}/>
      <div className='equals'>=</div>
      <CurrencyRow 
        currencyOptions={currencyOptions()} 
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={e => {
          setAmount(e.target.value)
          setIsFromAmount(false)
          }}/>
    </>
  );
}

export default App;
