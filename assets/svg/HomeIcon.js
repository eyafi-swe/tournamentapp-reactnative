import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"

export default function HomeIcon({ color = '#fff' }) {
    return (
        <View>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
            >
                <Path
                    fill={color}
                    d="M11 10h2v6h-2zm11 2h-3v8H5v-8H2l10-9zm-7-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2z"
                />
            </Svg>
        </View>
    )
}