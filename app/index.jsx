import "../global.css"
import { View,Text,StyleSheet,Button, TextInput, TouchableHighlight, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faSearch,
  faBars,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "expo-router";
export default function HomeScreen() {
  
  return (
    <View className="flex-1 justify-center items-center" >
      <Link href={"/screens/login"} >Log in</Link>
    </View>
  );
}

  // {/* <Text>Some Text</Text>
  //     <FontAwesomeIcon icon={faEye} size={50} style={{ color: "red" }} />
  //     <FontAwesomeIcon icon={faSearch} size={50} style={{ color: "blue" }} />
  //     <FontAwesomeIcon icon={faBars} size={50} style={{ color: "black" }} />
  //     <FontAwesomeIcon icon={faSmile} size={50} style={{ color: "yellow" }} /> */}