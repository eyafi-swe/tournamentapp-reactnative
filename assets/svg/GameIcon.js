import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import colors from '../constants/colors'

export default function BackArrow({ color = colors.BTN_BG }) {
    return (
        <View>

            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
            >
                <Path
                    fill={color}
                    d="M7.97 16 5 19c-.33.3-.77.5-1.25.5A1.75 1.75 0 0 1 2 17.75v-.25l1-7.38A4.524 4.524 0 0 1 7.5 6h9c2.36 0 4.29 1.81 4.5 4.12l1 7.38v.25a1.75 1.75 0 0 1-1.75 1.75c-.48 0-.92-.2-1.25-.5l-2.97-3zM7 8v2H5v1h2v2h1v-2h2v-1H8V8zm9.5 0a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75m-1.75 1.75a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75m3.5 0a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75M16.5 11.5a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75"
                />
            </Svg>

        </View>
    )
}