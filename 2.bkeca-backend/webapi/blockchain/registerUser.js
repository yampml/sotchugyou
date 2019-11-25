/*

 https://stackoverflow.com/questions/50677021/what-is-diffrence-between-enrolling-and-registering-a-certificate-in-hyperledger
 */

'use strict';

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, 'connection', 'connection-udn.json');
// args { userEmail: <>, hashedPw: <>}
exports.registerUser = async (args) => {
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'blockchain/wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(args.userEmail);
        if (userExists) {
            console.log('An identity for the user ' + args.userEmail + ' already exists in the wallet');
            throw 'An identity for the user ' + args.userEmail + ' already exists in the wallet';
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            throw 'An identity for the admin user "admin" does not exist in the wallet';
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'alpha', enrollmentID: args.userEmail, role: 'clientMaster', attrs: [
            { name: 'isTeacher', value: 'true', ecert: true},
            { name: 'email', value: args.userEmail, ecert: true},
        ], enrollmentSecret: args.hashedPw }, adminIdentity);
        // https://fabric-sdk-node.github.io/release-1.4/global.html#RegisterRequest
        const enrollment = await ca.enroll({ enrollmentID: args.userEmail, enrollmentSecret: secret });
        console.log("enrollment: ", enrollment);

        const userIdentity = X509WalletMixin.createIdentity('UdnMSP', enrollment.certificate, enrollment.key.toBytes());
        console.log('user identity: ', userIdentity)

        await wallet.import(args.userEmail, userIdentity);

        let msg = 'Successfully registered and enrolled admin user ' + args.userEmail + ' and imported it into the wallet';
        console.log(msg);
        return { 
            msg,
            userIdentity,
            email: args.userEmail,
            password: args.hashedPw
        }
    } catch (error) {
        console.error(`Failed to register user ${args.userEmail}: ${error}`);
    }
}