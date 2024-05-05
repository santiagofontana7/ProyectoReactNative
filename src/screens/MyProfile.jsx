import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfileImageQuery } from "../services/shopService";
import { colors } from "../utilities/colors";
import { clearUser } from "../features/User/userSlice";

const MyProfile = ({ navigation }) => {

    const dispatch = useDispatch();
    const { imageCamera, localId, user } = useSelector(state => state.auth.value);
    const { data: imageFromBase } = useGetProfileImageQuery(localId);

    const launchCamera = async () => {
        navigation.navigate('Image selector')
    };

    const logOut = () => {
        dispatch(clearUser());
    }

    const defaultImageRoute = "../images/defaultProfile.png"

    return (
        <View style={styles.container}>
            {imageFromBase || imageCamera ?
                <Image source={{ uri: imageFromBase?.image || imageCamera }} style={styles.image} resizeMode="cover" /> :
                <Image source={require(defaultImageRoute)} style={styles.image} resizeMode="cover" />
            }
            <Text>{user}</Text>
            <TouchableOpacity style={styles.button} onPress={launchCamera}>
                <Text style={styles.text}>Añadir foto de perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logOut}            >
                <Text style={{ color: colors.gray }}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
