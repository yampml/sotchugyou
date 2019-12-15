
# 1. Generate certs
../bin/cryptogen generate --config=./crypto-config.yaml

# 2. Generate genesis blocks for orderer (SOLO|will add raft later!@)
export FABRIC_CFG_PATH=$PWD
export SYS_CHANNEL=bkeca-sys-channel
../bin/configtxgen -profile TwoOrgsOrdererGenesis -channelID $SYS_CHANNEL -outputBlock ./channel-artifacts/genesis.block

# 3. Create channel configuration transaction
export CHANNEL_NAME=dut-channel
../bin/configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID $CHANNEL_NAME

# 4. Create anchor peer definition transaction for 2 Orgs (Udn & Dut)
../bin/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/UdnMSPanchors.tx -channelID $CHANNEL_NAME -asOrg UdnMSP

../bin/configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/DutMSPanchors.tx -channelID $CHANNEL_NAME -asOrg DutMSP

# 5. Start network 
docker-compose -f docker-compose-cli.yaml -f docker-compose-ca.yaml up -d

# 6. Create channel dut-channel #(cli) ----- this return a dut-channel.block file inside container
# envs for peer0.udn
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/udn.bkeca.com/users/Admin@udn.bkeca.com/msp
CORE_PEER_ADDRESS=peer0.udn.bkeca.com:7051
CORE_PEER_LOCALMSPID="UdnMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/udn.bkeca.com/peers/peer0.udn.bkeca.com/tls/ca.crt

# envs for peer1.udn
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/udn.bkeca.com/users/Admin@udn.bkeca.com/msp
CORE_PEER_ADDRESS=peer1.udn.bkeca.com:8051
CORE_PEER_LOCALMSPID="UdnMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/udn.bkeca.com/peers/peer1.udn.bkeca.com/tls/ca.crt


docker exec -it cli bash
export CHANNEL_NAME=dut-channel
peer channel create -o orderer.bkeca.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem

# 7. Join peer0.udn.bkeca.com to channel
# Args: 
#       -b: blockpath
peer channel join -b dut-channel.block

# 8. Join peer0.dut.bkeca.com (feel free to join others 2 peer1.udn & peer1.dut by change env!)
# envs for peer0.dut
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/dut.bkeca.com/users/Admin@dut.bkeca.com/msp
CORE_PEER_ADDRESS=peer0.dut.bkeca.com:9051
CORE_PEER_LOCALMSPID="DutMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/dut.bkeca.com/peers/peer0.dut.bkeca.com/tls/ca.crt 
# envs for peer1.dut
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/dut.bkeca.com/users/Admin@dut.bkeca.com/msp
CORE_PEER_ADDRESS=peer1.dut.bkeca.com:10051
CORE_PEER_LOCALMSPID="DutMSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/dut.bkeca.com/peers/peer1.dut.bkeca.com/tls/ca.crt 

peer channel join -b dut-channel.block

# 9. Update the anchor peers
# !!Change env to peer0.udn first (code at #6)
peer channel update -o orderer.bkeca.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/UdnMSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem

# !!Change env to peer0.dut (code at #8)
peer channel update -o orderer.bkeca.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/DutMSPanchors.tx --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem

# 10. Install and define chaincode (on peer0.udn & peer0.dut)
# 10.1 Install
# this installs the Node.js chaincode
# make note of the -l flag to indicate "node" chaincode
# for node chaincode -p takes the absolute path to the node.js chaincode

# !!Change envs (at #6 & #8), do installation 4 times!!
peer chaincode install -n mycc -v 1.0 -l node -p /opt/gopath/src/github.com/chaincode/chaincode_example02/node/

# BKECA~~~~~~~~~~~~~~~~~~~~~~
peer chaincode install -n bkeca -v 1.0 -p github.com/chaincode/bkeca/

#check list installed chaincode
peer chaincode list --installed

# 10.2 Instantiate
# be sure to replace the $CHANNEL_NAME environment variable if you have not exported it
# if you did not install your chaincode with a name of mycc, then modify that argument as well
# notice that we must pass the -l flag after the chaincode name to identify the language

# In the command below you’ll notice that we specify our policy as -P "AND ('UdnMSP.peer','DutMSP.peer')". This means that we need “endorsement” from a peer belonging to Udn AND Dut (i.e. two endorsement).
# The instantiation of the Node.js chaincode will take roughly a minute. The command is not hanging; rather it is installing the fabric-shim layer as the image is being compiled.
peer chaincode instantiate -o orderer.bkeca.com:7050 \
--tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem \
-C $CHANNEL_NAME \
-n mycc \
-l node \
-v 1.0 \
-c '{"Args":["init","a", "100", "b","200"]}' \
-P "AND ('UdnMSP.peer','DutMSP.peer')"

# BKECA~~~~~~~~~~~~~~~~~~~~~~
peer chaincode instantiate -o orderer.bkeca.com:7050 \
--tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem \
-C $CHANNEL_NAME \
-n bkeca \
-v 1.0 \
-c '{"Args":[]}' \
-P "AND ('UdnMSP.peer','DutMSP.peer')"

# 10.3 Try Query & Invoke
# Can change env to any joined peer to run

peer chaincode query -C $CHANNEL_NAME -n bkeca -c '{"Args":["queryStudentTestInfoByEmail", "nguyendinhan97@gmail.com"]}'

# Invoke
peer chaincode invoke -o orderer.bkeca.com:7050 \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem \
-C $CHANNEL_NAME \
-n mycc \
--peerAddresses peer0.udn.bkeca.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/udn.bkeca.com/peers/peer0.udn.bkeca.com/tls/ca.crt \
--peerAddresses peer0.dut.bkeca.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/dut.bkeca.com/peers/peer0.dut.bkeca.com/tls/ca.crt \
-c '{"Args":["invoke","a","b","10"]}'

# try invoke bkeca
peer chaincode invoke -o orderer.bkeca.com:7050 \
--tls true \
--cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem \
-C $CHANNEL_NAME \
-n bkeca \
--peerAddresses peer0.udn.bkeca.com:7051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/udn.bkeca.com/peers/peer0.udn.bkeca.com/tls/ca.crt \
--peerAddresses peer0.dut.bkeca.com:9051 \
--tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/dut.bkeca.com/peers/peer0.dut.bkeca.com/tls/ca.crt \
-c '{"Args":["initStudent"]}'

# try upgrade chaincode
# first install new chaincode (on both 2 ORGs by change env!!!)
peer chaincode install -n bkeca -v 2.0 -p github.com/chaincode/bkeca/

# then upgrade!
peer chaincode upgrade -o orderer.bkeca.com:7050 \
--tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/bkeca.com/orderers/orderer.bkeca.com/msp/tlscacerts/tlsca.bkeca.com-cert.pem \
-C $CHANNEL_NAME \
-n bkeca \
-v 2.0 \
-c '{"Args":[]}' \
-P "AND ('UdnMSP.peer','DutMSP.peer')"


###
{"Args":["queryUserByEmail", "Prius@gmail.com"]}
'{"Args":["createUserInfo", "00001", "HieuChoDien", "foobar@mail.com","passwordfoo"]}'
#===============================EXPLORER
cd blockchain-explorer
yarn install --ignore-engines


cd blockchain-explorer
cd client
yarn install

yarn run build


cd blockchain-explorer
./start -> view log