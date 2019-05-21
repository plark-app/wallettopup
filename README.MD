# WalletTopUp API Client

[![npm version](https://badge.fury.io/js/%40plark%2Fwallettopup.svg)](https://badge.fury.io/js/%40plark%2Fwallettopup)

### Install

```bash
npm i @plark/wallettopup
# or
yarn add @plark/wallettopup
```


### Example

**Redeem voucher**

```javascript
import WalletTopUp from '@plark/wallettopup';

const voucher = 'wtubch-7f86204d-c1f6-445d-ba58-b57529090f35';
const myBitcoinAddress = 'my-bitcoin-address!';

function async doSomethingUsefull() {
    const client = new WalletTopUp();
    
    const result = await client.redeem(voucher, myBitcoinAddress);
    
    console.log(result.txid); // Bitcoin TXID: 0ccf60c2f7ba0fba2adec158ba534d69f035974853ae217c9a176907b2b1efb2
}
```

---

Make with ❤ by [Plark](https://plark.io) & [WalletTopUp](https://wallettopup.co.uk) teams
