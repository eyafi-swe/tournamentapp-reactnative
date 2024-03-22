import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Circle, Path } from "react-native-svg"
import colors from '../constants/colors'

export default function TelegramIcon({ color = colors.WHITE }) {
	return (
		<View>
			<Svg
				xmlns="http://www.w3.org/2000/svg"
				xmlSpace="preserve"
				width={30}
				height={30}
				viewBox="0 0 512 512"
			>
				<Circle
					cx={256}
					cy={256}
					r={256}
					style={{
						fill: "#59aae7",
					}}
				/>
				<Path
					d="M256 0c-11.317 0-22.461.744-33.391 2.167C348.216 18.53 445.217 125.933 445.217 256s-97.002 237.47-222.609 253.833A258.556 258.556 0 0 0 256 512c141.385 0 256-114.616 256-256S397.385 0 256 0z"
					style={{
						fill: "#3d9ae3",
					}}
				/>
				<Path
					d="M164.689 311.141 82.127 269.86c-2.263-1.132-2.285-4.353-.038-5.516L395.75 102.105c2.304-1.192 4.964.811 4.456 3.355l-54.004 270.017a3.094 3.094 0 0 1-4.253 2.237l-73.393-31.453a3.093 3.093 0 0 0-2.721.139l-94.839 52.688c-2.062 1.145-4.597-.345-4.597-2.705v-82.474a3.09 3.09 0 0 0-1.71-2.768z"
					style={{
						fill: "#fcfcfc",
					}}
				/>
				<Path
					d="m200.31 338.967-.513-82.428a1.504 1.504 0 0 1 .72-1.293l133.899-81.798c1.518-.927 3.106 1.083 1.852 2.345l-101.9 102.624a1.517 1.517 0 0 0-.278.387l-17.43 34.858-13.509 25.988c-.725 1.395-2.831.888-2.841-.683z"
					style={{
						fill: "#d8d7da",
					}}
				/>
			</Svg>


		</View>
	)
}