import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Circle, Path } from "react-native-svg"
import colors from '../constants/colors'

export default function VideoIcon({ color = colors.Focused_TAB }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={20}
            height={20}
            viewBox="0 0 128 128"
        >
            <Circle
                cx={64}
                cy={64}
                r={64}
                style={{
                    fill: "#fff",
                }}
            />
            <Path
                d="M115.061 102.578 99.605 64.253a1.67 1.67 0 0 0-.158-.468c-.073-.522-.396-1.032-1.004-1.429L45.462 27.644c-1.38-.904-2.509-.294-2.509 1.356v71l10.796 27.172c3.339.538 6.761.828 10.251.828 20.855 0 39.376-9.98 51.061-25.422z"
                style={{
                    fill: "#fff",
                }}
            />
            <Path
                d="M42.953 29c0-1.65 1.129-2.26 2.509-1.356l52.981 34.712c1.38.904 1.38 2.384 0 3.289l-52.981 34.711c-1.38.904-2.509.295-2.509-1.355V29z"
                style={{
                    fill: colors.BTN_BG,
                }}
            />
        </Svg>
    )
}