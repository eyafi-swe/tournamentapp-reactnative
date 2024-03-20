import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import colors from '../constants/colors'

export default function MoneyIcon({ color = colors.RED_NORMAL }) {
    return (
        <View style={{ marginTop: 7 }}>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
            >
                <Path
                    fill={color}
                    d="M7 15h2c0 1.08 1.37 2 3 2s3-.92 3-2c0-1.1-1.04-1.5-3.24-2.03C9.64 12.44 7 11.78 7 9c0-1.79 1.47-3.31 3.5-3.82V3h3v2.18C15.53 5.69 17 7.21 17 9h-2c0-1.08-1.37-2-3-2s-3 .92-3 2c0 1.1 1.04 1.5 3.24 2.03C14.36 11.56 17 12.22 17 15c0 1.79-1.47 3.31-3.5 3.82V21h-3v-2.18C8.47 18.31 7 16.79 7 15"
                />
            </Svg>

        </View>
    )
}