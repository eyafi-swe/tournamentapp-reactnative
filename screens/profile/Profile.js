import { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import g from '../../assets/styles/global'
import colors from '../../assets/constants/colors'
import CButtonInput from '../../components/common/CButtonInput'
import { AuthContext } from '../../context/UserContext'
import BigProfileIcon from '../../assets/svg/BigProfileIcon'
import { profileItems } from '../../assets/constants/profile'
import RightAngularBrace from '../../assets/svg/RightAngularBrace'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'
import HistoryModal from '../../components/modals/HistoryModal'
import { BASE_URL } from '../../utils/constants'

const Profile = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { user, onGoogleButtonPress, logOut } = useContext(AuthContext)
    const [balance, setBalance] = useState(0)
    const [matchPlayed, setMatchPlayed] = useState(0)
    const [totalElimination, setTotalElimination] = useState(0)
    const [totalEarned, setTotalEarned] = useState(0)
    const [showHistoryModal, setShowHistoryModal] = useState(false)
    const [showWithdrawHistoryModal, setShowWithdrawHistoryModal] = useState(false)
    const [orderHistory, setOrderHistory] = useState([])
    const [withdrawHistory, setWithdrawHistory] = useState([])
    const isfocused = useIsFocused()

    useEffect(() => {
        const getUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user')
                const user = jsonValue != null ? JSON.parse(jsonValue) : null;
                console.log('user', user)
                setBalance(user.wallet)
                setMatchPlayed(user.matchPlayed)
                setTotalElimination(user.totalkill)
                setTotalEarned(user.totalEarned)
            } catch (e) {
                console.log(e)
            }
        }
        getUser()
    }, [isfocused])


    const fetchDiamondOrderList = async () => {
        return fetch(`${BASE_URL}/diamondorder/${user?.email}`)
    }

    const fetchWithdrawOrderList = async () => {
        return fetch(`${BASE_URL}/withdraw/${user?.email}`)
    }

    useEffect(() => {
        Promise.all([fetchDiamondOrderList(), fetchWithdrawOrderList()])
            .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([data1, data2]) => {
                // console.log(data1, data2)
                setOrderHistory(data1)
                setWithdrawHistory(data2)
            })
            .catch(err => {
                console.log(err)
            })
    }, [isfocused])


    const handleLogout = async () => {

        try {
            logOut()
                .then((res) => {
                    console.log(res)
                    // navigation.navigate('SignIn')
                }
                )
                .catch((err) => {
                    console.log('here', err)
                })
        } catch (error) {
            console.log('ekhane', error)
        }
    }
    if (!loading) {
        return (
            <View style={s.container}>


                <HistoryModal
                    visibility={showHistoryModal || showWithdrawHistoryModal}
                    setVisibility={showHistoryModal ? setShowHistoryModal : setShowWithdrawHistoryModal}
                    data={showHistoryModal ? orderHistory : withdrawHistory}
                    type={showHistoryModal ? 'order' : 'withdraw'}
                />




                <View style={{ borderWidth: 1, borderColor: colors.BTN_BG, width: 80, height: 80, borderRadius: 40, justifyContent: "center", alignItems: 'center' }}>
                    <BigProfileIcon />
                </View>
                <Text style={s.header}>What's up {user.displayName ? user.displayName : 'Gamer'}</Text>
                <Text style={[s.header, { marginTop: 0 }]}>{user.email}</Text>
                <Text style={s.subHeader}>Play Game And Earn</Text>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: colors.WHITE, fontSize: 20, fontWeight: '700' }}>BDT {balance}</Text>
                    <Text style={{ color: colors.WHITE, fontSize: 16 }}>Available Balance</Text>
                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={s.statNum}>{matchPlayed}</Text>
                        <Text style={s.statText}>Match Played</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={s.statNum}>{totalElimination}</Text>
                        <Text style={s.statText}>Total Kills</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={s.statNum}>{totalEarned}</Text>
                        <Text style={s.statText}>Earned</Text>
                    </View>

                </View>

                {/* <CButtonInput onPress={() => setShowHistoryModal(true)} label='Order History' style={{ width: '100%', marginTop: 40, backgroundColor: colors.NORMAL }} /> */}
                <View style={{ width: '100%', position: "absolute", bottom: 100 }}>
                    <CButtonInput onPress={() => setShowWithdrawHistoryModal(true)} label='Withdraw History' style={{ width: '100%', marginTop: 20, backgroundColor: colors.MID_BG, borderWidth: 1, borderColor: colors.BTN_BG }} />
                    <CButtonInput onPress={handleLogout} label='Exit App' style={{ width: '100%', marginTop: 20, }} />
                </View>


            </View>
        )
    }
    return (
        <View style={[g.container, s.container]}>
            <ActivityIndicator size="large" color={colors.WHITE} />
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        backgroundColor: colors.MID_BG,
        padding: 23,
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        paddingTop: 100,
        // paddingBottom: 200,
        position: 'relative',
        // borderWidth: 1,
        borderColor: colors.WHITE,
        // justifyContent: 'space-between',
    },
    header: {
        color: colors.WHITE,
        fontSize: 16,
        fontFamily: 'inter-bold',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 10,
        // borderColor: colors.WHITE,
        // borderWidth: 1,

    },
    title: {
        marginBottom: 32,
    },
    subHeader: {
        color: colors.WHITE,
        marginBottom: 16,
        marginTop: 5,
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
    statNum: {
        color: colors.WHITE,
        fontSize: 20,
    },
    statText: {
        color: colors.WHITE,
        fontSize: 16,
    }

})

export default Profile
