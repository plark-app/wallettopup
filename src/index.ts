import Axios, { AxiosInstance } from 'axios';
import WalletTopUpClientInterface, {
    VoucherCheckResult,
    VoucherRedeemResult,
    VoucherValidateResult,
    WalletTopUpCurrency,
} from '../index';

const uuid = require('uuidv4');

const API_URL = 'https://redemption.wallettopup.co.uk/api';

export default class WalletTopUpClient implements WalletTopUpClientInterface {
    protected readonly client: AxiosInstance;

    public constructor(url: string = API_URL) {
        this.client = Axios.create({
            baseURL: API_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }


    public checkVoucher(voucherCode: string): VoucherCheckResult {
        const [prefix, ...uuidSegments] = voucherCode.split('-');

        const regex = /wtu(\S{3})$/i;
        const match = prefix.match(regex);

        if (!match) {
            throw new Error('Invalid Voucher Prefix format');
        }

        const currency = match[1].toLocaleUpperCase();

        if (false === uuid.is(uuidSegments.join('-'))) {
            throw new Error('Invalid Voucher ID format');
        }

        return {
            currency: currency as WalletTopUpCurrency,
        };
    }


    public async redeem(voucherCode: string, destinationAddress: string): Promise<VoucherRedeemResult> {
        const check = this.checkVoucher(voucherCode);

        const { data } = await this.client.post('/vouchers/redeem', { voucherCode, destinationAddress });

        return {
            txid: data.transactionId,
            currency: check.currency,
            trackingUrls: data.trackingUrls,
        };
    }


    public async validate(voucherCode: string): Promise<VoucherValidateResult> {
        return undefined;
    }
}
