import React from 'react'

export default function CurrencyRow(props) {
    const { currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount} = props
    return (
        <div>
           <input role='input' type='number' className='input' value={amount} onChange={onChangeAmount}/>
           <select role='select' value={selectedCurrency} onChange={onChangeCurrency}>
               {currencyOptions.map((option, index) => (
                   <option key={index} value={option}>{option}</option>
               ))}
           </select>
        </div>
    )
}
