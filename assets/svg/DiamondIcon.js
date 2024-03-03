import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import colors from '../constants/colors'

export default function DiamondIcon({ color = colors.ICON_BG, width = 45, height = 45 }) {
    return (
        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                fill="none"
                viewBox="0 0 32 32"

            >
                <Path
                    fill={color}
                    d="M4.56 14h5.773l4.695 11.27a2 2 0 0 1-.503-.398L4.56 14ZM4.531 12l4.4-5.28A2 2 0 0 1 10.469 6h1.81l-2 6H4.532ZM14.387 6l-2 6h7.225l-2-6h-3.225ZM19.72 6l2 6h5.748l-4.4-5.28A2 2 0 0 0 21.53 6h-1.81ZM27.44 14h-5.774l-4.695 11.27a2 2 0 0 0 .503-.398L27.439 14ZM16 22.4 12.5 14h7L16 22.4Z"
                />
            </Svg>

        </View>
    )
}