import React from "react"
import { StyleSheet, View, Text } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackNavigator from "./HomeStackNavigator"
import { useSelector } from "react-redux"
import CartStack from "./CartStackNavigator"
import Header from "../components/Header"
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { colors } from "../utilities/colors"
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import MyProfileStackNavigator from "./MyProfileStackNavigator"
import OrderStack from "./OrderStackNavigator"
import { Ionicons } from '@expo/vector-icons';
import { useGetProfileImageQuery } from "../services/shopService"

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

    const { localId } = useSelector(state => state.auth.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const { items: CartData, total } = useSelector(state => state.cart.value)

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            header: () => {
                return <Header route={route} />
            },
            tabBarShowLabel: false, tabBarStyle: styles.tabBar,
        })}
        >
            <Tab.Screen name="Mercado Esclavo" component={HomeStackNavigator} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <View>
                            <Entypo name="shop" size={36} color={focused ? colors.black : colors.gray} />
                        </View>
                    )
                },
            }}
            />
            <Tab.Screen name="Mi carrito" component={CartStack} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <View>
                            <AntDesign name="shoppingcart" size={36} color={focused ? colors.black : colors.gray} />
                            {/* Ícono para mostrar la cantidad de ítems que tiene el carrito */}
                            <Badge containerStyle={{ position: 'absolute', top: -4, right: -4 }} value={CartData.length} status={CartData.length == 0 ? "error" : "primary"} />
                        </View>
                    )
                },
            }}
            />
            <Tab.Screen name="Orders" component={OrderStack} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <View>
                            <Ionicons name="receipt-outline" size={36} color={focused ? colors.black : colors.gray} />
                        </View>
                    )
                },
            }}
            />
            <Tab.Screen name="Mi Perfil" component={MyProfileStackNavigator} options={{
                tabBarIcon: ({ focused }) => {
                    return (
                        <View>
                            {/* En caso de que el usuario tenga imagen cargada, se muestra en vez del ícono por defecto */}
                            {imageFromBase ? (
                                <Avatar rounded source={{ uri: imageFromBase?.image, }} size="small" />
                            ) : (
                                <Ionicons name="person-circle" size={36} color={focused ? colors.black : colors.gray} />
                            )}
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
