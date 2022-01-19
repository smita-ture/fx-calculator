export const currencyOptions = () => {
    return ["AUD", "CAD", "CNY", "CZK", "DKK", "EUR", "GBP", "JPY", "NOK", "NZD", "USD"]
}
export const currencyPairs = () => {
    return {
        AUDUSD:0.8371, 
        CADUSD:0.8711,
        USDCNY:6.1715, 
        EURUSD:1.2315, 
        GBPUSD:1.5683, 
        NZDUSD:0.7750, 
        USDJPY:119.95, 
        EURCZK:27.6028, 
        EURDKK:7.4405, 
        EURNOK:8.6651 
    }
}

export const crossViaMatrix = () => {
    return {
        AUD : {
            AUD : '1:1',
            CAD : 'USD',
            CNY : 'USD',
            CZK : 'USD',
            DKK : 'USD',
            EUR : 'USD',
            GBP : 'USD',
            JPY : 'USD',
            NOK : 'USD',
            NZD : 'USD',
            USD : 'D'
        },
        CAD : {
            AUD : 'USD',
            CAD : '1:1',
            CNY : 'USD',
            CZK : 'USD',
            DKK : 'USD',
            EUR : 'USD',
            GBP : 'USD',
            JPY : 'USD',
            NOK : 'USD',
            NZD : 'USD',
            USD : 'D'
        },
        CNY : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : '1:1',
            CZK : 'USD',
            DKK : 'USD',
            EUR : 'USD',
            GBP : 'USD',
            JPY : 'USD',
            NOK : 'USD',
            NZD : 'USD',
            USD : 'D'
        },
        CZK : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : 'USD',
            CZK : '1:1',
            DKK : 'EUR',
            EUR : 'Inv',
            GBP : 'USD',
            JPY : 'USD',
            NOK : 'EUR',
            NZD : 'USD',
            USD : 'EUR'
        },
        DKK : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : 'USD',
            CZK : 'EUR',
            DKK : '1:1',
            EUR : 'Inv',
            GBP : 'USD',
            JPY : 'USD',
            NOK : 'EUR',
            NZD : 'USD',
            USD : 'EUR'
        },
        EUR : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : 'USD',
            CZK : 'D',
            DKK : 'D',
            EUR : '1:1',
            GBP : 'USD',
            JPY : 'USD',
            NOK : 'D',
            NZD : 'USD',
            USD : 'D'
        },
        GBP : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : 'USD',
            CZK : 'USD',
            DKK : 'USD',
            EUR : 'USD',
            GBP : '1:1',
            JPY : 'USD',
            NOK : 'USD',
            NZD : 'USD',
            USD : 'D'
        },
        JPY : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : 'USD',
            CZK : 'USD',
            DKK : 'USD',
            EUR : 'USD',
            GBP : 'USD',
            JPY : '1:1',
            NOK : 'USD',
            NZD : 'USD',
            USD : 'Inv'
        },
        NOK : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : 'USD',
            CZK : 'EUR',
            DKK : 'EUR',
            EUR : 'Inv',
            GBP : 'USD',
            JPY : 'USD',
            NOK : '1:1',
            NZD : 'USD',
            USD : 'EUR'
        },
        NZD : {
            AUD : 'USD',
            CAD : 'USD',
            CNY : 'USD',
            CZK : 'USD',
            DKK : 'USD',
            EUR : 'USD',
            GBP : 'USD',
            JPY : 'USD',
            NOK : 'USD',
            NZD : '1:1',
            USD : 'D'
        },
        USD : {
            AUD : 'Inv',
            CAD : 'Inv',
            CNY : 'Inv',
            CZK : 'EUR',
            DKK : 'EUR',
            EUR : 'Inv',
            GBP : 'Inv',
            JPY : 'D',
            NOK : 'EUR',
            NZD : 'Inv',
            USD : '1:1'
        },
    }
}

export const convertedCurrencyRate = (amount, matrix, fromCurrency, toCurrency) => {
    const crossViaMatrixData = crossViaMatrix()
    const currencyPairsData = currencyPairs()
    switch (matrix) {
        case 'D' :
            console.log('direct')
            return amount*currencyPairsData[`${fromCurrency}${toCurrency}`]
        case 'Inv' :
            return (1/currencyPairsData[`${toCurrency}${fromCurrency}`]) * amount
        case('1:1') : 
             return 1;         
        default :
          if(fromCurrency && toCurrency) {
            const fromccy = currencyPairsData[`${fromCurrency}${matrix}`] || convertedCurrencyRate(1, crossViaMatrixData[`${matrix}`][`${fromCurrency}`], matrix, fromCurrency)
            const toccy = currencyPairsData[`${matrix}${toCurrency}`] || convertedCurrencyRate(1, crossViaMatrixData[`${matrix}`][`${toCurrency}`], matrix, toCurrency)
            return (fromccy > toccy) ? ((1/fromccy) / toccy) * amount : (fromccy / (1/toccy)) * amount;    
          } else return 0; 
    }
}

export const convert = (fromAmount, toAmount, fromCurrency, toCurrency) => {
    const crossViaMatrixData = crossViaMatrix()
    const matrix = fromCurrency && toCurrency && crossViaMatrixData[`${fromCurrency}`][`${toCurrency}`]
    if(fromAmount > 0) {
        return convertedCurrencyRate(fromAmount, matrix, fromCurrency, toCurrency)
    } else {
        return convertedCurrencyRate(toAmount, matrix, toCurrency, fromCurrency)
    }
}