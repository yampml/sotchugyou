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
exports.invoke = async (args) => {
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

        await contract.submitTransaction(...args.transactionArguments);
        console.log('Transaction has been submitted successfully');

        // Disconnect from the gateway.
        await gateway.disconnect();

        // return 

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
}