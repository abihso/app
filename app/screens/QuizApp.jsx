import axios from "axios"
import { useEffect, useState } from "react"
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const QuizApp = () => {
  const navigate = useNavigation()
  const [myQuestions, setMyQuestions] = useState([])
  const [dataIsReady, setDataIsReady] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [timer, setTimer] = useState(35) // 10-second timer for each question
  const [isTimeUp, setIsTimeUp] = useState(false) // To check if time is up
  const [counter, setCounter] = useState(1)

  useEffect(() => {
    let code = ""
    let stclass = ""
    const getInfor = async () => {
      code = await AsyncStorage.getItem("testCode")
      stclass = await AsyncStorage.getItem("class")
    }

    getInfor()

    setTimeout(() => {
      axios
        .get(
          `http://abihsolo.com/api/students/questions/etest/${code}/${stclass}`
        )
        .then((response) => {
          console.log(response)
          setMyQuestions(response.data.questions)
          setTimeout(() => {
            setDataIsReady(true)
          }, 5000)
        })
        .catch((err) => {
          console.log(err)
          //navigate.navigate("studentDashboard")
        })
      if (timer > 0 && !isTimeUp) {
        const timerId = setTimeout(() => setTimer(timer - 1), 1000)
        return () => clearTimeout(timerId) // Cleanup on component unmount or timer reset
      } else if (timer === 0 && !isTimeUp) {
        setIsTimeUp(true)

        moveToNextQuestion()
      }
    }, 2000)
  }, [timer, isTimeUp])

  const moveToNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < myQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setTimer(30) 
      setIsTimeUp(false) 
      setCounter((pre) => pre + 1)
    } else {
      setShowScore(true)
    }
  }

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === myQuestions[currentQuestion].correctOption) {
      setScore(score + 1)
    }
    moveToNextQuestion()
  }

  const handleRestart = () => {
    setScore(0)
    setCurrentQuestion(0)
    setShowScore(false)
    setTimer(10) // Reset timer
    setIsTimeUp(false)
  }

  return (
    <View className=" flex flex-col items-center ">
      {dataIsReady ? (
        <>
          {showScore ? (
            <View>
              <Text className=" text-center font-bold text-xl underline">
                Well Done
              </Text>
              <Text>
                Your Score: {score} / {myQuestions.length}
              </Text>
              <Button
                onPress={handleRestart}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Restart Quiz
              </Button>
            </View>
          ) : (
            <View className=" mt-20">
              <Text className=" font-bold text-2xl underline mb-5">
                Kids must learn to do things on their own
              </Text>
              <Text>
                {" "}
                {counter} {myQuestions[currentQuestion].question}
              </Text>
              <View className=" flex flex-col gap-2">
                <Button
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  title={`(A). ${myQuestions[currentQuestion].optionA}`}
                  onPress={() =>
                    handleAnswerClick(myQuestions[currentQuestion].optionA)
                  }
                />

                <Button
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  title={`(B). ${myQuestions[currentQuestion].optionB}`}
                  onPress={() =>
                    handleAnswerClick(myQuestions[currentQuestion].optionB)
                  }
                />

                <Button
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",

                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  title={`(C). ${myQuestions[currentQuestion].optionC}`}
                  onPress={() =>
                    handleAnswerClick(myQuestions[currentQuestion].optionC)
                  }
                />

                <Button
                  style={{
                    display: "block",
                    margin: "10px 0",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  title={`(D). ${myQuestions[currentQuestion].optionD}`}
                  onPress={() =>
                    handleAnswerClick(myQuestions[currentQuestion].optionD)
                  }
                />
              </View>
              <View
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Time Remaining: {timer} seconds
              </View>
            </View>
          )}
        </>
      ) : (
        <View className=" fixed top-2/4 left-1/4">
          <Text className=" font-bold underline text-2xl mt-10">
            We wish you well
          </Text>
          <Text className=" font-bold ">Loading Test please wait...</Text>
        </View>
      )}
    </View>
  )
}

export default QuizApp
