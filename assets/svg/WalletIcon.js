import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"

export default function WalletIcon({ color = '#fff', width = 40, height = 38 }) {
    return (
        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
            >
                <Path
                    fill={color}
                    d="M3 6h18v12H3zm9 3a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3M7 8a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2v-4a2 2 0 0 1-2-2z"
                />
            </Svg>

        </View>
    )
}