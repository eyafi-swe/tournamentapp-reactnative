import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import colors from '../constants/colors'

export default function NotificationIcon({ color = colors.Focused_TAB, numb = 0 }) {
    return (
        <View style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
            {
                numb != 0 && <Text style={{ color: colors.RED_NORMAL, fontWeight: 'bold' }}>{numb}</Text>
            }
            <Svg width="20" height="26" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16L0 17H16V16L14 14Z" fill={color} />
            </Svg>


        </View>
    )
}