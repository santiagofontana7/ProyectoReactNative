import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform } from "react-native"
import React, { useState, useEffect } from "react"
import InputForm from "../components/InputForm"
import { useSignInMutation } from "../services/authService"
import { setUser } from "../features/User/userSlice"
import { useDispatch } from "react-redux"
import { signinSchema } from "../validations/auth";
import { colors } from "../utilities/colors";
import { useToast } from "react-native-toast-notifications";
import Loader from "../components/Loaders"
import { insertSession } from "../databases/sqlLite"

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    let [triggerSignIn, result] = useSignInMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailEror] = useState(false);
    const [passwordError, setPasswordEror] = useState(false);

    const toast = useToast();

    useEffect(() => {
        if (result.isSuccess) {
            (async () => {
                try {
                    if (Platform.OS !== "web") {
                        const response = await insertSession({
                            email: result.data.email,
                            localId: result.data.localId,
                            token: result.data.idToken,
                        })
                    }
                    dispatch(
                        setUser({
                            email: result.data.email,
                            idToken: result.data.idToken,
                            localId: result.data.localId,
                        })
                    )
                } catch (error) {
                    console.log(error);
                }
            })()
        }
        else if (result.error) {
            Alert.alert('Credeciales inválidas', 'Usuario y/o contraseña incorrectos', [
                {
                    text: 'Aceptar',
                    onPress: () => { result.reset(); },
                },
            ]);
        }
    }, [result])

    const onSubmit = () => {
        try {
            toast.hideAll();
            setEmailEror(false);
            setPasswordEror(false);
            const validation = signinSchema.validateSync({ email, password })
            triggerSignIn({ email, password })
        }
        catch (err) {
            toast.show(err.message, {
                type: "danger",
                placement: "bottom",
                offset: 300,
                animationType: "zoom-in",
            });
            switch (err.path) {
                case "email":
                    setEmailEror(true)
                    break;
                case "password":
                    setPasswordEror(true)
                    break;
            }
        }
        finally {
            setEmail("");
            setPassword("");
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../images/logo.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.container}>
                {result.isLoading ? <Loader text={"Iniciando sesión..."} background={true} /> :
                    <View style={styles.container}>
                        <Text style={styles.title}>Iniciar sesión</Text>
                        <InputForm label={"Email"} onChange={setEmail} error={emailError} />
                        <InputForm label={"Contraseña"} onChange={setPassword} error={passwordError} isSecure={true} />
                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            <Text style={{ color: colors.warning }}>ENVIAR</Text>
                        </TouchableOpacity>
                        <Text style={styles.sub}>¿No tenés una cuenta?</Text>
                        <Pressable onPress={() => navigation.navigate("Signup")}>
                            <Text style={styles.subLink}>CREAR CUENTA</Text>
                        </Pressable>
                    </View>
                }
            </View>

        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    imageContainer: {
        width: "90%",
        height: "10%"
    },
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.warning
    },
    container: {
        width: "90%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
        paddingVertical: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
    },
    sub: {
        fontSize: 14,
        color: colors.black
    },
    subLink: {
        fontSize: 14,
        color: "blue",
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    button: {
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.black,
        width: "90%"
    }
})
