import WalletTopUpClient from '../';
import assert from 'assert';

const testVoucher = 'wtuvef-e2c1b7e8-aa0b-44be-a9ca-df4bc322a8cf';

describe('WalletTopUp', () => {
    it('Can create Client', () => {
        try {
            new WalletTopUpClient();
        } catch (error) {
            assert.fail(error);
        }
    });

    const client = new WalletTopUpClient();
    it('Check Voucher', () => {
        const result = client.checkVoucher(testVoucher);

        assert.ok(result, 'Check result must be an object');
        assert.strictEqual(result.currency, 'VEF');
    });


    it('Try to Redeem voucher', async () => {

    });
});
