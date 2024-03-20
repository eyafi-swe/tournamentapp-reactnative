import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import colors from '../constants/colors'

export default function AlertIcon({ color = colors.RED_NORMAL }) {
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
                    d="M8.27 3 3 8.27v7.46L8.27 21h7.46C17.5 19.24 21 15.73 21 15.73V8.27L15.73 3M9.1 5h5.8L19 9.1v5.8L14.9 19H9.1L5 14.9V9.1m6 5.9h2v2h-2zm0-8h2v6h-2z"
                />
            </Svg>

        </View>
    )
}