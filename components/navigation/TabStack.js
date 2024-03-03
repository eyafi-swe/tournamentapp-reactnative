import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import colors from '../../assets/constants/colors'
import HomeIcon from '../../assets/svg/HomeIcon'
import ProfileIcon from '../../assets/svg/ProfileIcon'
import WalletIcon from '../../assets/svg/WalletIcon'
import DiamondIcon from '../../assets/svg/DiamondIcon'
import HomeStack from './HomeStack'

const Tab = createBottomTabNavigator()

const TabStack = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName="HomeStack"
                screenOptions={({ navigation, route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: [
                        styles.tabBarStyle,
                        { backgroundColor: colors.BOTTOM_BAR_BG },
                    ],
                    tabBarBackground: () => {

                    },
                })}
            >
                <Tab.Screen
                    name="HomeStack"
                    screenOption={{
                        tabBarHideOnKeyboard: true,
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <HomeIcon size={24} color={focused ? colors.ICON_BG : colors.WHITE} />
                            </View>
                        ),
                    }}
                    component={HomeStack}
                />
                <Tab.Screen
                    name="TopUp"
                    screenOption={{
                        tabBarHideOnKeyboard: true,
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <DiamondIcon size={24} color={focused ? colors.ICON_BG : colors.WHITE} />
                            </View>
                        ),
                    }}
                    component={HomeStack}
                />
                <Tab.Screen
                    name="WalletStack"
                    screenOption={{
                        tabBarHideOnKeyboard: true,
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <WalletIcon size={24} color={focused ? colors.ICON_BG : colors.WHITE} />
                            </View>
                        ),
                    }}
                    component={HomeStack}
                />
                <Tab.Screen
                    name="Profile"
                    screenOption={{
                        tabBarHideOnKeyboard: true,
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.icon}>
                                <ProfileIcon size={22} color={focused ? colors.ICON_BG : colors.WHITE} />
                            </View>
                        ),
                    }}
                    component={HomeStack}
                />



            </Tab.Navigator>
        </SafeAreaView>


    )

}

const styles = StyleSheet.create({
    icon: {},
    tabBarStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 56,
        borderTopWidth: 0,
        elevation: 0,
    },
    iconCounterRotate: {
        transform: [{ rotate: '-45deg' }],
    },
})



export default TabStack