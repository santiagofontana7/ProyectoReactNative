import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGetOrdersQuery } from '../services/shopService'
import { useSelector } from 'react-redux'
import Order from '../components/Order'
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utilities/colors'

const OrderScreen = () => {

    const { localId } = useSelector(state => state.auth.value)

    const { data: orders, isSuccess } = useGetOrdersQuery(localId)

    const [ordersFiltered, setOrdersFiltered] = useState()

    useEffect(() => {
        if (isSuccess) {
            let responseTransformed = Object.values(orders)
            responseTransformed.sort((a, b) => new Date(a.date) - new Date(b.date));
            setOrdersFiltered(responseTransformed)
        }
    }, [orders, isSuccess, localId])

    return (
        (ordersFiltered && ordersFiltered.length > 0) ?
            <View style={styles.container}>
                <Text style={styles.text}>{"Mis compras"}</Text>
                <FlatList
                    data={ordersFiltered}
                    renderItem={({ item, index }) => {
                        return (
                            <Order order={item} index={index} />
                        )
                    }}
                />
            </View>
            :
            <View style={styles.centerEmpty}>
                <MaterialIcons name="broken-image" size={50} color={colors.gray} />
                <Text>No tenés ordenes generadas</Text>
            </View>
    )
}

export default OrderScreen

const styles = StyleSheet.create({
    centerEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    text: {
        textAlign: "center",
        fontSize: 18,
    },
    container: {
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        justifyContent: "center",
    },
})