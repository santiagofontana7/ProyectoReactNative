import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { colors } from "../utilities/colors"


const Order = ({ order, index }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const total = order.items.reduce(
        (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
        0
    );

    const viewDetail = () => {
        setModalVisible(true);
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

                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Detalle de compra</Text>
                        <View style={styles.containerModal}>
                            <FlatList
                                data={order.items}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <Text style={styles.textBold}>{item.title.substring(0, 30)}</Text>
                                            <Text style={styles.textItalic}>{item.quantity} x {item.price}</Text>
                                            <Text>${item.quantity * item.price}</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={[styles.buttonCancel]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </Modal>
            <View style={[index % 2 == 0 ? styles.cardEven : styles.cardOdd, styles.card]}>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>
                        {new Date(order?.date || null).toLocaleString()}
                    </Text>
                    <Text style={styles.textItalic}>{"Ítems: " + order.items.length}</Text>
                    <Text style={styles.textSubtitle}>${total}</Text>
                </View>
                <Pressable onPress={viewDetail}>
                    <FontAwesome5 name="eye" size={32} color={colors.black} style={{ padding: 10 }} />
                </Pressable>
            </View>
        </View>
    );
};

export default Order;

const styles = StyleSheet.create({
    card: {
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardEven: {
        backgroundColor: colors.softYellow,
    },
    cardOdd: {
        backgroundColor: colors.softBlue,
    },
    textContainer: {
        padding: 10,
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    textTitle: {
        fontSize: 19,
        fontWeight: "bold"
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 15
    },
    textSubtitle: {
        fontSize: 16,
    },
    textItalic: {
        fontStyle: 'italic'
    },
    container: {
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: '#ecf0f1',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5,
    },
    containerModal: {
        flexDirection: "row",
        gap: 5,
        width: "80%"
    },
    centeredView: {
        backgroundColor: 'rgba(185, 185, 185, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCancel: {
        alignItems: "center",
        padding: 10,
        marginTop: 5,
        width: "100%",
        backgroundColor: colors.gray
    },
    modalText: {
        fontSize: 15,
        marginBottom: 15,
        textAlign: 'center',
    },

});
