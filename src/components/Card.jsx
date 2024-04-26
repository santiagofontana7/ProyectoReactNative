
import { StyleSheet, View } from "react-native";
import React from 'react'
import { colors } from "../utilities/colors";

const Card = ({ children, style }) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.gray,
        width: 180,
        height: 180,
    }
})