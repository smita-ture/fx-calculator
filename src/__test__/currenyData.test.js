import { convert } from '../utils/currenyData' 


describe('test curreny convertor util', () => {
    test('test direct feed', () => {
       const amount = convert(1, 0 , 'AUD', 'USD')
       expect(amount).toBe(0.8371)
    })

    test('test inverted feed', () => {
        const amount = convert(1, 0 , 'CZK', 'EUR')
        expect(amount).toBe(0.036228208732447434)
    })

    test('test 1:1 feed', () => {
        const amount = convert(1, 0 , 'AUD', 'AUD')
        expect(amount).toBe(1)
    })

    test('test cross via the currency feed', () => {
        const amount = convert(1, 0 , 'AUD', 'JPY')
        expect(amount).toBe(100.41014499999999)
    })
})