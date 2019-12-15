/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, InMemoryWallet, X509WalletMixin } = require('fabric-network');
const { decodeAES } = require('./../utils/decodeAES.js');

const path = require('path');
const ccpPath = path.resolve(__dirname, 'connection', 'connection-udn.json');

/*
    args: {
        user: string <useremail>
        encodedPriv: string
        kusuri: string
        cert: string
        channel: string <default: dut-channel>
        contract: string <default: bkeca>
        transactionArguments: []string (remember to destructuring inside submitTransaction function)
    }
*/
exports.invoke = async (args) => {
    try {

        // Create an in memory based wallet for temporary identity create from database
        const wallet = new InMemoryWallet();

        const cert = args.cert;
        const key = decodeAES(args.encodedPriv, args.kusuri);
        
        await wallet.import(args.user, X509WalletMixin.createIdentity('UdnMSP', cert, key));

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: args.user, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(args.channel);

        // Get the contract from the network.
        const contract = network.getContract(args.contract);

        const res = await contract.submitTransaction(...args.transactionArguments);
        console.log('Transaction has been submitted successfully');
        // console.log(JSON.parse(res.toString('utf8')));
        // Disconnect from the gateway.
        await gateway.disconnect();
        return res;
    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        throw error;
    }
}