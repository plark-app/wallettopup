import WalletTopUpClient from '../';
import assert from 'assert';

const validVoucher = 'wtubtc-dcb6a8a1-b9c0-4f43-81b4-f26274db772f';
const invalidVoucher = 'wtubtc-dcb6a8a1-b9c0-4f43-81b4-f26274db772e';


describe('WalletTopUp', () => {
    it('Can create Client', () => {
        try {
            new WalletTopUpClient();
        } catch (error) {
            assert.fail(error);
        }
    });

    const client = new WalletTopUpClient();
    it('Parse Voucher', () => {
        const result = client.parse(validVoucher);

        assert.ok(result, 'Check result must be an object');
        assert.strictEqual(result.currency, 'BTC');
        assert.strictEqual(result.uuid, 'dcb6a8a1-b9c0-4f43-81b4-f26274db772f');
    });


    it('Try to Validate voucher', async () => {
        const result = await client.validate(validVoucher);

        assert.ok(result, 'Validation result must be an object');
        assert.strictEqual(result.currency, 'BTC');
        assert.strictEqual(result.status, 'redeemed');
        assert.strictEqual(result.expiresAt, '1621199701660');
    });


    it('Try to Redeem voucher', async () => {

    });
});
