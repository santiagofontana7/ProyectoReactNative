import React, { useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { setCameraImage } from "../features/User/userSlice";
import { usePostProfileImageMutation } from "../services/shopService";
import { colors } from "../utilities/colors";
import Loader from "../components/Loaders";

const ImageSelector = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [savingImage, setSavingImage] = useState(false);

    const [triggerPostImage, result] = usePostProfileImageMutation()

    const { localId } = useSelector(state => state.auth.value)

    const dispatch = useDispatch()

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    }
    const pickImage = async () => {

        try {
            const permissionCamera = await verifyCameraPermissions()

            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2
                })
                if (!result.canceled) {
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image)
                }
            }

        } catch (error) {
            Alert.alert('ERROR!', 'Ha ocurrido un error al seleccionar la foto, intentalo nuevamente.', [
                {
                    text: 'Aceptar',
                    onPress: () => { console.log(error); },
                },
            ]);
        }
    };

    const confirmImage = async () => {
        try {
            setSavingImage(true);
            dispatch(setCameraImage(image))
            triggerPostImage({ image, localId })
            navigation.goBack()
        } catch (error) {
            Alert.alert('ERROR!', 'Ha ocurrido un error al guardar la foto, intentalo nuevamente.', [
                {
                    text: 'Aceptar',
                    onPress: () => { console.log(error); },
                },
            ]);
        }
    };

    const cancelPhoto = () => {
        navigation.navigate('My Profile Stack')
    }

    return (
        <View style={styles.container}>
            {savingImage ?
                (<View style={styles.containerLoading}>
                    <Loader text={"Guardando foto"} />
                </View>)
                :
                <>{image ? (
                    <>
                        <Image source={{ uri: image }} style={styles.image} />
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity style={{ ...styles.button }} onPress={pickImage}>
                                <Text style={styles.text}>Tomar otra</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ ...styles.button, backgroundColor: colors.success }} onPress={confirmImage}>
                                <Text style={{ ...styles.text, color: "white" }}>Confirmar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ ...styles.button, backgroundColor: colors.gray }} onPress={cancelPhoto}>
                                <Text style={{ ...styles.text, color: "white" }}>Cancelar</Text>
                            </TouchableOpacity>

                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.noPhotoContainer}>
                            <Text>Sin imagen...</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <TouchableOpacity style={{ ...styles.button }} onPress={pickImage}>
                                <Text style={styles.text}>Tomar foto</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ ...styles.button, backgroundColor: colors.gray }} onPress={cancelPhoto}>
                                <Text style={{ ...styles.text, color: "white" }}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}</>}
        </View>
    );
};

export default ImageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        marginTop: 20,
    },
    containerLoading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.warning ,

        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        padding: 10,
        backgroundColor: colors.warning
    },
    text: {

        fontSize: 18,

    },
});
