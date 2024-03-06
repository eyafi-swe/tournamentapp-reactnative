import { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import g from '../../assets/styles/global'
import colors from '../../assets/constants/colors'
import { AuthContext } from '../../context/UserContext'
import NotificationIcon from '../../assets/svg/NotificationIcon'
import Carousel from 'react-native-anchor-carousel';
import MicIcon from '../../assets/svg/MicIcon'
import { BASE_URL } from '../../utils/constants'
import Header from '../../components/sections/Header'

const data = [
  { id: 1, title: 'Item 1', uri: 'https://static.vecteezy.com/system/resources/thumbnails/022/192/222/small/hooded-masked-actor-young-fantastic-ai-photo.jpg' },
  { id: 2, title: 'Item 2', uri: 'https://c4.wallpaperflare.com/wallpaper/984/871/802/call-of-duty-call-of-duty-modern-warfare-2-video-game-characters-video-games-farah-hd-wallpaper-preview.jpg' },
  { id: 3, title: 'Item 3', uri: 'https://staticg.sportskeeda.com/editor/2023/11/ec57f-16992610745479-1920.jpg?w=840' },
  { id: 4, title: 'Item 4', uri: 'https://wallpapers.com/images/featured/gaming-banner-3noktxpgfhhbf47h.jpg' },
]

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false)

  const [announcementLoading, setAnnouncementLoading] = useState(false)
  const [contestsLoading, setContestsLoading] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [contests, setContests] = useState([])
  const { user, fetchUser, fetchNews, news } = useContext(AuthContext)
  const { width: windowWidth } = Dimensions.get('window');
  const carouselRef = useRef(null);



  useEffect(() => {
    console.log('home', user?.email)
    fetchUser(user?.email)
    // fetchNews()
  }, [])


  useEffect(() => {
    setAnnouncementLoading(true)
    fetch(`${BASE_URL}/announcement`)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        if (json.length > 0) {
          setAnnouncement(json[0].announcement)
        }
        else {
          setAnnouncement('No announcement')
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setAnnouncementLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true)
    fetch(`${BASE_URL}/contests`)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        setContests(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);


  const RenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ width: windowWidth * 0.8, height: 150, backgroundColor: colors.BLACK, borderRadius: 8, }}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}>
        <Image source={{ uri: item.uri }} style={{ width: windowWidth * 0.8, height: 150, backgroundColor: colors.BLACK, borderRadius: 8 }} />

      </TouchableOpacity>
    );
  }


  if (!loading) {
    return (
      <SafeAreaView style={s.containerBG}>
        <StatusBar hidden={true} />

        <View style={[s.outerPadding]}>
          <Header navigation={navigation} newsCount={news.length} />
          <ScrollView style={{ flex: 1, }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 20, backgroundColor: colors.INPUT_BG, marginBottom: 20, paddingHorizontal: 5, borderRadius: 10 }}>
              <View style={{ paddingVertical: 10, paddingRight: 5, borderRightWidth: 1.5, borderRightColor: colors.COMPLETED_BG }}>
                <MicIcon />
              </View>
              <View style={{ paddingHorizontal: 5, width: '80%', paddingVertical: 10 }}>
                <Text style={{ fontWeight: '700', textAlign: 'center' }}>
                  {announcementLoading ? '...' : announcement}
                </Text>
              </View>
            </View>
            <View style={{}}>
              <Carousel
                ref={carouselRef}
                data={data}
                renderItem={RenderItem}
                style={s.carousel}
                itemWidth={windowWidth * 0.8}
                containerWidth={windowWidth}
                separatorWidth={0}
              />
            </View>


            <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
              <Text style={s.header}>Starting Really Soon</Text>

              <View style={s.startingViewTop}>
                <Text style={{ color: colors.WHITE }}>FREE FIRE TOURNAMENT</Text>
                <Text style={{ color: colors.RED_NORMAL }}> <View style={s.dot} /> SOLO <View style={s.dot} />TPP <View style={s.dot} />BERMUDA</Text>
              </View>

              <View style={s.startingView}>
                <View style={{ flex: 1 }}>
                  <Image source={{ uri: 'https://picfiles.alphacoders.com/213/213735.jpg' }} style={s.freefireImage} />
                </View>

                <View style={{ flexDirection: 'col', alignItems: 'center', justifyContent: 'space-around', }}>
                  <View style={{ alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontSize: 12, color: colors.ICON_BG }}>PER KILL</Text>
                    <Text style={{ fontSize: 18, color: colors.ICON_BG }}>BDT 10</Text>
                  </View>

                  <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 5, gap: 3, backgroundColor: colors.BTN_BG, paddingHorizontal: 12, borderRadius: 5, }}
                    onPress={() => navigation.navigate('ContestDetails', { item: contests.find(x => x.title == 'Starting Soon') })}
                  >
                    <Text style={{ color: colors.RED_NORMAL, textAlign: 'center', fontWeight: '700' }}>JOIN</Text>
                    <Text style={{ color: colors.RED_NORMAL, textAlign: 'center', fontWeight: '700' }}>20/- </Text>
                  </TouchableOpacity>


                </View>
              </View>
            </View>


            <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
              <Text style={s.headerTwo}>Tournaments</Text>
              <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {
                  contests.length == 0 ? <Text style={{ color: colors.WHITE, textAlign: 'center', width: '100%' }}>No tournaments</Text> :
                    contests.map((item, index) => {
                      return (
                        <TouchableOpacity key={index} style={{ backgroundColor: colors.Box, borderRadius: 8, marginBottom: 10, width: '33%', paddingBottom: 5 }}
                          onPress={() => navigation.navigate('ContestDetails', { item: item })}
                        >
                          <Image source={{ uri: item.uri }} style={{ height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginBottom: 2 }} />
                          <Text style={{ color: colors.WHITE, paddingHorizontal: 5, fontWeight: '600', fontSize: 13, textAlign: 'center' }}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    })
                }
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
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

  dot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: colors.GREEN_NORMAL
  },

  freefireImage: {
    width: "80%",
    height: 100,
    borderRadius: 8,
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
    backgroundColor: colors.TOP_BOTTOM_BG,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },


  outerPadding: {
    // paddingHorizontal: 16,
    flex: 1,
    paddingBottom: 72,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.TOP_BOTTOM_BG,
    marginBottom: 24,
    // marginTop: 50,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    textAlign: 'center',
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

export default Home
