import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputForm from "../components/InputForm";
import { useSignUpMutation } from "../services/authService";
import { setUser } from "../features/User/userSlice";
import { signupSchema } from "../validations/auth";
import { colors } from "../utilities/colors";
import { useToast } from "react-native-toast-notifications";
import Loader from "../components/Loaders";
import { insertSession } from "../databases/sqlLite";

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [emailError, setEmailEror] = useState(false);
    const [passwordError, setPasswordEror] = useState(false);
    const [rePasswordError, setRePasswordError] = useState(false);

    const dispatch = useDispatch();

    const toast = useToast();

    const [triggerSignUp, result] = useSignUpMutation();

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
                    Alert.alert('Cuenta creada con éxito!', 'Serás redirigido al sitio', [
                        {
                            text: 'Aceptar',
                            onPress: () => {
                                dispatch(
                                    setUser({
                                        email: result.data.email,
                            idToken: result.data.idToken,
                            localId: result.data.localId,
                                    })
                                )
                            },
                        },
                    ]);
                } catch (error) {
                    console.log(error);
                }
            })()
            
        }
        else if (result.error) {
            Alert.alert('Error!', 'Ha ocurrido un error al intentar crear tu cuenta, intentalo nuevamente más tarde', [
                {
                    text: 'Aceptar',
                    onPress: () => { console.log(result.error) },
                },
            ]);
        }
    }, [result])

    const onSubmit = () => {
        try {
            toast.hideAll();
            setEmailEror(false);
            setPasswordEror(false);
            setRePasswordError(false);

            const validation = signupSchema.validateSync({ email, password, confirmPassword })
            triggerSignUp({ email, password, returnSecureToken: true })

        } catch (err) {
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
                case "confirmPassword":
                    setRePasswordError(true);
                    break;
            }

        }
        finally {
            setEmail("");
            setPassword("");
            setconfirmPassword("");
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../images/logo.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.container}>
                {result.isLoading ? <Loader text={"Creando cuenta..."} background={true} /> :
                    <View style={styles.container}>
                        <Text style={styles.title}>Crear cuenta</Text>
                        <InputForm label={"Email"} onChange={setEmail} error={emailError} />
                        <InputForm label={"Contraseña"} onChange={setPassword} isSecure={true} error={passwordError} />
                        <InputForm label={"Confirmar contraseña"} onChange={setconfirmPassword} isSecure={true} error={rePasswordError} />

                        <TouchableOpacity style={styles.button} onPress={onSubmit}>
                            <Text style={{ color: colors.warning }}>ENVIAR</Text>
                        </TouchableOpacity>
                        <Text style={styles.sub}>¿Ya tenés una cuenta?</Text>
                        <Pressable onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.subLink}>Iniciar sesión</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </View>
    );
};

export default SignupScreen;

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
        color: "black",
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
});
