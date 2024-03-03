import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import colors from '../constants/colors'

export default function CheckIcon({ color = colors.ICON_BG }) {
    return (
        <View>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM9.99999 18.3333C5.40833 18.3333 1.66666 14.5917 1.66666 10C1.66666 5.40833 5.40833 1.66666 9.99999 1.66666C14.5917 1.66666 18.3333 5.40833 18.3333 10C18.3333 14.5917 14.5917 18.3333 9.99999 18.3333Z" fill={color} />
                <Path d="M14.1667 6.66666L8.33333 12.5L5.83333 10L4.16667 11.6667L8.33333 15.8333L15.8333 8.33333L14.1667 6.66666Z" fill={color} />
            </Svg>

        </View>
    )
}