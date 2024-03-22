import { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import g from '../../assets/styles/global'
import colors from '../../assets/constants/colors'
import { AuthContext } from '../../context/UserContext'
import CHeaderWithBack from '../../components/common/CHeaderWithBack'
import JoinContestModal from '../../components/modals/JoinContestModal'
import PrizePoleModal from '../../components/modals/PrizePoleModal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import CRefreshButton from '../../components/common/CRefreshButton'
import { BASE_URL_DEMO, BASE_URL } from '../../utils/constants'


const data = [
    { id: 1, title: 'Contest 1', joinFee: 100, prize: 1000, date: '27 - 05 - 2023', time: '10:00 AM', type: 'Solo', joined: [] },

]


const ContestDetails = ({ navigation, route }) => {
    const { item } = route.params
    const [loading, setLoading] = useState(false)
    const { user, updateUserInfo, onGoogleButtonPress, logOut } = useContext(AuthContext)
    const [activeScreen, setActiveScreen] = useState('contest')
    const [openJoinModal, setOpenJoinModal] = useState(false)
    const [matchInfo, setMatchInfo] = useState({})
    const [openPrizePoleModal, setOpenPrizePoleModal] = useState(false)
    const [prizePoleInfo, setPrizePoleInfo] = useState({})
    const [contestData, setContestData] = useState([])
    const [contestsLoading, setContestsLoading] = useState(false)
    const [refetchList, setRefetchList] = useState(false)
    const [resultData, setResultData] = useState([])
    const [refetchResultList, setRefetchResultList] = useState(false)
    const [resultLoading, setResultLoading] = useState(false)
    const isFocused = useIsFocused()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const getUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user')
                const user = jsonValue != null ? JSON.parse(jsonValue) : null;
                setUserData(user)
            } catch (e) {
                console.log(e)
            }
        }
        getUser()
    }, [isFocused])

    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        setContestsLoading(true)
        fetch(`${BASE_URL}/contests/matches/${item._id}`)
            .then(res => res.json())
            .then(data => {
                setContestData(data)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setContestsLoading(false)
            })
    }, [refetchList])

    useEffect(() => {
        if (userData?.email) {

            setResultLoading(true)
            fetch(`${BASE_URL}/contestResult/${userData?.email}`)
                .then(res => res.json())
                .then(data => {
                    setResultData(data)
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
                .finally(() => {
                    setResultLoading(false)
                })
        }
    }, [refetchResultList, userData])


    const handleJoin = async (item, players, mode) => {
        let userInfo = await AsyncStorage.getItem('user')
        userInfo = JSON.parse(userInfo)
        console.log(item._id, players, user.email)
        const body = {
            user_email: user.email,
            game_uid: players,
        }

        let joinFee = 0;
        if (mode == 'Solo') {
            joinFee = +item.joinFee
        }
        else if (mode == 'Duo') {
            joinFee = +item.joinFee * 2
        }
        else if (mode == 'Squad') {
            joinFee = +item.joinFee * 4
        }


        if (userInfo.wallet < joinFee) {
            Alert.alert('Insufficient Balance!')
            return
        }

        fetch(`${BASE_URL}/contests/join/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Alert.alert('Joined Successfully!')
                    updateUserInfo(joinFee)
                } else {
                    Alert.alert(data.message)
                }
                // console.log(data)
            })
            .catch(err => {
                console.log(err)
                Alert.alert('Something went wrong!')
            })
            .finally(() => {
                setRefetchList(!refetchList)
                setOpenJoinModal(false)
            })
    }

    const countPlayersInJoinedObject = (joinedObject) => {
        const gameUid = joinedObject.game_uid;
        return Object.keys(gameUid).length;
    }
    const ContestCard = ({ item }) => {
        let isJoined = item?.joined?.find(e => e.user_email === user.email)
        let totalJoined = 0;
        if (item?.joined) {
            item.joined.forEach(joinedObject => {
                totalJoined += countPlayersInJoinedObject(joinedObject);
            });
        }
        return (
            <View style={{ backgroundColor: colors.CARD_BG, marginBottom: 20, borderRadius: 8, padding: 8 }}>
                <View>
                    <View style={{ flexDirection: 'row' }}>

                        <Image source={{ uri: 'https://staticg.sportskeeda.com/editor/2023/11/ec57f-16992610745479-1920.jpg?w=840' }} style={{ height: 50, width: 50, borderRadius: 8 }} />
                        <View>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600', color: colors.WHITE }}>{item.title}</Text>
                            <Text style={{ fontSize: 15, color: colors.ICON_NORMAL, marginLeft: 10 }}>{item.date} at {item.time}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.SEC_BG, marginLeft: 10 }}>JOIN FEE</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600', color: colors.ICON_NORMAL }} >৳{item.joinFee}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.SEC_BG, marginLeft: 10 }}>TOTAL PRIZE</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600', color: colors.ICON_NORMAL }}>৳{item.prize}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.SEC_BG, marginLeft: 10 }}>PER KILL</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600', color: colors.ICON_NORMAL }}>৳{item.per_kill}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.SEC_BG, marginLeft: 10 }}>TYPE</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600', color: colors.ICON_NORMAL }} >{item.type}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.SEC_BG, marginLeft: 10 }}>MAP</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600', color: colors.ICON_NORMAL }}>{item.map}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.SEC_BG, marginLeft: 10 }}>PER KILL</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600', color: colors.ICON_NORMAL }}>৳{item.per_kill}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, color: "#e9ecef", fontWeight: '700' }}>Slots Left: {item?.slot - totalJoined}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setPrizePoleInfo(item?.prize_pole)
                                    setOpenPrizePoleModal(true)
                                }}
                            >
                                <Text style={{ fontSize: 16, fontWeight: '700', borderWidth: 1, padding: 2, borderRadius: 5, borderColor: "#f8f9fa", backgroundColor: '#f8f9fa', color: colors.GREEN_NORMAL }}>See Prize Pole</Text>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, color: "#e9ecef", fontWeight: '700' }}>{totalJoined}/{item?.slot}</Text>
                        </View>
                        {
                            totalJoined >= item?.slot ?
                                <View style={{ backgroundColor: colors.RED_NORMAL, padding: 10, borderRadius: 8, marginTop: 10 }} >
                                    <Text style={{ fontSize: 14, color: colors.WHITE, textAlign: 'center', fontWeight: '700' }}>Slot Full</Text>
                                </View>
                                :
                                <TouchableOpacity style={{ backgroundColor: isJoined ? colors.PRIM_CAPTION : colors.BTN_BG, padding: 10, borderRadius: 8, marginTop: 10 }}
                                    onPress={() => {
                                        setMatchInfo(item)
                                        if (isJoined) return
                                        setOpenJoinModal(true)
                                    }}
                                >
                                    {
                                        isJoined ?
                                            <Text style={{ fontSize: 14, color: colors.WHITE, textAlign: 'center', fontWeight: '700' }}>{(item?.roomId && item?.passcode) ? `Room ID:${item?.roomId} | Passcode: ${item?.passcode}` : 'ROOM ID & PASSSCODE COMING'}</Text>
                                            :
                                            <Text style={{ fontSize: 14, color: colors.WHITE, textAlign: 'center', fontWeight: '700' }}>JOIN NOW</Text>
                                    }

                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        )
    }

    const ResultCard = ({ item }) => {

        return (
            <View style={{ backgroundColor: colors.WHITE, marginBottom: 20, borderRadius: 8, padding: 8 }}>
                <View>
                    <View style={{ flexDirection: 'row' }}>

                        <Image source={{ uri: 'https://wallpaperaccess.com/full/3884234.jpg' }} style={{ height: 50, width: 50, borderRadius: 8 }} />
                        <View>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600' }}>{item?.matchTitle} </Text>
                            <Text style={{ fontSize: 15, color: colors.PRIM_CAPTION, marginLeft: 10 }}>{item?.matchDate} at {item?.matchTime}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.PRIM_CAPTION, marginLeft: 10 }}>Position</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600' }} >{item?.position}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.PRIM_CAPTION, marginLeft: 10 }}>Kills</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600' }}>{item?.kills}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 15, color: colors.PRIM_CAPTION, marginLeft: 10 }}>Reward</Text>
                            <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: '600' }}>৳{item?.rewardMoney}</Text>
                        </View>
                    </View>

                </View>
            </View>
        )
    }

    if (!loading) {
        return (

            <SafeAreaView style={s.containerBG}>
                <JoinContestModal
                    visibility={openJoinModal}
                    setVisibility={setOpenJoinModal}
                    matchInfo={matchInfo}
                    action={handleJoin}
                />
                <PrizePoleModal
                    visibility={openPrizePoleModal}
                    setVisibility={setOpenPrizePoleModal}
                    info={prizePoleInfo}
                />

                <StatusBar hidden={true} />
                <View style={[s.outerPadding]}>
                    <View style={s.headerContainer}>
                        <CHeaderWithBack
                            onPress={goBack}
                            title={item.title}
                            labelStyle={s.headerLabel}
                            // iconWrapColors={iconWrapColors}
                            containerStyle={s.headerContainerStyle}
                        />
                    </View>

                    <View style={[g.containerBetween, s.subscriptionPickerContainer]}>

                        <TouchableOpacity
                            style={[
                                s.paymentPickerButton,
                                activeScreen == 'contest' ? s.subscriptionPickerButton : null,
                            ]}
                            onPress={() => {
                                setActiveScreen('contest')
                            }}
                        >
                            <Text
                                style={[
                                    s.subscriptionPickerButtonText,
                                    activeScreen == 'contest' ? s.subscriptionPickerButtonTextActive : null,
                                ]}
                            >
                                Matches
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={[
                                s.paymentPickerButton,
                                activeScreen == 'result' ? s.subscriptionPickerButton : null,
                            ]}
                            onPress={() => {
                                setActiveScreen('result')
                            }}
                        >
                            <Text
                                style={[
                                    s.subscriptionPickerButtonText,
                                    activeScreen == 'result' ? s.subscriptionPickerButtonTextActive : null,
                                ]}
                            >
                                Result
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10, flex: 1 }}>
                        {
                            (activeScreen == 'live') && <Text style={{ textAlign: 'center', color: colors.WHITE, fontSize: 16 }}>Comming Soon!!</Text>
                        }
                        {(resultLoading && !contestsLoading) && <ActivityIndicator size="large" color={colors.WHITE} />}
                        {

                            activeScreen == 'result' &&
                            <FlatList
                                data={resultData}
                                renderItem={ResultCard}
                                keyExtractor={item => item._id}
                                showsVerticalScrollIndicator={false}
                            />

                        }
                        {contestsLoading && <ActivityIndicator size="large" color={colors.WHITE} />}

                        {contestData.length == 0 && !contestsLoading && activeScreen == 'contest' && <Text style={{ textAlign: 'center', color: colors.WHITE, fontSize: 16 }}>No Matches Found!!</Text>}

                        {
                            activeScreen == 'contest' &&

                            <FlatList
                                data={contestData}
                                renderItem={ContestCard}
                                keyExtractor={item => item._id}
                                showsVerticalScrollIndicator={false}
                            />
                        }
                    </View>
                    <CRefreshButton onPress={() => {
                        if (activeScreen == 'contest') setRefetchList(!refetchList)
                        if (activeScreen == 'result') setRefetchResultList(!refetchResultList)
                    }} />
                </View>
            </SafeAreaView>

        )
    }
    return (
        <View style={[s.containerBG]}>
            <ActivityIndicator size="large" color={colors.ICON_BG} />
        </View>
    )
}

const s = StyleSheet.create({
    containerBG: {
        flex: 1,
        backgroundColor: colors.MID_BG,
        // paddingHorizontal: 16,

    },
    paymentPickerButton: {
        width: '49%',
        borderRadius: 10,
        backgroundColor: colors.WHITE,
        paddingVertical: 8,
    },
    subscriptionPickerContainer: {
        marginBottom: 20,
        // marginTop: 10,
        borderRadius: 20,
        // backgroundColor: colors.WHITE,
    },
    subscriptionPickerButton: {
        backgroundColor: colors.ICON_BG,
    },
    subscriptionPickerButtonText: {
        color: colors.BLACK,
        fontFamily: 'inter-regular',
        fontSize: 14,
        textAlign: 'center',
    },
    subscriptionPickerButtonTextActive: {
        color: colors.WHITE,
        // fontWeight: 'bold',
    },
    headerContainerStyle: {
        // marginVertical: 8,
        marginTop: 8,
    },
    headerLabel: {
        fontSize: 18,
        fontWeight: 'normal',
        // marginLeft: 8,
        color: colors.WHITE,
        width: '80%',
        textAlign: 'center'

    },

    outerPadding: {
        // paddingHorizontal: 16,
        flex: 1,
        paddingBottom: 72,
        paddingHorizontal: 20
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        // marginTop: 40,
        // paddingHorizontal: 16,
        // borderWidth: 1,
        borderColor: colors.WHITE,

    },

    container: {
        backgroundColor: colors.WHITE,
        padding: 23,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // height: '100%',
        // borderWidth: 1,
        // borderColor: 'White',
        // marginVertical: 5,
        flex: 1,
        // top: 0,
        // left: 0,

        // position: 'relative',
    },


})

export default ContestDetails
