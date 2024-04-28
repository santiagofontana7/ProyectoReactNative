import { Text, View, ActivityIndicator } from "react-native"
import { colors } from "../utilities/colors";


const Loader = ({ text }) => {
    return (
        <View >
            <ActivityIndicator size="large" color={colors.warning} />
            <Text>{text}</Text>
        </View>
    )
}

export default Loader;