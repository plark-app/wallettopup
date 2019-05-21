export type WalletTopUpCurrency
    = 'BTC'
    | 'BCH';

export type VoucherCheckResult = {
    currency: WalletTopUpCurrency;
};

export type VoucherRedeemResult = {
    txid: string;
    amount?: number;
    currency: WalletTopUpCurrency;
    trackingUrls: string[];

    [key: string]: any;
};

export type VoucherValidateResult = {
    amount: number;
    currency: WalletTopUpCurrency;

    [key: string]: any;
};

declare class WalletTopUpClient {
    public constructor(url?: string);

    public checkVoucher(voucherCode: string): VoucherCheckResult;

    public validate(voucherCode: string): Promise<VoucherValidateResult>;

    public redeem(voucherCode: string, destinationAddress: string): Promise<VoucherRedeemResult>;
}

export default WalletTopUpClient;
