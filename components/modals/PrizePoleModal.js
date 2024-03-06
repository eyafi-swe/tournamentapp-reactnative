import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, StyleSheet, Text, Modal, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import colors from '../../assets/constants/colors'

const PrizePoleModal = ({
	visibility,
	setVisibility,
	info,

}) => {

	const closeModal = () => {
		setVisibility(false)
	}
	console.log({ info })
	return (
		// <View style={{ flex: 1 }}>

		<Modal
			visible={visibility}
			animationType={'slide'}
			transparent={true}
			onRequestClose={closeModal}
		>

			<TouchableWithoutFeedback onPress={closeModal}>
				<View style={[styles.modal]} >
					<View style={[styles.modalContent]}>

						<View>

							<Text style={[styles.texts]}>{info[0]?.place}: {info[0]?.prize} BDT</Text>
							{
								info.length > 1 &&
								info.slice(1).map((item, index) => (
									<Text key={index} style={[styles.texts, styles.border]}>{item?.place}: {item?.prize} BDT</Text>
								))
							}

						</View>

					</View>
				</View>
			</TouchableWithoutFeedback>

		</Modal>
		// </View>
	)

}

const styles = StyleSheet.create({
	modalContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		// width: '100%',
		justifyContent: 'flex-end',
		// height: 500,
		flex: 1,
		backgroundColor: '#010714B8',
		// backgroundColor: 'red',
	},
	modalContent: {
		backgroundColor: '#F2F6FF',
		width: '100%',
		paddingHorizontal: 10,
		paddingVertical: 27,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		position: 'relative',
		bottom: 56,

	},

	texts: {
		// fontWeight: '700',
		fontSize: 18,
		textAlign: 'center',
		paddingVertical: 5,
	},
	border: {
		borderColor: '#FFFFFF',
		borderTopWidth: 1,
	},
	modal2: {
		width: '100%',
		justifyContent: 'flex-end',
		height: '100%',

		flex: 1,
		backgroundColor: '#010714B8',
	},
	modalContent2: {
		backgroundColor: colors.WHITE,
		width: '100%',
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		position: 'relative',
		bottom: 56,
	},
})

export default PrizePoleModal
