import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CButtonInput from '../common/CButtonInput'
import CHeaderWithBack from '../common/CHeaderWithBack'
import colors from '../../assets/constants/colors'
import CInput from '../common/CInput'


export default function DiamondBuyModal({
    children,
    visibility,
    setVisibility,
    navigation,
    itemInfo,
    type,
    action,

}) {

    const [value, setValue] = useState('')
    const [uid, setUid] = useState('')
    const [accountType, setAccountType] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verificationCode, setVerificationCode] = useState('')


    const closeModal = () => {
        setVisibility(false)
    }

    const handleInput = () => {
        if (type == 'uid') {
            if (uid == '') {
                Alert.alert('Please enter player id')
            } else {
                action(itemInfo, uid)
            }
        } else {
            if (accountType == '' || email == '' || password == '' || verificationCode == '') {
                Alert.alert('Please fill all fields')
            } else {
                action(itemInfo, accountType, email, password, verificationCode)
            }
        }
        closeModal()
    }


    return (
        <Modal transparent visible={visibility} animationType="fade" onRequestClose={closeModal} statusBarTranslucent={true} >
            <View style={[s.modalOuterContainer]}>
                <View style={[s.modalContainer, { height: type == 'uid' ? '33%' : '60%' }]}>
                    <CHeaderWithBack
                        onPress={closeModal}
                        title="Buy Diamonds"
                        labelStyle={s.headerLabel}
                        // iconWrapColors={iconWrapColors}
                        containerStyle={s.headerContainerStyle}
                    />
                    {
                        type == 'uid' ?
                            <>
                                <Text style={{ marginBottom: 5 }}>Player ID</Text>
                                <TextInput
                                    style={s.input}
                                    value={uid}
                                    keyboardType='numeric'
                                    onChangeText={(e) => {
                                        setUid(e)
                                    }}
                                />
                            </>
                            :
                            <>
                                <Text style={{ marginBottom: 5 }}>Type</Text>
                                <TextInput
                                    style={s.input}
                                    value={accountType}
                                    onChangeText={(e) => {
                                        setAccountType(e)
                                    }}
                                    placeholder='Facebook or Gmail'
                                />
                                <Text style={{ marginBottom: 5 }}>Email</Text>
                                <TextInput
                                    style={s.input}
                                    value={email}
                                    onChangeText={(e) => {
                                        setEmail(e)
                                    }}
                                />
                                <Text style={{ marginBottom: 5 }}>Password</Text>
                                <TextInput
                                    style={s.input}
                                    value={password}
                                    onChangeText={(e) => {
                                        setPassword(e)
                                    }}
                                />
                                <Text style={{ marginBottom: 5 }}>Verification code</Text>
                                <TextInput
                                    style={s.input}
                                    value={verificationCode}
                                    onChangeText={(e) => {
                                        setVerificationCode(e)
                                    }}
                                />
                            </>
                    }


                    <CButtonInput label="BUY" onPress={handleInput} style={{ marginTop: 20 }} />
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
        width: '80%',
        // height: '35%',
        // height: '60%',
        alignItems: 'stretch',
        backgroundColor: colors.CONTAINER_BG,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 24,
        paddingTop: 8,

    },
    input: {
        color: colors.BLACK,
        width: '100%',
        // height: '%',
        height: 30,
        justifyContent: 'center',
        // flex: 1,
        minHeight: 50,
        backgroundColor: colors.END_BG,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    headerContainerStyle: {
        marginVertical: 8,
    },
    headerLabel: {
        fontSize: 18,
        fontWeight: 'normal',
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
