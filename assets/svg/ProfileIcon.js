import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"

export default function ProfileIcon({ color = '#fff', width = 54, height = 35 }) {
    return (
        <View  >
            <Svg width={width} height={height} viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M39.0644 38.6559C42.081 34.5485 41.5119 28.4741 37.7744 24.9927C35.6121 22.9805 32.4817 21.56 29.488 22.1378C29.2994 22.2447 29.1482 22.4051 29.0539 22.5986C28.6221 23.4834 27.3665 24.1023 25.9999 24.1023C24.6333 24.1023 23.3781 23.4834 22.9459 22.5986C22.8516 22.4051 22.6802 22.2324 22.4921 22.1255C19.4904 21.5743 16.39 22.9743 14.2259 24.9923C10.4889 28.4738 9.91831 34.5486 12.9359 38.6555C13.5352 39.4981 14.5208 40.0002 15.572 40.0002H36.4285C37.4797 40.0002 38.465 39.4986 39.0644 38.6559ZM14.6897 37.4366C10.7564 32.1197 14.7242 24.2422 21.3692 24.109C23.1934 26.885 28.8068 26.885 30.6306 24.109C37.277 24.2439 41.2429 32.1205 37.3101 37.4378C37.1124 37.716 36.7826 37.8817 36.4279 37.8817L15.5714 37.8812C15.2171 37.8812 14.8874 37.7148 14.6897 37.4366Z" fill={color} />
                <Path d="M25.6776 21.7183C30.6195 21.7183 34.6402 17.7336 34.6402 12.8361C34.1476 1.05295 17.2056 1.05633 16.7151 12.8361C16.7151 17.7336 20.7358 21.7183 25.6776 21.7183ZM25.6776 5.92772C29.5214 5.92772 32.6485 9.02684 32.6485 12.8361C32.2982 21.9884 19.0562 21.9857 18.7068 12.8361C18.7068 9.02684 21.8339 5.92772 25.6776 5.92772Z" fill={color} />
            </Svg>

        </View>
    )
}