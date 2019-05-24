import Axios, { AxiosInstance } from 'axios';
import WalletTopUpClientInterface, {
    VoucherParseResult,
    VoucherRedeemResult,
    VoucherValidateResult,
    WalletTopUpCurrency, WalletTopUpVoucherStatus,
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


    public parse(voucherCode: string): VoucherParseResult {
        const [prefix, ...uuidSegments] = voucherCode.split('-');

        const regex = /wtu(\S{3})$/i;
        const match = prefix.match(regex);

        if (!match) {
            throw new Error('Invalid Voucher Prefix format');
        }

        const currency = match[1].toLocaleUpperCase();
        const uuidPart = uuidSegments.join('-');


        if (false === uuid.is(uuidPart)) {
            throw new Error('Invalid Voucher ID format');
        }

        return {
            currency: currency as WalletTopUpCurrency,
            uuid: uuidPart,
        };
    }


    public async redeem(voucherCode: string, destinationAddress: string): Promise<VoucherRedeemResult> {
        const check = this.parse(voucherCode);

        const { data } = await this.client.post('/vouchers/redeem', { voucherCode, destinationAddress });

        return {
            txid: data.transactionId,
            currency: check.currency,
            trackingUrls: data.trackingUrls,
        };
    }


    public async validate(voucherCode: string): Promise<VoucherValidateResult> {
        const check = this.parse(voucherCode);

        const { data } = await this.client.get('/vouchers/' + voucherCode);

        return {
            currency: check.currency,
            status: data.status,
            expiresAt: data.expiresAt,
        };
    }
}
