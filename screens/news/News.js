import { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import g from '../../assets/styles/global'
import colors from '../../assets/constants/colors'
import NotificationIcon from '../../assets/svg/NotificationIcon'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'
import { AuthContext } from '../../context/UserContext'
import CRefreshButton from '../../components/common/CRefreshButton'
import Header from '../../components/sections/Header'



const NewsScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const { news, fetchNews, newsLoading } = useContext(AuthContext)

    const isfocused = useIsFocused()


    useEffect(() => {
        if (isfocused) {
            fetchNews()
        }
    }, [isfocused])


    const NewsCard = ({ item }) => {

        return (
            <View style={{ backgroundColor: colors.WHITE, marginBottom: 20, borderRadius: 8, padding: 8 }}>

                <Text style={{ fontSize: 16, fontWeight: '600' }} >{item?.text}</Text>

            </View>
        )
    }



    if (!loading) {
        return (
            <SafeAreaView style={s.containerBG}>

                <View style={[s.outerPadding]}>
                    <Header />

                    <View style={{}}>
                        {newsLoading && <ActivityIndicator size="large" color={colors.WHITE} />}

                        {
                            news.length > 0 ? (
                                <FlatList
                                    data={news}
                                    renderItem={NewsCard}
                                    keyExtractor={item => item._id}
                                    showsVerticalScrollIndicator={false}
                                />)
                                :
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <Text style={{ color: colors.WHITE, fontSize: 16 }}>No News Found</Text>
                                </View>

                        }

                    </View>
                    <CRefreshButton onPress={() => {
                        fetchNews()
                    }} />
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
        backgroundColor: colors.BLACK,
        // paddingHorizontal: 16,

    },

    actionList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.INPUT_BG
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

export default NewsScreen

