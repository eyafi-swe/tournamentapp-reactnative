import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/home/Home'
const Stack = createNativeStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator
            name="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}