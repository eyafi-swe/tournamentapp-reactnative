import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import g from '../../assets/styles/global'
import colors from '../../assets/constants/colors'
import { AuthContext } from '../../context/UserContext'
import NotificationIcon from '../../assets/svg/NotificationIcon'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'
import PlusIcon from '../../assets/svg/PlusIcon'
import DollarIcon from '../../assets/svg/DollarIcon'
import VideoIcon from '../../assets/svg/VideoIcon'
import AddMoneyModal from '../../components/modals/AddMoneyModal'
import WithdrawMoneyModal from '../../components/modals/WithdrawMoneyModal'
import VideoPlayModal from '../../components/modals/VideoPlayModal'
import { BASE_URL, BASE_URL_DEMO } from '../../utils/constants'
import Header from '../../components/sections/Header'


const WalletScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user, updateUserInfo, updateAsyncStorage, fetchUser, news } = useContext(AuthContext)
    const [balance, setBalance] = useState(0)
    const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false)
    const [openWithdrawMoneyModal, setOpenWithdrawMoneyModal] = useState(false)
    const [userData, setUserData] = useState(null)
    const [openVideoModal, setOpenVideoModal] = useState(false)
    const [videoID, setVideoID] = useState(null)
    const [tutorials, setTutorials] = useState({})
    const [refetch, setRefetch] = useState(false)

    const isfocused = useIsFocused()

    useEffect(() => {
        fetch(`${BASE_URL}/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                AsyncStorage.setItem('user', JSON.stringify(data))
                // setUserInfo(data)
                setBalance(data.wallet)
                setUserData(data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                console.log('finally')
            })

    }, [isfocused, refetch])



    const handleWithdrawMoney = (accountType, accountNumber, amount) => {
        const body = {
            accountType,
            accountNumber,
            amount,
            user: user.email
        }
        fetch(`${BASE_URL}/withdraw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Alert.alert('Success', 'Withdraw request sent successfully. You will get your money within 24 hours.')
                    updateAsyncStorage(data.wallet)
                    setRefetch(!refetch)
                }
                else {
                    Alert.alert('Error', 'Something went wrong. Please try again.')
                }
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetch(`${BASE_URL_DEMO}/tutorial`)
            .then(res => res.json())
            .then(data => {
                const tutorialLinks = data[0]
                const addMoney = tutorialLinks.addMoney.split('v=')[1]
                const joinMacth = tutorialLinks.joinMatch.split('v=')[1]
                const withdrawMoney = tutorialLinks.withdrawMoney.split('v=')[1]
                setTutorials({
                    addMoney,
                    joinMacth,
                    withdrawMoney
                })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])




    if (!loading) {
        return (
            <SafeAreaView style={s.containerBG}>
                <AddMoneyModal
                    visibility={openAddMoneyModal}
                    setVisibility={setOpenAddMoneyModal}
                    user={userData}
                    navigation={navigation}
                />

                <VideoPlayModal
                    visibility={openVideoModal}
                    setVisibility={setOpenVideoModal}
                    videoID={videoID}
                />

                <WithdrawMoneyModal
                    visibility={openWithdrawMoneyModal}
                    setVisibility={setOpenWithdrawMoneyModal}
                    balance={balance}
                    action={handleWithdrawMoney}
                />

                <View style={[s.outerPadding]}>
                    <Header navigation={navigation} newsCount={news.length} />

                    <View style={{}}>
                        <View style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: 10, backgroundColor: balance ? colors.Has_Cash_BG : colors.Zero_Cash_BG, borderRadius: 10 }}>
                            {/* <Text style={{ color: colors.WHITE, fontSize: 16, fontWeight: 'bold' }}>My Wallet</Text> */}
                            <Text style={{ color: colors.WHITE, fontSize: 18, fontWeight: 'bold' }}>Your Balance</Text>
                            <Text style={{ color: colors.WHITE, fontSize: 18, fontWeight: 'bold' }}>{balance} BDT</Text>
                        </View>

                        <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
                            <View style={s.actionList}>
                                <Text style={s.actionText}>Add Balance</Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.BTN_BG, padding: 5, borderRadius: 5, paddingHorizontal: 10 }}
                                    onPress={() => setOpenAddMoneyModal(true)}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <PlusIcon />
                                        <Text style={{ color: colors.WHITE, fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Add Money</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={s.actionList}>
                                <Text style={s.actionText}>Withdraw Money</Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.BTN_BG, padding: 7, borderRadius: 5, paddingHorizontal: 15 }}
                                    onPress={() => {
                                        setOpenWithdrawMoneyModal(true)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <DollarIcon />
                                        <Text style={{ color: colors.WHITE, fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Withdraw</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={s.actionList}>
                                <Text style={s.actionText}>How To Join Match</Text>
                                <TouchableOpacity

                                    style={{ backgroundColor: colors.BTN_BG, padding: 7, borderRadius: 5, paddingHorizontal: 10 }}

                                    onPress={() => {

                                        setVideoID(tutorials.joinMacth)
                                        setOpenVideoModal(true)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <VideoIcon />
                                        <Text style={{ color: colors.WHITE, fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Video</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={s.actionList}>
                                <Text style={s.actionText}>How To Add Money</Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.BTN_BG, padding: 7, borderRadius: 5, paddingHorizontal: 10 }}
                                    onPress={() => {

                                        setVideoID(tutorials.addMoney)
                                        setOpenVideoModal(true)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <VideoIcon />
                                        <Text style={{ color: colors.WHITE, fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Video</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={s.actionList}>
                                <Text style={s.actionText}>How To Withdraw Money</Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: colors.BTN_BG, padding: 7, borderRadius: 5, paddingHorizontal: 10 }}
                                    onPress={() => {

                                        setVideoID(tutorials.withdrawMoney)
                                        setOpenVideoModal(true)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <VideoIcon />
                                        <Text style={{ color: colors.WHITE, fontSize: 12, fontWeight: 'bold', marginLeft: 5 }}>Video</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView >
        )
    }
    return (
        <View style={[g.container, s.container]}>
            <ActivityIndicator size="large" color={colors.WHITE} />
        </View>
    )
}

const s = StyleSheet.create({
    containerBG: {
        flex: 1,
        backgroundColor: colors.MID_BG,
        // paddingHorizontal: 16,

    },

    actionList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
        elevation: 5,
        borderBottomWidth: 1,
        backgroundColor: "#003049",
    },

    actionText: {
        color: colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold'
    },

    dot: {
        height: 5,
        width: 5,
        borderRadius: 5,
        backgroundColor: colors.RED_NORMAL
    },

    freefireImage: {
        width: 130,
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        // top: 10,

    },

    startingViewTop: {
        backgroundColor: colors.STROKE_COLOR,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    startingView: {
        // marginTop: 20,
        height: 150,
        width: '100%',
        backgroundColor: colors.INPUT_BG,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,

    },


    outerPadding: {
        // paddingHorizontal: 16,
        flex: 1,
        paddingBottom: 72,
        // paddingHorizontal: 20
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        // marginTop: 50,
        // paddingHorizontal: 16,
        // borderWidth: 1,
        borderColor: colors.WHITE,

    },
    carousel: {
        flexGrow: 0,
        height: 150,
        // paddingHorizontal: 16,
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
    header: {
        color: colors.WHITE,
        fontSize: 22,
        fontFamily: 'inter-bold',
        fontWeight: '700',
        textAlign: 'center',
        // marginTop: 32,

    },
    headerTwo: {
        color: colors.WHITE,
        fontSize: 22,
        fontFamily: 'inter-bold',
        fontWeight: '700',
        textAlign: 'left',
        // marginTop: 32,

    },
    title: {
        marginBottom: 32,
    },
    subHeader: {
        color: colors.WHITE,
        marginVertical: 16,
        fontFamily: 'inter-regular',
        fontWeight: '500',
    },
    input: {
        maxHeight: 64,
        color: colors.WHITE,
    },
    termsText: {
        marginLeft: 8,
    },
    terms: {
        alignSelf: 'flex-start',
        marginBottom: 32,
    },
    btnText: {
        color: colors.WHITE,
    },
})

export default WalletScreen
