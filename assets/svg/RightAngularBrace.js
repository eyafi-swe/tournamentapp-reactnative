import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import colors from '../constants/colors'

export default function RightAngularBrace({ color = colors.WHITE }) {
    return (
        <View>
            <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M0.590088 10.59L5.17009 6L0.590088 1.41L2.00009 0L8.00009 6L2.00009 12L0.590088 10.59Z" fill={color} />
            </Svg>


        </View>
    )
}