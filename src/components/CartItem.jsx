import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../utilities/colors";
import { useDispatch } from "react-redux"
import { removeCartItem } from "../features/Cart/cartSlice"
import { useToast } from "react-native-toast-notifications";

const CartItem = ({ cartItem, index }) => {

    const dispatch = useDispatch();
    const toast = useToast();

    const handleRemoveItem = () => {
        dispatch(removeCartItem(cartItem));
        //Notificación toast
        toast.show("Producto eliminado del carrito", {
            type: "success",
            placement: "center",
            duration: 1500,
            offset: 300,
            animationType: "zoom-in",
        });
    }
    return (
        //Se utiliza index del ítem para saber si es un elemento par o impar de la lista y alternar el estilo/color
        <View style={[index % 2 == 0 ? styles.cardEven : styles.cardOdd, styles.card]} onPress={() => { }}>
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{cartItem.title}</Text>
                <Text style={[styles.textSubtitle, styles.textItalic]}>Precio unitario ${cartItem.price}</Text>
                <Text style={styles.textSubtitle}>Cantidad: {cartItem.quantity}</Text>
                <Text style={[styles.textSubtitle, styles.textItalic]}>Sub total ${cartItem.price * cartItem.quantity}</Text>
            </View>
            <Pressable onPress={handleRemoveItem}>
                <Entypo name="trash" size={30} color={colors.black} style={{ padding: 10 }} />
            </Pressable>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        margin: 10,
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
    textSubtitle: {
        fontSize: 14,
    },
    textItalic: {
        fontStyle: 'italic'
    }
});
