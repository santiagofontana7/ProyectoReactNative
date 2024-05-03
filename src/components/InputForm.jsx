import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utilities/colors';

const InputForm = ({ label, onChange, error = false, isSecure = false }) => {
    const [input, setInput] = useState("");
    const onChangeText = (text) => {
        setInput(text)
        onChange(text)
    }
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>{label}</Text>
            <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                value={input}
                onChangeText={onChangeText}
                secureTextEntry={isSecure}
            />
        </View>
    )
}

export default InputForm

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%'
    },
    subtitle: {
        width: '90%',
        fontSize: 16,
    },
    error: {
        paddintTop: 2,
        fontSize: 16,
        color: 'red',
    },
    input: {
        width: '90%',
        borderWidth: 0,
        borderBottomWidth: 3,
        padding: 2,
        fontSize: 14,
    },
    inputError: {
        borderBottomColor: colors.danger
    }
})