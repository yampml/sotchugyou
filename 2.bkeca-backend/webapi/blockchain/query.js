/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, 'connection', 'connection-udn.json');
/*
    args: {
        user: string <useremail>
        channel: string <default: dut-channel>
        contract: string <default: bkeca>
        transactionArguments: []string (remember to destructuring inside submitTransaction function)
    }
*/
exports.query = async (args) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'blockchain/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(args.user);
        if (!userExists) {
            console.log(`An identity for the user ${args.user} does not exist in the wallet`);
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: args.user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(args.channel);

        // Get the contract from the network.
        const contract = network.getContract(args.contract);

        const result = await contract.evaluateTransaction( ...args.transactionArguments );

        await gateway.disconnect();

        return {
            message: `Transaction has been evaluated, result is: ${result.toString()}`,
            responseData: result.toString();
        }
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        throw error;
    }
}
