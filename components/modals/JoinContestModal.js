import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CButtonInput from '../common/CButtonInput'
import CHeaderWithBack from '../common/CHeaderWithBack'
import colors from '../../assets/constants/colors'
import CInput from '../common/CInput'


export default function JoinContestModal({
    children,
    visibility,
    setVisibility,
    navigation,
    matchInfo,
    action,

}) {
    const closeModal = () => {
        setVisibility(false)
    }

    const [value, setValue] = useState('')

    return (
        <Modal transparent visible={visibility} animationType="fade" onRequestClose={closeModal} statusBarTranslucent={true} >
            <View style={[s.modalOuterContainer]}>
                <View style={s.modalContainer}>
                    <CHeaderWithBack
                        onPress={closeModal}
                        title="Join Contest"
                        labelStyle={s.headerLabel}
                        // iconWrapColors={iconWrapColors}
                        containerStyle={s.headerContainerStyle}
                    />

                    <Text style={{ marginBottom: 5, color: colors.RED_NORMAL, textAlign: 'center' }}>You must have game id level more than 40!!</Text>
                    <Text style={{ marginBottom: 5 }}>Exact Name of Game</Text>
                    <TextInput
                        style={s.input}
                        value={value}
                        onChangeText={(e) => {
                            setValue(e)
                        }}
                    />

                    <CButtonInput label="JOIN" onPress={() => {
                        action(matchInfo, value)
                        closeModal()
                    }} style={{ marginTop: 20 }} />
                </View>
            </View>
        </Modal>
    )
}

const s = StyleSheet.create({
    modalOuterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
    },
    modalContainer: {
        width: '70%',
        alignItems: 'stretch',
        backgroundColor: colors.MODAL_BG,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 34,
        paddingTop: 8,

    },
    input: {
        color: colors.BLACK,
        width: '100%',
        // height: '%',
        height: 40,
        justifyContent: 'center',
        // flex: 1,
        minHeight: 60,
        backgroundColor: colors.PRIM_BG,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    headerContainerStyle: {
        marginVertical: 8,
    },
    headerLabel: {
        fontSize: 18,
        fontWeight: '700',
        // marginLeft: 8,
    },
    settingsItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.WHITE,
        paddingVertical: 8,
    },
    settingsItemText: {
        fontFamily: 'inter-regular',
        color: colors.HOME_TEXT,
        fontSize: 18,
    },
})
