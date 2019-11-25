package main

// Run
// Terminal 1
// cd chaincode-docker-devmode
// docker-compose -f docker-compose-simple.yaml up

// Terminal 2
// docker exec -it chaincode bash
// cd bkeca
// go build
// CORE_PEER_ADDRESS=peer:7052 CORE_CHAINCODE_ID_NAME=bkecacc:0 ./bkeca

// Terminal 3
// docker exec -it cli bash
// peer chaincode install -p chaincodedev/chaincode/bkeca -n bkecacc -v 0
// peer chaincode instantiate -n bkecacc -v 0 -c '{"Args":[]}' -C myc

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	// "encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type QuestionResponse struct {
	QuestionID    string   `json:"question_id"`
	StudentChoice []string `json:"student_choice"`
}

type StudentTestInfo struct {
	StudentID        string             `json:"student_id"`
	Classroom        ClassroomInfo      `json:"classroom`
	StudentResponses []QuestionResponse `json:"student_responses"`
	Mark             string             `json:"mark"`
	Passed           bool               `json:"passed"`
	TakenAt          time.Time          `json:"taken_at"`
}

type ClassroomInfo struct {
	Name      string    `json:"classroom_name"`
	Content   string    `json:"classroom_content"`
	StartTime time.Time `json:"start_time"`
	EndTime   time.Time `json:"end_time"`
}

type StudentCertificate struct {
	StudentID          string            `json:"student_id"`
	Classroom          ClassroomInfo     `json:"classroom"`
	TestInfo           []StudentTestInfo `json:"test_info"`
	IssuedOrganization string            `json:"issued_organization"`
}

func (t *SmartContract) initStudentCertificate(stub shim.ChaincodeStubInterface) pb.Response {

	StudentCertificates := []StudentCertificate{
		StudentCertificate{
			StudentID: "USR0",
			Classroom: ClassroomInfo{
				Name:      "Sample Class 1",
				Content:   "This class is foobar and foobar so foobar.",
				StartTime: time.Now(),
				EndTime:   time.Now(),
			},
			TestInfo:           nil,
			IssuedOrganization: "nil",
		},
	}
	fmt.Println(StudentCertificates)
	return shim.Success(nil)
}

func (t *SmartContract) initStudentTestInfo(stub shim.ChaincodeStubInterface) pb.Response {
	StudentTestInfos := []StudentTestInfo{
		StudentTestInfo{
			StudentID: "USR0",
			Classroom: ClassroomInfo{
				Name:      "Sample Class 1",
				Content:   "This class is foobar and foobar so foobar.",
				StartTime: time.Now(),
				EndTime:   time.Now(),
			},
			StudentResponses: []QuestionResponse{
				QuestionResponse{QuestionID: "Ques001", StudentChoice: []string{"1", "2"}},
				QuestionResponse{QuestionID: "Ques002", StudentChoice: []string{"2", "3"}},
				QuestionResponse{QuestionID: "Ques003", StudentChoice: []string{"3"}},
				QuestionResponse{QuestionID: "Ques004", StudentChoice: []string{"4"}},
			},
			Mark:    "4/10",
			Passed:  true,
			TakenAt: time.Now(),
		},
		StudentTestInfo{
			StudentID: "USR1",
			Classroom: ClassroomInfo{
				Name:      "Sample Class 2",
				Content:   "This class is foobar and foobar so foobar 2.",
				StartTime: time.Now(),
				EndTime:   time.Now(),
			},
			StudentResponses: []QuestionResponse{
				QuestionResponse{QuestionID: "Ques0012", StudentChoice: []string{"1", "2"}},
				QuestionResponse{QuestionID: "Ques0022", StudentChoice: []string{"2", "3"}},
				QuestionResponse{QuestionID: "Ques0032", StudentChoice: []string{"3"}},
				QuestionResponse{QuestionID: "Ques0042", StudentChoice: []string{"4"}},
			},
			Mark:    "8/10",
			Passed:  false,
			TakenAt: time.Now(),
		},
	}
	fmt.Println(StudentTestInfos)
	return shim.Success(nil)
}

// Init callback representing the invocation of a chaincode
func (t *SmartContract) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

// Invoke Function accept blockchain code invocations.
func (t *SmartContract) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	// Retrieve the requested Smart Contract function and arguments
	function, args := stub.GetFunctionAndParameters()

	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "initUser" {
		return t.initUser(stub)
	} else if function == "queryUserInfo" {
		return t.queryUserInfo(stub, args)
	} else if function == "createUserInfo" {
		return t.createUserInfo(stub, args)
	} else if function == "updateUserInfo" {
		return t.updateUserInfo(stub, args)
	} else if function == "deleteUserInfo" {
		return t.deleteUserInfo(stub, args)
	} else if function == "queryUserByEmail" {
		return t.queryUserByEmail(stub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

// peer chaincode invoke -n bkecacc -c '{"Args":["initUser"]}' -C myc
func (t *SmartContract) initUser(stub shim.ChaincodeStubInterface) pb.Response {
	users := []User{
		User{Username: "Toyota", Email: "Prius@gmail.com", Password: "blue"},
		User{Username: "Ford", Email: "Mustang@gmail.com", Password: "red"},
	}

	i := 0
	indexName := "email~usrid"
	for i < len(users) {
		fmt.Println("i is ", i)
		usrAsBytes, _ := json.Marshal(users[i])
		stub.PutState("USR"+strconv.Itoa(i), usrAsBytes)

		// use composite key, find by email
		emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{users[i].Email, "USR" + strconv.Itoa(i)})
		if err != nil {
			return shim.Error(err.Error())
		}
		value := []byte{0x00}
		stub.PutState(emailUseridIndexKey, value)

		fmt.Println("Added", users[i])
		i = i + 1
	}
	return shim.Success(nil)
}

// peer chaincode query -n bkecacc -c '{"Args":["queryUserInfo","00001"]}' -C myc
func (t *SmartContract) queryUserInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	usrAsBytes, _ := stub.GetState("USR" + args[0])
	fmt.Println(usrAsBytes)
	return shim.Success(usrAsBytes)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["createUserInfo", "00001", "HieuChoDien", "foobar@mail.com","passwordfoo"]}' -C myc

func (t *SmartContract) createUserInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	var usr = User{Username: args[1], Email: args[2], Password: args[3]}

	usrAsBytes, _ := json.Marshal(usr)
	stub.PutState("USR"+args[0], usrAsBytes)

	indexName := "email~usrid"
	emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{args[2], "USR" + args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	stub.PutState(emailUseridIndexKey, value)

	return shim.Success(nil)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["updateUserInfo", "00001", "HieuFoobar", "updated@mail.com","passwordfoo"]}' -C myc
func (t *SmartContract) updateUserInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	usrAsBytes, _ := stub.GetState("USR" + args[0])
	usr := User{}
	json.Unmarshal(usrAsBytes, &usr)

	fmt.Println(args)

	usr.Username = args[1]
	usr.Email = args[2]
	usr.Password = args[3]

	usrAsBytes, _ = json.Marshal(usr)
	stub.PutState("USR"+args[0], usrAsBytes)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["deleteUserInfo", "00001"]}' -C myc
func (t *SmartContract) deleteUserInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	err := stub.DelState("USR" + args[0])
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to delete state with key: %s", args[0]))
	}

	indexName := "email~usrid"
	emailUseridIndexKey, err2 := stub.CreateCompositeKey(indexName, []string{args[2], "USR" + args[0]})
	if err2 != nil {
		return shim.Error(err2.Error())
	}
	stub.DelState(emailUseridIndexKey)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["queryUserByEmail", "Prius@gmail.com"]}' -C myc
func (t *SmartContract) queryUserByEmail(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	email := args[0]
	indexName := "email~usrid"

	resultsIterator, err := stub.GetStateByPartialCompositeKey(indexName, []string{email})
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")
	bArrayMemberAlreadyWritten := false

	var i int
	for i = 0; resultsIterator.HasNext(); i++ {
		responseRange, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		_, compositeKeyParts, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		returnedUserID := compositeKeyParts[1]

		usrAsBytes, _ := stub.GetState(returnedUserID)

		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(returnedUserID)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(usrAsBytes))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryUserByEmail:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())

}

var logger = shim.NewLogger("main")

func main() {
	logger.SetLevel(shim.LogInfo)

	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error starting bkeca chaincode: %s", err)
	}
}
