import { View, Text, ScrollView, Button, TouchableOpacity, TouchableHighlight, Pressable,Image, TextInput } from 'react-native'
import { Stack,Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome"
import {
  faBars,
  faBell,
  faEnvelopeSquare,
  faCogs,
  faBed,
  faClose,
  faBank,
  faFile,
  faBook,
  faRegistered,
  faMessage,
  faCircleDot,
  faListDots
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native";
import axios from 'axios'

const studentDashboard = () => {
  const navigate = useNavigation()
  const [studentInfor, setStudentInfor] = useState({});
  const [print, setPrint] = useState(true);
  const [semester, setSemester] = useState(false);
  const [testCode, setTestCode] = useState("");
  const [quizBox,setQuizBox] = useState(false)
  const [openTestCode, setOpenTestCode] = useState("");
  const [reminderData, setReminderData] = useState(false);
  const [dataIsSet, setDataIsSet] = useState(false);
  const [preparedData, setPreparedData] = useState(false);
  const [openEtestMiniBox, setOpenEtestMiniBox] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const [announcements, setAnnouncements] = useState(false);
  const [assignments, setAssignments] = useState(false);
  const [openTimesTable, setTimesTable] = useState(false);
  const [closeAndOpenSideBar, setCloseAndOpenSideBar] = useState(false);
  const [selectedTerm,setSelectedTerm] = useState("firstterm")
  useEffect( () =>{
    async function fetchData(){
      const email = await AsyncStorage.getItem("email")
      if(email){
        const url = `http://abihsolo.com/api/user/infor/student/${email}`;
        axios
          .get(url)
          .then((response) => {
            setStudentInfor(response.data.user);
            axios
              .get(
                `http://abihsolo.com/api/get_all_assignments/${response.data.user.class}`
              )
              .then((res) => setAssignments(res.data.information))
              .catch((err) => console.table(err));

            const dd = `${new Date()}`;
            axios
              .get(
                `http://abihsolo.com/api/gettimestable/${
                  response.data.user.class
                }/${dd.slice(0, 3)}`
              )
              .then((res) => setTimesTable(res.data.infor))
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .get("http://abihsolo.com/api/allAnnouncements")
          .then((response) => {
            if (response.data.results.length > 5) {
              setAnnouncements(response.data.results.slice(0, 5));
            } else {
              setAnnouncements(response.data.results);
            }
          })
          .catch((err) => {
            console.log(err);
          });

        axios
          .get(
            `http://abihsolo.com/api/students/reminders/${studentInfor.email}`
          )
          .then((response) => {
            setTimeout(() => {
              if (response.data.data.length > 5) {
                setReminderData(response.data.data.slice(0, 5));
              } else {
                setReminderData(response.data.data);
              }
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      }else{
         navigate.navigate("login");
      }
    }
    fetchData()
    
  } ,[])
  const handleTermChange = (e) => {
    e.preventDefault();
    let semesterData = {
      term : selectedTerm,
      id:studentInfor.id,
      class:studentInfor.class
    }
  
    const url = `https://abihsolo.com/api/user/student/marks`;
    axios
      .post(url, semesterData)
      .then((response) => {
        setTimeout(() => {
          const combinedData = response.data.exams
            .map((exam) => {
              const matchingClass = response.data.class.find(
                (cls) =>
                  cls.subject === exam.subject &&
                  cls.studentid === exam.studentid
              );

              return matchingClass
                ? {
                    subject: exam.subject,
                    classMark: Number(matchingClass.mark), // Convert to number
                    examMark: Number(exam.mark),
                    total: Number(matchingClass.mark) + Number(exam.mark),
                  }
                : null; // Exclude entries without a match
            })
            .filter((item) => item !== null);
          setPreparedData(combinedData);
          
        }, 1000);
      })
      .catch(() => {
        alert("Results will be announced if ready");
      });
  };
  const handleEtestCode = async () => {
    if(testCode.length > 2){
      await AsyncStorage.setItem("testCode",testCode)
      await AsyncStorage.setItem("class",studentInfor.class)
      return navigate.navigate("QuizApp")
    }

  }
 
  return (
    <View className="flex-1 bg-pink-100 ">
      <View className=" flex flex-row justify-between z-10  pt-4  w-screen h-16 bg-slate-800 absolute top-0 ">
        <View className="ml-5">
          <Pressable onPress={() => setCloseAndOpenSideBar((pre) => !pre)}>
            <FontAwesomeIcon
              icon={faBars}
              size={30}
              style={{ color: "white" }}
            />
          </Pressable>
        </View>
        <View className="flex flex-row">
          <Text className="font-extrabold text-3xl color-red-400 ">Uni </Text>
          <Text className="color-slate-200 font-bold pt-4">Nova</Text>
        </View>
        <View className="flex flex-row gap-4  mr-5 justify-evenly">
          <Pressable onPress={() => console.warn("Clicked")}>
            <FontAwesomeIcon
              icon={faBell}
              size={20}
              style={{ color: "white" }}
            />
          </Pressable>
          <Pressable onPress={() => console.warn("Clicked")}>
            <FontAwesomeIcon
              icon={faEnvelopeSquare}
              size={20}
              style={{ color: "white" }}
            />
          </Pressable>
          <Pressable onPress={() => console.warn("Clicked")}>
            <FontAwesomeIcon
              icon={faCogs}
              size={20}
              style={{ color: "white" }}
            />
          </Pressable>
        </View>
      </View>
      <ScrollView>
        <View className=" ml-5 mr-5 mt-16">
          <View className="h-44 mt-10 p-5 grid grid-cols-12 bg-slate-800 rounded-3xl ">
            <View className="col-span-5 border-r-2 border-white  ">
              <View className="bg-white flex justify-center rounded-full ml-3 h-24 w-24 ">
                {studentInfor ? (
                  <Image
                    source={{
                      uri: `http://abihsolo.com/api/image/${studentInfor.img}`,
                    }}
                    className="w-24 h-24 rounded-full "
                  />
                ) : null}
              </View>
              <View>
                <Text>ds</Text>
              </View>
            </View>
            <View className="col-span-7 pl-5">
              <Text className="font-extrabold text-3xl text-stone-300">
                Greetings,
              </Text>
              <Text className="font-extrabold text-2xl text-stone-300 ">
                {studentInfor
                  ? `${studentInfor.oname} ${studentInfor.fname} `
                  : null}
              </Text>
            </View>
          </View>
          <Text className="font-bold mt-2">Programs</Text>
          <View className="shadow-black h-20 shadow mt-2 rounded-2xl "></View>
          <Text className="font-bold mt-2">Announcements</Text>
          <View className=" min-h-20 mt-2 rounded-2xl ">
            {announcements ? (
              announcements.map((items) => (
                <View className="grid grid-cols-12 p-2 items-center shadow-black shadow rounded-b-lg min-h-10 ">
                  <View className="col-span-1">
                    <FontAwesomeIcon
                      icon={faMessage}
                      style={{ color: "red" }}
                    />
                  </View>
                  <View className="col-span-10">
                    <Text>{items.message}</Text>
                  </View>
                  <View className="col-span-1">
                    {" "}
                    <FontAwesomeIcon
                      icon={faListDots}
                      style={{ color: "red" }}
                    />
                  </View>
                </View>
              ))
            ) : (
              <Text>No announcements available</Text>
            )}
            <Text className="font-bold mt-2">Todays Times Table</Text>
            <View className="shadow-black bg-slate-800 min-h-40 shadow p-3 mt-2 rounded-2xl">
              <View className="grid grid-cols-12 mt-2 ">
                <View className=" col-span-3 ">
                  <Text className="text-white font-bold">Day</Text>
                </View>
                <View className=" col-span-3 ">
                  <Text className="text-white font-bold">Teacher</Text>
                </View>
                <View className=" col-span-3 ">
                  <Text className="text-white font-bold">Subject</Text>
                </View>
                <View className=" col-span-3 ">
                  <Text className="text-white font-bold">Time</Text>
                </View>
              </View>
              {openTimesTable ? (
                openTimesTable.map((item) => (
                  <View className="grid grid-cols-12 mt-2 border-b border-slate-50 ">
                    <View className=" col-span-3 ">
                      <Text className="text-slate-300">{item.day}</Text>
                    </View>
                    <View className=" col-span-3 ">
                      <Text className="text-slate-300">{item.teacher}</Text>
                    </View>
                    <View className=" col-span-3 ">
                      <Text className="text-slate-300">{item.subject}</Text>
                    </View>
                    <View className=" col-span-3 ">
                      <Text className="text-slate-300">{item.time}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>No Times Table available</Text>
              )}
            </View>
            <Text className="font-bold mt-2">Calender</Text>
            <View className="shadow-black min-h-20 shadow mt-2 rounded-2xl "></View>
            <Text className="font-bold mt-2">Daily Schedules </Text>
            <View className="shadow-black bg-slate-800 min-h-40 shadow mt-2 rounded-2xl "></View>
          </View>
        </View>
      </ScrollView>
      <View
        className={
          closeAndOpenSideBar
            ? `  fixed top-0 min-h-screen bg-pink-200 w-9/12 z-30 transition-transform duration-1000 ease-in-out `
            : `  fixed top-0 min-h-screen bg-pink-200 w-9/12 z-30 transition-transform duration-1000 -left-full ease-in-out `
        }
      >
        <View className=" flex flex-row justify-between z-10  pt-4  w-full h-16 bg-slate-800 absolute top-0 ">
          <View className="flex flex-row pl-16 ">
            <Text className="font-extrabold text-3xl color-red-400 ">Uni </Text>
            <Text className="color-slate-200 font-bold pt-4">Nova</Text>
          </View>
          <View className="pr-4">
            <Pressable onPress={() => setCloseAndOpenSideBar((pre) => !pre)}>
              <FontAwesomeIcon
                icon={faClose}
                size={30}
                style={{ color: "white" }}
              />
            </Pressable>
          </View>
        </View>
        <View className="p-2">
          <View className="bg-slate-800 flex flex-row gap-3 min-h-24 p-3 w-full mt-20 rounded-xl ">
            <View className="w-20 h-20 bg-slate-100 rounded-full">
              {studentInfor ? (
                <Image
                  source={{
                    uri: `http://abihsolo.com/api/image/${studentInfor.img}`,
                  }}
                  className="w-20 h-20 rounded-full "
                />
              ) : null}
            </View>
            <View>
              <Text className="text-slate-50">
                Name :{" "}
                {studentInfor
                  ? `${studentInfor.oname} ${studentInfor.fname} `
                  : null}{" "}
              </Text>
              <Text className="text-slate-50">Date :</Text>
              <Text className="text-slate-50">status : student</Text>
            </View>
          </View>
          <View className="h-12 grid grid-cols-12 pl-6 mt-5 border-l-4 rounded-r-md border-black bg-purple-50">
            <View className="col-span-2 justify-center items-center ">
              {" "}
              <FontAwesomeIcon
                icon={faBars}
                size={25}
                style={{ color: "violet" }}
              />
            </View>
            <View className="col-span-10 justify-center">
              <Text className="text-left font-bold text-2xl ">Dashboard</Text>
            </View>
          </View>
          <View className="h-12 grid grid-cols-12 pl-6 mt-5 rounded-r-md">
            <View className="col-span-2 justify-center items-center">
              {" "}
              <FontAwesomeIcon
                icon={faRegistered}
                size={25}
                style={{ color: "" }}
              />
            </View>
            <View className="col-span-10 justify-center">
              <Text className="text-left font-bold text-lg ">Register</Text>
            </View>
          </View>
          <View className="h-12 grid grid-cols-12 pl-6 rounded-r-md">
            <View className="col-span-2 justify-center items-center">
              {" "}
              <FontAwesomeIcon icon={faBank} size={25} style={{ color: "" }} />
            </View>
            <View className="col-span-10 justify-center">
              <Text className="text-left font-bold text-lg ">Accounts</Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              setCloseAndOpenSideBar((pre) => !pre);
              setSemester((pre) => !pre);
            }}
          >
            <View className="h-12 grid grid-cols-12 pl-6 rounded-r-md">
              <View className="col-span-2 justify-center items-center">
                {" "}
                <FontAwesomeIcon
                  icon={faFile}
                  size={25}
                  style={{ color: "" }}
                />
              </View>
              <View className="col-span-10 justify-center">
                <Text className="text-left font-bold text-lg ">Results</Text>
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              setCloseAndOpenSideBar((pre) => !pre);
              setQuizBox(true);
            }}
          >
            <View className="h-12 grid grid-cols-12 pl-6 rounded-r-md">
              <View className="col-span-2 justify-center items-center">
                {" "}
                <FontAwesomeIcon
                  icon={faFile}
                  size={25}
                  style={{ color: "" }}
                />
              </View>
              <View className="col-span-10 justify-center">
                <Text className="text-left font-bold text-lg ">E-Test</Text>
              </View>
            </View>
          </Pressable>
          <View className="h-12 grid grid-cols-12 pl-6 rounded-r-md">
            <View className="col-span-2 justify-center items-center">
              {" "}
              <FontAwesomeIcon icon={faBook} size={25} style={{ color: "" }} />
            </View>
            <View className="col-span-10 justify-center">
              <Text className="text-left font-bold text-lg ">Courses</Text>
            </View>
          </View>
          <View className="h-12 grid grid-cols-12 pl-6 rounded-r-md">
            <View className="col-span-2 justify-center items-center">
              {" "}
              <FontAwesomeIcon icon={faBed} size={25} style={{ color: "" }} />
            </View>
            <View className="col-span-10 justify-center">
              <Text className="text-left font-bold text-lg ">
                Accommodation
              </Text>
            </View>
          </View>
          <View className=" fixed h-20 bg-slate-200"></View>
        </View>
      </View>
      {/* Test Code Box */}
      {quizBox ? (
        <View className="fixed gap-4 w-52 h-52 top-52 left-24 p-4 bg-slate-200 rounded-lg">
          <TextInput
            className=" border p-3 "
            placeholder="Code"
            placeholderTextColor="grey"
            value={testCode}
            onChangeText={(text) => setTestCode(text)}
          />

          <Button title="Submit" onPress={handleEtestCode} />
          <Pressable
            onPress={() => {
              setQuizBox((pre) => !pre);
            }}
          >
            <View className="flex items-center justify-center bg-zinc-950 h-10 ">
              <Text className=" text-white font-bold ">Close</Text>
            </View>
          </Pressable>
        </View>
      ) : null}

      {semester ? (
        <View className="fixed gap-4 w-52 h-64 top-52 left-24 p-4 bg-slate-200 rounded-lg">
          <Pressable onPress={() => setSelectedTerm("firstterm")}>
            <View className="flex flex-row gap-2 ">
              <View className=" flex h-5 w-5 bg-white justify-center items-center rounded-full">
                {selectedTerm == "firstterm" ? (
                  <View className="h-3 w-3 bg-black rounded-full"></View>
                ) : null}
              </View>
              <Text>First Term</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelectedTerm("secondterm")}>
            <View className="flex flex-row gap-2 ">
              <View className=" flex h-5 w-5 bg-white justify-center items-center rounded-full">
                {selectedTerm == "secondterm" ? (
                  <View className="h-3 w-3 bg-black rounded-full"></View>
                ) : null}
              </View>
              <Text>Second Term</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setSelectedTerm("thirdterm")}>
            <View className="flex flex-row gap-2 ">
              <View className=" flex h-5 w-5 bg-white justify-center items-center rounded-full">
                {selectedTerm == "thirdterm" ? (
                  <View className="h-3 w-3 bg-black rounded-full"></View>
                ) : null}
              </View>
              <Text>Third Term</Text>
            </View>
          </Pressable>
          <Button title="Submit" onPress={handleTermChange} />
          <Button title="Close" onPress={() => setSemester((pre) => !pre)} />
        </View>
      ) : null}
      {preparedData ? (
        <View
          className="fixed gap-4 p-2 w-full min-h-screen
         top-16 left-0 bg-slate-200 rounded-lg"
        >
          <View className="h-10 flex flex-row justify-between">
            <View>
              <Text className="font-bold text-lg">Year:</Text>
            </View>
            <View>
              <Text className="font-bold text-lg">Semester:</Text>
            </View>
          </View>
          <View className="h-14 grid pt-4 grid-cols-12 bg-indigo-950 rounded-3xl">
            <View className="col-span-2">
              <Text className="font-bold text-white text-center ">Subject</Text>
            </View>
            <View className="col-span-2">
              <Text className="font-bold text-white text-center ">Class</Text>
            </View>
            <View className="col-span-2">
              <Text className="font-bold text-white text-center ">Exams</Text>
            </View>
            <View className="col-span-2">
              <Text className="font-bold text-white text-center ">Total</Text>
            </View>
            {/* <View className="col-span-2">
              <Text className="font-bold text-white text-center ">Grade</Text>
            </View> */}
            {/* <View className="col-span-2">
              <Text className="font-bold text-white text-center ">Remarks</Text>
            </View> */}
          </View>
          {preparedData.map((items, index) => (
            <View
              className={
                index % 2 == 0
                  ? "h-10 grid pt-2 grid-cols-12 bg-cyan-300 rounded-xl"
                  : "h-10 grid pt-2 grid-cols-12 rounded-xl"
              }
            >
              <View className="col-span-2">
                <Text className="font-bold text-black text-center ">
                  {items.subject}
                </Text>
              </View>
              <View className="col-span-2">
                <Text className="font-bold text-black text-center ">
                  {items.classMark}
                </Text>
              </View>
              <View className="col-span-2">
                <Text className="font-bold text-black text-center ">
                  {items.examMark}
                </Text>
              </View>
              <View className="col-span-2">
                <Text className="font-bold text-black text-center ">
                  {items.total}
                </Text>
              </View>
              {/* <View className="col-span-2">
                <Text className="font-bold text-black text-center ">
                    A+
                  </Text>
                
                
              </View>
              <View className="col-span-2">
                <Text className="font-bold text-black text-center ">
                  Remarks
                </Text>
              </View> */}
            </View>
          ))}
          <Button
            title="Close"
            onPress={() => setPreparedData((pre) => !pre)}
          />
        </View>
      ) : null}
    </View>
  );
}

export default studentDashboard