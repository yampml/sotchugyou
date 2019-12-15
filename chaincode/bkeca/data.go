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
// docker exec -it cli_dev bash
// peer chaincode install -p chaincodedev/chaincode/bkeca -n bkecacc -v 0
// peer chaincode instantiate -n bkecacc -v 0 -c '{"Args":[]}' -C myc

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	// "encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type StudentInfo struct {
	StudentID string `json:"student_id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Dob       string `json:"dob"`
}

type ClassroomInfo struct {
	ClassroomID string `json:"classroom_id"`
	Name        string `json:"name"`
}

type QuestionInfo struct {
	QuestionID  string   `json:"question_id"`
	Description string   `json:"description"`
	RightChoice string   `json:"right_choice"`
	Choices     []string `json:"choices"`
}

type QuestionResponseInfo struct {
	Question       QuestionInfo `json:"question"`
	StudentChoices []string     `json:"student_choices"`
}

type StudentTestInfo struct {
	Student           StudentInfo            `json:"student"`
	Classroom         ClassroomInfo          `json:"classroom"`
	QuestionResponses []QuestionResponseInfo `json:"question_responses"`
	Mark              string                 `json:"mark"`
	Passed            bool                   `json:"passed"`
	StartedAt         time.Time              `json:"started_at"`
	FinishedAt        time.Time              `json:"finished_at"`
}

type StudentCertificate struct {
	Student     StudentInfo   `json:"student"`
	Classroom   ClassroomInfo `json:"classroom"`
	Description string        `json:"description"`
	IssuedBy    string        `json:"issued_by"`
}

// Init callback representing the invocation of a chaincode
func (t *SmartContract) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

// Invoke Function accept blockchain code invocations.
func (t *SmartContract) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	// Retrieve the requested Smart Contract function and arguments
	function, args := stub.GetFunctionAndParameters()
	fmt.Println(function)
	fmt.Println(args)
	// Route to the appropriate handler function to interact with the ledger appropriately
	if function == "initStudent" {
		return t.initStudent(stub)
	} else if function == "queryStudentInfo" {
		return t.queryStudentInfo(stub, args)
	} else if function == "createStudentInfo" {
		return t.createStudentInfo(stub, args)
	} else if function == "updateStudentInfo" {
		return t.updateStudentInfo(stub, args)
	} else if function == "deleteStudentInfo" {
		return t.deleteStudentInfo(stub, args)
	} else if function == "queryStudentByEmail" {
		return t.queryStudentByEmail(stub, args)
	} else if function == "initStudentTestInfos" {
		return t.initStudentTestInfos(stub)
	} else if function == "queryStudentTestInfo" {
		return t.queryStudentTestInfo(stub, args)
	} else if function == "queryStudentTestInfoByEmail" {
		return t.queryStudentTestInfoByEmail(stub, args)
	} else if function == "queryStudentTestInfoByClassroomID" {
		return t.queryStudentTestInfoByClassroomID(stub, args)
	} else if function == "createStudentTestInfo" {
		return t.createStudentTestInfo(stub, args)
	} else if function == "deleteStudentTestInfo" {
		return t.deleteStudentTestInfo(stub, args)
	} else if function == "initClassroom" {
		return t.initClassroom(stub)
	} else if function == "queryClassroomInfo" {
		return t.queryClassroomInfo(stub, args)
	} else if function == "createClassroomInfo" {
		return t.createClassroomInfo(stub, args)
	} else if function == "updateClassroomInfo" {
		return t.updateClassroomInfo(stub, args)
	} else if function == "deleteClassroomInfo" {
		return t.deleteStudentInfo(stub, args)
	} else if function == "initQuestionInfo" {
		return t.initQuestionInfo(stub)
	} else if function == "queryQuestionInfo" {
		return t.queryQuestionInfo(stub, args)
	} else if function == "createQuestionInfo" {
		return t.createQuestionInfo(stub, args)
		// } else if function == "updateClassroomInfo" {
		// 	return t.updateClassroomInfo(stub, args)
	} else if function == "deleteQuestionInfo" {
		return t.deleteQuestionInfo(stub, args)
	}

	return shim.Error("Invalid Smart Contract function name.")
}

func (t *SmartContract) initStudentCertificate(stub shim.ChaincodeStubInterface) pb.Response {
	StudentCertificates := []StudentCertificate{
		StudentCertificate{
			Student: StudentInfo{
				StudentID: "1",
				Username:  "Nguyen Dinh An",
				Email:     "nguyendinhan97@gmail.com",
				Dob:       "08/07/1997",
			},
			Classroom: ClassroomInfo{
				ClassroomID: "1",
				Name:        "Computing Class 1",
			},
			Description: "Excellent",
			IssuedBy:    "University of Science and Technology - The University of Da Nang",
		},
	}
	fmt.Println(StudentCertificates)
	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["initStudentTestInfos"]}' -C myc
func (t *SmartContract) initStudentTestInfos(stub shim.ChaincodeStubInterface) pb.Response {
	startTime, _ := time.Parse(time.RFC3339, "2019-12-01T07:00:00Z07:00")

	studentTestInfos := []StudentTestInfo{
		StudentTestInfo{
			Student: StudentInfo{
				StudentID: "1",
				Username:  "Nguyen Dinh An",
				Email:     "nguyendinhan97@gmail.com",
				Dob:       "08/07/1997",
			},
			Classroom: ClassroomInfo{
				ClassroomID: "1",
				Name:        "Computing Class 1",
			},
			QuestionResponses: []QuestionResponseInfo{
				QuestionResponseInfo{
					Question: QuestionInfo{
						QuestionID:  "1",
						Description: "Why is C++ so fast?",
						RightChoice: "1",
						Choices:     []string{"Choice 1", "Choice 2", "Choice 3", "Choice 4"},
					},
					StudentChoices: []string{"1"},
				},
				QuestionResponseInfo{
					Question: QuestionInfo{
						QuestionID:  "2",
						Description: "Why is Java so slow?",
						RightChoice: "1",
						Choices:     []string{"Choice 1", "Choice 2", "Choice 3", "Choice 4"},
					},
					StudentChoices: []string{"1", "1"},
				},
			},
			Mark:       "2/2",
			Passed:     true,
			StartedAt:  startTime,
			FinishedAt: time.Now(),
		},
	}
	fmt.Println(studentTestInfos)

	i := 0
	// indexName := "email~usrid"
	for i < len(studentTestInfos) {
		fmt.Println("i is ", i)
		studentTestInfosAsBytes, _ := json.Marshal(studentTestInfos[i])
		stub.PutState("STI"+strconv.Itoa(i), studentTestInfosAsBytes)

		// use composite key, find by email
		// emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{students[i].Email, "USR" + strconv.Itoa(i)})
		// if err != nil {
		// 	return shim.Error(err.Error())
		// }
		// value := []byte{0x00}
		// stub.PutState(emailUseridIndexKey, value)

		fmt.Println("Added")
		i = i + 1
	}

	return shim.Success(nil)
}

// index start at 0
// peer chaincode query -n bkecacc -c '{"Args":["queryStudentTestInfo","0"]}' -C myc
func (t *SmartContract) queryStudentTestInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	studentTestInfoAsBytes, _ := stub.GetState("STI" + args[0])
	return shim.Success(studentTestInfoAsBytes)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["createStudentTestInfo","3","{\"student\":{\"student_id\":\"1\",\"username\":\"Nguyen Dinh An\",\"email\":\"nguyendinhan97@gmail.com\",\"dob\":\"08/07/1997\"},\"classroom\":{\"classroom_id\":\"1\",\"name\":\"Computing Class 1\"},\"question_responses\":[{\"question\":{\"question_id\":\"1\",\"description\":\"Why is C++ so fast?\",\"right_choice\":\"1\",\"choices\":[\"Choice 1\",\"Choice 2\",\"Choice 3\",\"Choice 4\"]},\"student_choices\":[\"1\"]},{\"question\":{\"question_id\":\"2\",\"description\":\"Why is Java so slow?\",\"right_choice\":\"1\",\"choices\":[\"Choice 1\",\"Choice 2\",\"Choice 3\",\"Choice 4\"]},\"student_choices\":[\"1\",\"1\"]}],\"mark\":\"2/2\",\"passed\":true,\"started_at\":\"0001-01-01T00:00:00Z\",\"finished_at\":\"2009-11-10T23:00:00Z\"}"]}' -C myc

func (t *SmartContract) createStudentTestInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	fmt.Println(args[1]) // StudentInfo

	studentTestInfo := StudentTestInfo{}
	json.Unmarshal([]byte(args[1]), &studentTestInfo)

	studentTestInfoAsBytes, _ := json.Marshal(studentTestInfo)
	stub.PutState("STI"+args[0], studentTestInfoAsBytes)

	studentEmail := studentTestInfo.Student.Email
	fmt.Println(studentEmail)

	classroomID := studentTestInfo.Classroom.ClassroomID
	fmt.Println(classroomID)

	// Composite key for email
	indexName := "email~STIID"
	emailSTIIDIndexKey, err := stub.CreateCompositeKey(indexName, []string{studentEmail, "STI" + args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	stub.PutState(emailSTIIDIndexKey, value)

	// Composite key for classroom ID
	indexName2 := "ClassroomID~STIID"
	ClassroomIDSTIIDIndexKey, err2 := stub.CreateCompositeKey(indexName2, []string{classroomID, "STI" + args[0]})
	if err2 != nil {
		return shim.Error(err.Error())
	}
	value2 := []byte{0x00}
	stub.PutState(ClassroomIDSTIIDIndexKey, value2)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["queryStudentTestInfoByEmail", "nguyendinhan97@gmail.com"]}' -C myc
func (t *SmartContract) queryStudentTestInfoByEmail(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	email := args[0]
	indexName := "email~STIID"

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

		returnedStudentTestInfoID := compositeKeyParts[1]

		studentTestInfoAsBytes, _ := stub.GetState(returnedStudentTestInfoID)

		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(returnedStudentTestInfoID)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(studentTestInfoAsBytes))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryStudentTestInfoByEmail:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())

}

// peer chaincode invoke -n bkecacc -c '{"Args":["queryStudentTestInfoByEmail", "1"]}' -C myc
func (t *SmartContract) queryStudentTestInfoByClassroomID(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	classroomID := args[0]
	indexName := "ClassroomID~STIID"

	resultsIterator, err := stub.GetStateByPartialCompositeKey(indexName, []string{classroomID})
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

		returnedClassroomID := compositeKeyParts[1]

		studentTestInfoAsBytes, _ := stub.GetState(returnedClassroomID)

		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(returnedClassroomID)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(studentTestInfoAsBytes))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryStudentTestInfoByClassroomID:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())

}

// //peer chaincode invoke -n bkecacc -c '{"Args":["updateStudentInfo", "1", "HieuFoobar", "updated@mail.com","01-01-1991"]}' -C myc
// func (t *SmartContract) updateStudentInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
// 	if len(args) != 4 {
// 		return shim.Error("Incorrect number of arguments. Expecting 4")
// 	}

// 	usrAsBytes, _ := stub.GetState("USR" + args[0])
// 	usr := StudentInfo{}
// 	json.Unmarshal(usrAsBytes, &usr)

// 	usr.StudentID = args[0]
// 	usr.Username = args[1]
// 	usr.Email = args[2]
// 	usr.Dob = args[3]

// 	usrAsBytes, _ = json.Marshal(usr)
// 	stub.PutState("USR"+args[0], usrAsBytes)

// 	return shim.Success(nil)
// }

// peer chaincode invoke -n bkecacc -c '{"Args":["deleteUserInfo", "1"]}' -C myc
func (t *SmartContract) deleteStudentTestInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	err := stub.DelState("STI" + args[0])
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to delete state with key: %s", args[0]))
	}

	// indexName := "email~usrid"
	// emailUseridIndexKey, err2 := stub.CreateCompositeKey(indexName, []string{args[1], "USR" + args[0]})
	// if err2 != nil {
	// 	return shim.Error(err2.Error())
	// }
	// stub.DelState(emailUseridIndexKey)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["initClassroom"]}' -C myc
func (t *SmartContract) initClassroom(stub shim.ChaincodeStubInterface) pb.Response {
	classrooms := []ClassroomInfo{
		ClassroomInfo{ClassroomID: "1", Name: "Revolutionary Way of Vietnamese Communist Party"},
		ClassroomInfo{ClassroomID: "2", Name: "Calculus 1"},
	}

	i := 0
	// indexName := "email~usrid"
	for i < len(classrooms) {
		fmt.Println("i is ", i)
		clrAsBytes, _ := json.Marshal(classrooms[i])
		stub.PutState("CLR"+strconv.Itoa(i), clrAsBytes)

		// use composite key, find by email
		// emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{students[i].Email, "USR" + strconv.Itoa(i)})
		// if err != nil {
		// 	return shim.Error(err.Error())
		// }
		// value := []byte{0x00}
		// stub.PutState(emailUseridIndexKey, value)

		fmt.Println("Added", classrooms[i])
		i = i + 1
	}
	return shim.Success(nil)
}

// index start at 0
// peer chaincode query -n bkecacc -c '{"Args":["queryClassroomInfo","0"]}' -C myc
func (t *SmartContract) queryClassroomInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	clrAsBytes, _ := stub.GetState("CLR" + args[0])
	fmt.Println(clrAsBytes)
	return shim.Success(clrAsBytes)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["createClassroomInfo", "2", "ClassroomName"]}' -C myc

func (t *SmartContract) createClassroomInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	var clr = ClassroomInfo{ClassroomID: args[0], Name: args[1]}

	clrAsBytes, _ := json.Marshal(clr)
	stub.PutState("CLR"+args[0], clrAsBytes)

	// indexName := "email~usrid"
	// emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{args[2], "USR" + args[0]})
	// if err != nil {
	// 	return shim.Error(err.Error())
	// }
	// value := []byte{0x00}
	// stub.PutState(emailUseridIndexKey, value)

	return shim.Success(nil)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["updateClassroomInfo", "0", "ClassroomNewName"]}' -C myc
func (t *SmartContract) updateClassroomInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	clrAsBytes, _ := stub.GetState("CLR" + args[0])
	clr := ClassroomInfo{}
	json.Unmarshal(clrAsBytes, &clr)

	clr.ClassroomID = args[0]
	clr.Name = args[1]

	clrAsBytes, _ = json.Marshal(clr)
	stub.PutState("CLR"+args[0], clrAsBytes)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["deleteClassroomInfo", "0"]}' -C myc
func (t *SmartContract) deleteClassroomInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	err := stub.DelState("CLR" + args[0])
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to delete state with key: %s", args[0]))
	}

	// indexName := "email~usrid"
	// emailUseridIndexKey, err2 := stub.CreateCompositeKey(indexName, []string{args[1], "USR" + args[0]})
	// if err2 != nil {
	// 	return shim.Error(err2.Error())
	// }
	// stub.DelState(emailUseridIndexKey)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["initQuestionInfo"]}' -C myc
func (t *SmartContract) initQuestionInfo(stub shim.ChaincodeStubInterface) pb.Response {
	questionInfos := []QuestionInfo{
		QuestionInfo{
			QuestionID:  "1",
			Description: "Why C++ SLOW?",
			RightChoice: "1",
			Choices:     []string{"Choice 1", "Choice 2", "Choice 3", "Choice 4"},
		},
		QuestionInfo{QuestionID: "2",
			Description: "Why Java fast?",
			RightChoice: "1",
			Choices:     []string{"Choice 1", "Choice 2", "Choice 3", "Choice 4"},
		},
	}

	i := 0
	// indexName := "email~usrid"
	for i < len(questionInfos) {
		fmt.Println("i is ", i)
		questionInfosAsBytes, _ := json.Marshal(questionInfos[i])
		stub.PutState("QUESINFO"+strconv.Itoa(i), questionInfosAsBytes)

		// use composite key, find by email
		// emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{students[i].Email, "USR" + strconv.Itoa(i)})
		// if err != nil {
		// 	return shim.Error(err.Error())
		// }
		// value := []byte{0x00}
		// stub.PutState(emailUseridIndexKey, value)

		fmt.Println("Added", questionInfos[i])
		i = i + 1
	}
	return shim.Success(nil)
}

// index start at 0
// peer chaincode query -n bkecacc -c '{"Args":["queryQuestionInfo","0"]}' -C myc
func (t *SmartContract) queryQuestionInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	questionInfoAsBytes, _ := stub.GetState("QUESINFO" + args[0])
	fmt.Println(questionInfoAsBytes)
	return shim.Success(questionInfoAsBytes)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["createQuestionInfo", "2", "Question Description", "RightChoice(1,2,??)", "Choice 1,Choice 2,Choice n"]}' -C myc

func (t *SmartContract) createQuestionInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	questionInfo := QuestionInfo{QuestionID: args[0], Description: args[1], RightChoice: args[2], Choices: strings.Split(args[3], ",")}

	questionInfoAsBytes, _ := json.Marshal(questionInfo)
	stub.PutState("QUESINFO"+args[0], questionInfoAsBytes)

	// indexName := "email~usrid"
	// emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{args[2], "USR" + args[0]})
	// if err != nil {
	// 	return shim.Error(err.Error())
	// }
	// value := []byte{0x00}
	// stub.PutState(emailUseridIndexKey, value)

	return shim.Success(nil)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["updateClassroomInfo", "0", "ClassroomNewName"]}' -C myc
// func (t *SmartContract) updateClassroomInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
// 	if len(args) != 2 {
// 		return shim.Error("Incorrect number of arguments. Expecting 2")
// 	}

// 	clrAsBytes, _ := stub.GetState("CLR" + args[0])
// 	clr := ClassroomInfo{}
// 	json.Unmarshal(clrAsBytes, &clr)

// 	clr.ClassroomID = args[0]
// 	clr.Name = args[1]

// 	clrAsBytes, _ = json.Marshal(clr)
// 	stub.PutState("CLR"+args[0], clrAsBytes)

// 	return shim.Success(nil)
// }

// peer chaincode invoke -n bkecacc -c '{"Args":["deleteQuestionInfo", "0"]}' -C myc
func (t *SmartContract) deleteQuestionInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	err := stub.DelState("QUESINFO" + args[0])
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to delete state with key: %s", args[0]))
	}

	// indexName := "email~usrid"
	// emailUseridIndexKey, err2 := stub.CreateCompositeKey(indexName, []string{args[1], "USR" + args[0]})
	// if err2 != nil {
	// 	return shim.Error(err2.Error())
	// }
	// stub.DelState(emailUseridIndexKey)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["initStudent"]}' -C myc
func (t *SmartContract) initStudent(stub shim.ChaincodeStubInterface) pb.Response {
	students := []StudentInfo{
		StudentInfo{StudentID: "1", Username: "Nguyen Dinh An", Email: "ndahht@gmail.com", Dob: "07-08-1997"},
		StudentInfo{StudentID: "2", Username: "An Nguyen Dinh", Email: "adnnda@gmail.com", Dob: "07-09-1997"},
	}

	i := 0
	indexName := "email~usrid"
	for i < len(students) {
		fmt.Println("i is ", i)
		usrAsBytes, _ := json.Marshal(students[i])
		stub.PutState("USR"+strconv.Itoa(i), usrAsBytes)

		// use composite key, find by email
		emailUseridIndexKey, err := stub.CreateCompositeKey(indexName, []string{students[i].Email, "USR" + strconv.Itoa(i)})
		if err != nil {
			return shim.Error(err.Error())
		}
		value := []byte{0x00}
		stub.PutState(emailUseridIndexKey, value)

		fmt.Println("Added", students[i])
		i = i + 1
	}
	return shim.Success(nil)
}

// index start at 0
// peer chaincode query -n bkecacc -c '{"Args":["queryStudentInfo","0"]}' -C myc
func (t *SmartContract) queryStudentInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	usrAsBytes, _ := stub.GetState("USR" + args[0])
	fmt.Println(usrAsBytes)
	return shim.Success(usrAsBytes)
}

//peer chaincode invoke -n bkecacc -c '{"Args":["createStudentInfo", "2", "An An An", "AnAn@mail.com","07-07-1997"]}' -C myc

func (t *SmartContract) createStudentInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	fmt.Println(args)

	var usr = StudentInfo{StudentID: args[0], Username: args[1], Email: args[2], Dob: args[3]}

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

//peer chaincode invoke -n bkecacc -c '{"Args":["updateStudentInfo", "1", "HieuFoobar", "updated@mail.com","01-01-1991"]}' -C myc
func (t *SmartContract) updateStudentInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}

	usrAsBytes, _ := stub.GetState("USR" + args[0])
	usr := StudentInfo{}
	json.Unmarshal(usrAsBytes, &usr)

	usr.StudentID = args[0]
	usr.Username = args[1]
	usr.Email = args[2]
	usr.Dob = args[3]

	usrAsBytes, _ = json.Marshal(usr)
	stub.PutState("USR"+args[0], usrAsBytes)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["deleteUserInfo", "1"]}' -C myc
func (t *SmartContract) deleteStudentInfo(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	err := stub.DelState("USR" + args[0])
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to delete state with key: %s", args[0]))
	}

	// indexName := "email~usrid"
	// emailUseridIndexKey, err2 := stub.CreateCompositeKey(indexName, []string{args[1], "USR" + args[0]})
	// if err2 != nil {
	// 	return shim.Error(err2.Error())
	// }
	// stub.DelState(emailUseridIndexKey)

	return shim.Success(nil)
}

// peer chaincode invoke -n bkecacc -c '{"Args":["queryUserByEmail", "ndahht@gmail.com"]}' -C myc
func (t *SmartContract) queryStudentByEmail(stub shim.ChaincodeStubInterface, args []string) pb.Response {
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

		returnedStudentID := compositeKeyParts[1]

		usrAsBytes, _ := stub.GetState(returnedStudentID)

		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(returnedStudentID)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(usrAsBytes))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryStudentByEmail:\n%s\n", buffer.String())

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
