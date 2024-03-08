import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/home/Home'
import ContestDetails from '../../screens/home/ContestDetails'
import NewsScreen from '../../screens/news/News'
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
            <Stack.Screen name="ContestDetails" component={ContestDetails} />
            <Stack.Screen name="News" component={NewsScreen} />
        </Stack.Navigator>
    )
}