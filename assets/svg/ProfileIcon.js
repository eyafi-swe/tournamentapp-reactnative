import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"

export default function ProfileIcon({ color = '#fff', width = 54, height = 35 }) {
    return (
        <View  >
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
            >
                <Path
                    fill={color}
                    d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46"
                />
            </Svg>

        </View>
    )
}