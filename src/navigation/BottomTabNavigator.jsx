import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackNavigator from "./HomeStackNavigator"
import { useSelector } from "react-redux"
import CartStack from "./CartStackNavigator"
import Header from "../components/Header"
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "../utilities/colors"
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
    const { items: CartData, total } = useSelector(state => state.cart.value)
    
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                header: () => {
                    return <Header route={route} />
                },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="Mercado Esclavo"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Entypo name="shop" size={36} color={focused ? colors.black : colors.gray} />

                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Mi carrito"
                component={CartStack}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <AntDesign name="shoppingcart" size={36} color={focused ? colors.black : colors.gray} />
                                <Badge containerStyle={{ position: 'absolute', top: -4, right: -4 }} value={CartData.length} status={CartData.length == 0 ? "warning" : "error"} />
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.warning,
        elevation: 4,
        height: 50,
    },
})
