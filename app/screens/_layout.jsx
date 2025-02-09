import "../../global.css"
import {Stack} from "expo-router"
import { View } from "react-native"
import Navbar from "../../components/mycomponents/navbar"
import { Button } from "react-native"
const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="login" options={{headerShown:false}} />    
        <Stack.Screen name="studentDashboard" options={{headerShown:false }} />    
           
    </Stack>
  )
}

export default _layout
