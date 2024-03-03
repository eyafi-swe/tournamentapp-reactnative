import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"

export default function WalletIcon({ color = '#fff', width = 40, height = 38 }) {
    return (
        <View>
            <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M17.8333 5H6.16667C5.062 5.00159 4.00296 5.52888 3.22185 6.46622C2.44073 7.40356 2.00132 8.67441 2 10H22C21.9987 8.67441 21.5593 7.40356 20.7782 6.46622C19.997 5.52888 18.938 5.00159 17.8333 5Z" fill={color} />
                <Path d="M2 15.9091C2.00132 16.9937 2.44073 18.0335 3.22185 18.8004C4.00296 19.5673 5.062 19.9987 6.16667 20H17.8333C18.938 19.9987 19.997 19.5673 20.7782 18.8004C21.5593 18.0335 21.9987 16.9937 22 15.9091V11H2V15.9091ZM7.83333 15.5C7.83333 15.7427 7.76002 15.98 7.62267 16.1818C7.48532 16.3837 7.2901 16.541 7.06169 16.6339C6.83328 16.7267 6.58195 16.751 6.33947 16.7037C6.09699 16.6563 5.87427 16.5394 5.69945 16.3678C5.52463 16.1962 5.40558 15.9775 5.35735 15.7394C5.30912 15.5014 5.33387 15.2546 5.42848 15.0303C5.52309 14.8061 5.68331 14.6144 5.88887 14.4796C6.09443 14.3447 6.33611 14.2727 6.58333 14.2727C6.91485 14.2727 7.2328 14.402 7.46722 14.6322C7.70164 14.8623 7.83333 15.1745 7.83333 15.5Z" fill={color} />
            </Svg>

        </View>
    )
}