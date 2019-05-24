export type WalletTopUpCurrency
    = 'BTC'
    | 'BCH';

export type WalletTopUpVoucherStatus
    = 'redeemed'
    | 'expired'
    | 'valid';

export type VoucherParseResult = {
    currency: WalletTopUpCurrency;
    uuid: string;
};

export type VoucherRedeemResult = {
    txid: string;
    amount?: number;
    currency: WalletTopUpCurrency;
    trackingUrls: string[];

    [key: string]: any;
};

export type VoucherValidateResult = {
    amount?: number;
    currency: WalletTopUpCurrency;
    status: WalletTopUpVoucherStatus;
    expiresAt: number;

    [key: string]: any;
};

declare class WalletTopUpClient {
    public constructor(url?: string);

    /**
     * Method to parse voucher and validate the structure
     *
     * @param voucherCode
     */
    public parse(voucherCode: string): VoucherParseResult;

    public validate(voucherCode: string): Promise<VoucherValidateResult>;

    public redeem(voucherCode: string, destinationAddress: string): Promise<VoucherRedeemResult>;
}

export default WalletTopUpClient;
