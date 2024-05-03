import { Text, View, ActivityIndicator } from "react-native"
import { colors } from "../utilities/colors";


const Loader = ({ text, background }) => {
    return (
        <View >
            <ActivityIndicator size="large" color={background ? colors.black : colors.warning} />
            <Text>{text}</Text>
        </View>
    )
}

export default Loader;