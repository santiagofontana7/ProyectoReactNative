import { FlatList, Modal, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from 'react';
import CartItem from "../components/CartItem"
import { useSelector } from "react-redux"
import { usePostOrderMutation } from "../services/shopService"
import { colors } from "../utilities/colors"
import Loader from "../components/Loaders";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from "react-redux"
import { emptyCart } from "../features/Cart/cartSlice"

const Cart = ({ navigation }) => {

    const dispatch = useDispatch()
    const { localId } = useSelector(state => state.auth.value)
    const [modalVisible, setModalVisible] = useState(false);
    const { items: CartData, total } = useSelector(state => state.cart.value)
    const [triggerPostOrder, result] = usePostOrderMutation()
    const [emptyCartAction, setEmptyCartAction] = useState(false);

    useEffect(() => {
        if (emptyCartAction) {
            dispatch(emptyCart());
            setEmptyCartAction(false);
        }
    }, [emptyCartAction])

    const onConfirmOrder = () => {
        triggerPostOrder({ items: CartData, user: localId, total, date: new Date() })
    }

    if (!result.isUninitialized && modalVisible && !result.isLoading) {
        setModalVisible(false);
        if (result.isSuccess) {
            setEmptyCartAction(true);
            Alert.alert('Compra confirmada', 'Identificador de compra: ' + result.data.name, [
                {
                    text: 'Aceptar',
                    onPress: () => { 
                        navigation.navigate("Orders")
                        result.reset(); },
                },
            ]);
        }
        else if (result.isError) {
            Alert.alert('ERROR!', 'Ha ocurrido un error al procesar la compra, por favor, inténtelo nuevamente.', [
                {
                    text: 'Aceptar',
                    onPress: () => { result.reset(); },
                },
            ]);
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    {result.isLoading ? <Loader text={"Finalizando compra"} /> :
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>¿Desea confirmar la compra?</Text>
                            <View style={styles.containerModal}>
                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={onConfirmOrder}>
                                    <Text style={styles.textStyle}>Confirmar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonCancel]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </Modal>
            {
                CartData.length > 0 ?
                    <View>
                        <Text style={styles.text}>{"Mi carrito"}</Text>
                        <FlatList
                            data={CartData}
                            keyExtractor={(pepe) => pepe.id}
                            renderItem={({ item, index }) => {
                                return <CartItem cartItem={item} index={index} />
                            }}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.textTitle}>Total: ${total}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                                <Text>CONFIRMAR</Text>
                            </TouchableOpacity >
                        </View>
                    </View> :
                    <View style={styles.centerEmpty}>
                        <MaterialCommunityIcons name="cart-remove" size={50} color={colors.gray} />
                        <Text>El carrito aún no tiene productos</Text>
                        <Text>Agregue ítems para proceder con la compra</Text>
                    </View>
            }
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    containerModal: {
        flexDirection: "row",
        gap: 5,
        width: "50%"
    },
    container: {
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        justifyContent: "center",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        padding: 10,
        marginTop: 5,
        width: "100%",
        backgroundColor: colors.warning
    },
    buttonCancel: {
        alignItems: "center",
        padding: 10,
        marginTop: 5,
        width: "100%",
        backgroundColor: colors.gray
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    mainContainer: {
        justifyContent: "center",
    },
    textContainer: {
        padding: 10,
        alignItems: "flex-end",
    },
    centeredView: {
        backgroundColor: 'rgba(185, 185, 185, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    modalView: {
        margin: 20,
        backgroundColor: '#ecf0f1',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    textStyle: {
        color: colors.black,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    text: {
        textAlign: "center",
        fontSize: 18,
    }
})