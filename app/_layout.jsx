import {Stack} from "expo-router";
const myLayout = () =>{
  return <Stack>
    <Stack.Screen name="index" options={{headerShown:false}} />
    <Stack.Screen name="screens" options={{headerShown:false}} />
    
  </Stack>
}
export default myLayout