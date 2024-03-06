import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CButtonInput from '../common/CButtonInput'
import CHeaderWithBack from '../common/CHeaderWithBack'
import colors from '../../assets/constants/colors'
import CInput from '../common/CInput'
import RadioIcon from '../../assets/svg/RadioIcon'
import { addMoneyNumbers } from '../../utils/constants'
import { BASE_URL } from '../../utils/constants'


export default function AddMoneyModal({
    visibility,
    setVisibility,
    user,
}) {

    const [amount, setAmount] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [active, setActive] = useState('bkash')
    const [loading, setLoading] = useState(false)


    const handleInput = () => {
        console.log('handleInput')
        let reg = /^[0-9]*$/;
        if (amount === '' || !reg.test(amount)) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount')
            return
        }
        if (transactionId === '') {
            Alert.alert('Invalid Transaction ID', 'Please enter a valid transaction ID')
            return
        }
        else {

            let body = {
                user_name: user.name,
                user_email: user.email,
                method: active,
                amount,
                transactionId,
            };

            setLoading(true)
            fetch(`${BASE_URL}/deposit-money`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        setVisibility(false)
                        Alert.alert('Money Add Request Sent', 'Please wait for verification')
                    }
                    else {
                        Alert.alert('Money Add Request Failed', 'Please try again')
                    }
                })
                .catch(err => {
                    console.log(err);
                    Alert.alert('Money Add Request Failed', 'Please try again')
                })
                .finally(() => {
                    setLoading(false)
                })

        }
    }


    const closeModal = () => {
        setVisibility(false)
    }


    return (
        <Modal transparent visible={visibility} animationType="fade" onRequestClose={closeModal} statusBarTranslucent={true} >
            <View style={[s.modalOuterContainer]}>
                <View style={[s.modalContainer,]}>
                    <CHeaderWithBack
                        onPress={closeModal}
                        title="Add Balance"
                        labelStyle={s.headerLabel}
                        // iconWrapColors={iconWrapColors}
                        containerStyle={s.headerContainerStyle}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
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

                    <Text style={{ marginVertical: 5 }}>Amount of Money</Text>
                    <TextInput
                        style={s.input}
                        value={amount}
                        onChangeText={(e) => {
                            setAmount(e)
                        }}
                        placeholder='Amount'
                        keyboardType='numeric'
                    />

                    <Text style={{ marginVertical: 5 }}>Transaction ID</Text>
                    <TextInput
                        style={s.input}
                        value={transactionId}
                        onChangeText={(e) => {
                            setTransactionId(e)
                        }}
                        placeholder='Transaction ID'
                        keyboardType='numeric'
                    />

                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <RadioIcon color={colors[active]} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors[active] }}>Dial {addMoneyNumbers[active].dial} or Open {addMoneyNumbers[active].name} app.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <RadioIcon color={colors[active]} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors[active] }}>Go to Send Money Option.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <RadioIcon color={colors[active]} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors[active] }}>Enter {addMoneyNumbers[active].number} as receiver.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <RadioIcon color={colors[active]} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors[active] }}>Enter your {active} menu pin.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                            <RadioIcon color={colors[active]} />
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors[active] }}>Enter the transaction id here and press verify.</Text>
                        </View>
                    </View>

                    <CButtonInput
                        label="Continue"
                        loading={loading}
                        onPress={handleInput}
                        style={{ marginTop: 20, backgroundColor: colors[active] }}

                    />
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
        // height: '80%',
        alignItems: 'stretch',
        backgroundColor: colors.MODAL_BG,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 60,
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
