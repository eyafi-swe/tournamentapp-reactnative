import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useContext, useEffect, useState } from 'react'
import SignIn from '../../screens/auth/SignIn'
import SignUp from '../../screens/auth/SignUp'
import { AuthContext } from '../../context/UserContext'
import TabStack from './TabStack'

const Stack = createNativeStackNavigator()

export default function MainStack() {
    // console.log(subscribed, 'checked subscried after cancel plan')
    const { user } = useContext(AuthContext)


    return (
        <Stack.Navigator
            initialRouteName="SignIn"
            screenOptions={{
                headerShown: false,
            }}
        >

            {user ? <Stack.Screen name="Tabstack" component={TabStack} />
                :
                <>
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                </>
            }


        </Stack.Navigator>
    )
}
