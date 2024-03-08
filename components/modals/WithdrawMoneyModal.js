import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CButtonInput from '../common/CButtonInput'
import CHeaderWithBack from '../common/CHeaderWithBack'
import colors from '../../assets/constants/colors'
import CInput from '../common/CInput'
import RadioIcon from '../../assets/svg/RadioIcon'


export default function WithdrawMoneyModal({
    children,
    visibility,
    setVisibility,
    navigation,
    action,
    balance = 0,
}) {

    const [accountNumber, setAccountNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [active, setActive] = useState('bkash')

    const closeModal = () => {
        setVisibility(false)
    }

    const handleInput = () => {
        if (accountNumber.length < 11) {
            Alert.alert('Sorry', 'Account number must be 11 digits')
            return
        }
        if (amount < 100) {
            Alert.alert('Sorry', 'Minimum withdraw amount is 100 BDT')
            return
        }
        if (amount > balance) {
            Alert.alert('Sorry', 'You dont have enough balance')
            return
        }
        action(
            active,
            accountNumber,
            amount,
        )
        closeModal()

    }

    return (
        <Modal transparent visible={visibility} animationType="fade" onRequestClose={closeModal} statusBarTranslucent={true} >
            <View style={[s.modalOuterContainer]}>
                <View style={[s.modalContainer,]}>
                    <CHeaderWithBack
                        onPress={closeModal}
                        title="Withdraw Money"
                        labelStyle={s.headerLabel}
                        // iconWrapColors={iconWrapColors}
                        containerStyle={s.headerContainerStyle}
                    />

                    <View style={{ marginBottom: 10, alignItems: 'center' }}>
                        <Text>Total Balance</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>৳ {balance}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: active == 'bkash' ? colors.ICON_BG : '#FF007F' }}
                            onPress={() => setActive('bkash')}
                        >
                            <Text style={{ color: colors.WHITE, fontSize: 16, fontWeight: '600' }}>Bkash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: active == 'rocket' ? colors.ICON_BG : '#A45EE9' }}
                            onPress={() => setActive('rocket')}
                        >
                            <Text style={{ color: colors.WHITE, fontSize: 16, fontWeight: '600' }}>Rocket</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 10, borderRadius: 10, backgroundColor: active == 'nagad' ? colors.ICON_BG : '#FF5349' }}
                            onPress={() => setActive('nagad')}
                        >
                            <Text style={{ color: colors.WHITE, fontSize: 16, fontWeight: '600' }}>Nagad</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ marginBottom: 5 }}>Enter account number</Text>
                    <TextInput
                        style={s.input}
                        value={accountNumber}
                        keyboardType='numeric'
                        onChangeText={(e) => {
                            setAccountNumber(e)
                        }}
                        placeholder='Account Number'
                    />
                    <Text style={{ marginBottom: 5 }}>Amount of Money</Text>
                    <TextInput
                        style={s.input}
                        value={amount}
                        keyboardType='numeric'
                        onChangeText={(e) => {
                            setAmount(e)
                        }}
                        placeholder='Amount'
                    />

                    <Text style={{ marginTop: 5, color: colors.RED_NORMAL, textAlign: 'center' }}>*Minimum Withdraw amount is 100 BDT</Text>
                    <Text style={{ marginTop: 5, color: colors.RED_NORMAL, textAlign: 'center' }}>*Enter only personal number</Text>
                    <CButtonInput label="Withdraw" onPress={handleInput} style={{ marginTop: 20, backgroundColor: colors[active] }} />
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
        backgroundColor: colors.MODAL_BG,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 54,
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
