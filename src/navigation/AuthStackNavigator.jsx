import { StyleSheet } from "react-native"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "../screens/Login"
import SignUp from "../screens/SignUp"

const Stack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen component={Login} name="Login" />
            <Stack.Screen
                component={SignUp}
                name="Signup"
            />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})