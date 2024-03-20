import React, { useState } from 'react'
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CButtonInput from '../common/CButtonInput'
import CHeaderWithBack from '../common/CHeaderWithBack'
import colors from '../../assets/constants/colors'
import CInput from '../common/CInput'
import AlertIcon from '../../assets/svg/AlertIcon'
import DollarIcon from '../../assets/svg/DollarIcon'
import MoneyIcon from '../../assets/svg/MoneyIcon'
import CheckIcon from '../../assets/svg/CheckIcon'
import RadioIcon from '../../assets/svg/RadioIcon'

const notices = [
    "Cholo Kheli App এ অংশগ্রহণ করা ম্যাচ গুলো আপনার রিপ্লাই ভিডিও থেকে 4x speed এ screen recording করে আমাদের পাঠাবেন । ম্যাচ এর মদ্যে ৫-৬টি screenshot niben (গেমপ্লে ফেয়ার হতে হবে)",
    "Room id password collect থেকে শুরু করে গেম এ প্লেন আসা পর্য্যন্ত screenrecoder ওন রাখবেন জাতে আপনাকে ভুলে কিক দিলে আপনি ভিডিও দিয়ে রিফান্ড নিতে পারেন",
    "যদি কোনো প্লেয়ার hack ইউজ করে বা teaming করে খেলে বা Call এ খেলে এমন প্রমাণ পাই আমরা তাহলে Cholo Kheli App থেকে permanent ban দেয়া হবে (রিওয়ার্ড পাবেন নাহ)",
    "একসাথে দুইটা sniper ইউজার করা যাবে নাহ করলে রিওয়ার্ড পাবেন না",
    "আপনার FreeFire আইডি লেভেল 40+ থাকতে হবে নাইলে রুম থেকে কিক দেয়া হবে রিফান্ড পাবেন না",
    "রুম আইডি আর পাসওয়ার্ড ৩-৫মিনিট আগে দেয়া হবে। যদি গেম স্লট ফুল থাকার কারণে ডুকতে নাহ পারেন থাহলে (game e observe slot e dukben হোস্ট আপনারে প্লেয়ার করে দিবে নাহলে রিফান্ড পাবেন)",
    "বাহির এর কারোর সাথে রুমআইডি পাস শেয়ার করবেন নাহ যদি কোন বাহির এর ম্যান অ্যাড করেন তাহলে তার সাথে আপনারে ও কিক দেয়া হবে আর রিফান্ড পাবেন না",
    "Full map e হিল ব্যাটেল করলে বাহ টিমিং করলে রিওয়ার্ড পাবেন না",
    "Duo আর Squad এ যদি আপনার টিমমেট নাহ থাকে তাহলে অন্য কারো স্লট গিয়ে বিরক্ত করবেন নাহ তাহলে রুম থেকে কিক দেয়া হবে",
    "প্রতি ম্যাচ শেষ এ ১৫-২০মিনিট এর মধ্যে আপনার রিওয়ার্ড আপনার ওয়ালেট এ অ্যাড করে দেয়া হবে যদি তার বেশি দেরি হয় তাহলে টেলিগ্রাম এ অ্যাডমিন কে নক দিবেন আপনার রিওয়ার্ড পেয়ে যাবেন"
]

const moneyNotices = [
    "আপনার Deposit ১০-১৫মিনিট এর মধ্যে অ্যাড করে দেয়া হবে আপনার wallet এ",
    "আপনাদের withdraw ৫-৬ ঘণ্টার মদ্যে পাবেন যদি (server problem না করে) নাহলে রাত ১২টার সময় withdrew ক্লিয়ার করা হবে"
]

export default function JoinContestModal({
    children,
    visibility,
    setVisibility,
    navigation,
    matchInfo,
    action,

}) {
    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
    const [player3, setPlayer3] = useState('')
    const [player4, setPlayer4] = useState('')
    const [mode, setMode] = useState('Solo')

    const getModes = () => {
        console.log(matchInfo.type)
        if (matchInfo.type == 'solo') {
            return ['Solo']
        }
        if (matchInfo.type == 'duo') {
            return ['Solo', 'Duo']
        }
        if (matchInfo.type == 'squad') {
            return ['Solo', 'Duo', 'Squad']
        }
        return ['Solo']
    }

    const renderInputFormAccordingToMode = () => {
        if (mode == 'Solo') {
            return (
                <>
                    <Text style={{ marginBottom: 5 }}>Player 1</Text>
                    <TextInput
                        style={s.input}
                        value={player1}
                        onChangeText={(e) => {
                            setPlayer1(e)
                        }}
                        placeholder='Exact Name as in Game'
                    />
                </>
            )
        }
        if (mode == 'Duo') {
            return (
                <>
                    <Text style={{ marginBottom: 5 }}>Player 1</Text>
                    <TextInput
                        style={s.input}
                        value={player1}
                        onChangeText={(e) => {
                            setPlayer1(e)
                        }}
                        placeholder='Exact Game Name'
                    />
                    <Text style={{ marginVertical: 5 }}>Player 2</Text>
                    <TextInput
                        style={s.input}
                        value={player2}
                        onChangeText={(e) => {
                            setPlayer2(e)
                        }}
                        placeholder='Exact Game Name'
                    />
                </>
            )
        }
        if (mode == 'Squad') {
            return (
                <>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: "center", marginTop: 10 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ marginBottom: 5 }}>Player 1</Text>
                            <TextInput
                                style={[s.input]}
                                value={player1}
                                onChangeText={(e) => {
                                    setPlayer1(e)
                                }}
                                placeholder='Exact Game Name'
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ marginBottom: 5 }}>Player 2</Text>
                            <TextInput
                                style={[s.input]}
                                value={player2}
                                onChangeText={(e) => {
                                    setPlayer2(e)
                                }}
                                placeholder='Exact Game Name'
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', gap: 5, alignItems: "center", marginTop: 25 }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ marginBottom: 5 }}>Player 3</Text>
                            <TextInput
                                style={[s.input]}
                                value={player3}
                                onChangeText={(e) => {
                                    setPlayer3(e)
                                }}
                                placeholder='Exact Game Name'
                            />
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ marginBottom: 5 }}>Player 4</Text>
                            <TextInput
                                style={[s.input]}
                                value={player4}
                                onChangeText={(e) => {
                                    setPlayer4(e)
                                }}
                                placeholder='Exact Game Name'
                            />
                        </View>
                    </View>
                </>
            )
        }

    }


    const handleSendData = () => {
        const value = {}
        if (mode == 'Solo') {
            if (player1 == '') {
                Alert.alert("প্লেয়ারের নাম দিন, অথবা মোড সুইচ করুন ")
                return
            }
            value.player1 = player1
        }
        if (mode == 'Duo') {
            if (player1 == '' || player2 == '') {
                Alert.alert('সকল প্লেয়ারের নাম দিন, অথবা মোড সুইচ করুন ')
                return
            }
            value.player1 = player1
            value.player2 = player2
        }
        if (mode == 'Squad') {
            if (player1 == '' || player2 == '' || player3 == '' || player4 == '') {
                Alert.alert('সকল প্লেয়ারের নাম দিন, অথবা মোড সুইচ করুন ')
                return
            }
            value.player1 = player1
            value.player2 = player2
            value.player3 = player3
            value.player4 = player4
        }
        action(matchInfo, value, mode)
        // setVisibility(false)

    }

    const closeModal = () => {
        setVisibility(false)
    }

    return (
        <Modal transparent visible={visibility} animationType="fade" onRequestClose={closeModal} statusBarTranslucent={true} >
            <View style={[s.modalOuterContainer]}>
                <View style={s.modalContainer}>
                    <CHeaderWithBack
                        onPress={closeModal}
                        title="Join Tournament"
                        labelStyle={s.headerLabel}
                        // iconWrapColors={iconWrapColors}
                        containerStyle={s.headerContainerStyle}
                    />

                    <Text style={{ marginBottom: 5, color: colors.RED_NORMAL, textAlign: 'center' }}>You must have game id level more than 40!!</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginVertical: 10 }}>
                        {
                            getModes().map((type, index) => (
                                <TouchableOpacity key={index} style={{ flexDirection: 'row', alignSelf: 'flex-start' }} onPress={() => {
                                    setMode(type)
                                    setPlayer1('')
                                    setPlayer2('')
                                    setPlayer3('')
                                    setPlayer4('')
                                }}>
                                    <Text style={{ backgroundColor: mode == type ? colors.ICON_BG : colors.PRIM_BG, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, fontSize: 15, fontWeight: '700', color: mode == type ? colors.WHITE : colors.BLACK }}>{type}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {renderInputFormAccordingToMode()}

                    <CButtonInput label="JOIN" onPress={handleSendData} style={{ marginTop: 20 }} />

                    <Text style={{ textAlign: 'center', marginVertical: 10, fontSize: 16, color: 'red', borderBottomWidth: 1, paddingBottom: 5, borderBottomColor: 'red' }}>Important Notice!</Text>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {
                            notices.map((notice, index) => (
                                <View key={index} style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start', marginRight: 10 }}>
                                    <AlertIcon />
                                    <Text style={{ marginVertical: 5, fontSize: 12, textAlign: 'justify', marginRight: 10 }}>{notice} |</Text>
                                </View>
                            ))
                        }
                        {
                            moneyNotices.map((notice, index) => (
                                <View key={index} style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-start', marginRight: 10 }}>
                                    <MoneyIcon />
                                    <Text style={{ marginVertical: 5, fontSize: 12, textAlign: 'justify', marginRight: 10 }}>{notice} |</Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View >
        </Modal >
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
        width: '98%',
        height: '90%',
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
        height: 30,
        justifyContent: 'center',
        // flex: 1,
        minHeight: 50,
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
