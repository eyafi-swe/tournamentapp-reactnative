import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import Home from '../../screens/Home/Home'
import SignIn from '../../screens/auth/SignIn'
const Stack = createNativeStackNavigator()

export default function HomeStack() {
    return (
        <Stack.Navigator
            name="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={SignIn} />
        </Stack.Navigator>
    )
}