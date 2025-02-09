import "../../global.css"
import { View, Text,StyleSheet, TextInput,Button,ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import colors from "../../globalStyles"
const login = () => {
  const navigate = useNavigation()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [toDo, setToDo] = useState(false);
  const [reminderData,setReminderData] = useState(false);
  const [showActivityBar,setShowActivityBar] = useState(false)
  const handleData = async () => {
    if(email.length < 1 || password.length < 2) return console.warn("All feilds must be filled")
      axios
      .post("http://abihsolo.com/api/login", {email : email,password:password})
      .then( async (response) => {
        await AsyncStorage.setItem("email",response.data.user.email)
        await AsyncStorage.setItem("token",response.data.token)
        if(response.data.user.role == "Student" ){
          setShowActivityBar(true)
          setTimeout(()=>{
           navigate.navigate('studentDashboard')
          },1000)
        }
      }
    ).catch(err => {
      console.log(err)
    })
      
  }

  return (
    <View className="grid grid-cols-12 h-full ">
      {showActivityBar ? (
        <View className = "justify-center fixed top-1/2 left-1/2 ">
          <ActivityIndicator size={50} />
          <Text>please wait...</Text>
        </View>
      ) : (
        <>
          <View className="col-span-5 bg-zinc-800 z-40">
            <View
              style={colors.fourthBackGroundColor}
              className=" h-fit w-96 rounded-3xl shadow-lg bg-slate-100 shadow-black mt-10 ml-4 "
            >
              <View className="h-20 p-8">
                <Text className="text-right"> uni Nova </Text>
              </View>
              <View className="p-8">
                <Text className="font-extrabold text-4xl">Welcome back</Text>
                <Text className="font-bold text-xl">to the family</Text>
                <Text className="font-bold">Login to access your account</Text>
                <Text className="font-bold text-xl mt-10">Login</Text>
                <Text className="font-bold ">enter your acount details</Text>

                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  className="border-b mt-5 p-2"
                  placeholder="email"
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  className="border-b mt-10 p-2 mb-10"
                  placeholder="password"
                  secureTextEntry={true}
                />

                <View className="rounded-md overflow-hidden">
                  <Button onPress={handleData} title="login" color="black" />
                </View>
                <View className="grid grid-cols-12 mt-5">
                  <View className="col-span-7">
                    {" "}
                    <Text className="font-bold ">
                      {" "}
                      Don't have an account{" "}
                    </Text>{" "}
                  </View>
                  <View className="col-span-5 rounded-xl overflow-hidden">
                    <Button title="sign up" color="pink" />
                  </View>
                </View>
                <Text className="mt-10">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tempore eaque laudantium pariatur eveni
                </Text>
              </View>
            </View>
          </View>
          <View className="col-span-7 bg-slate-100 z-0"></View>
        </>
      )}
    </View>
  );
}

export default login

const styles = StyleSheet.create({
  topBar : {
    backgroundColor : "#F68D88"
  }
})