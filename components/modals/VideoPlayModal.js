import React, { useState } from 'react'
import { Alert, Modal, StyleSheet, View } from 'react-native'
import CHeaderWithBack from '../common/CHeaderWithBack'
import colors from '../../assets/constants/colors'
// import YoutubePlayer from 'react-native-youtube-iframe';


export default function VideoPlayModal({
    videoID,
    visibility,
    setVisibility,
}) {

    const [play, setPlay] = useState(false)

    const closeModal = () => {
        setVisibility(false)
    }


    return (
        <Modal transparent visible={visibility} animationType="fade" onRequestClose={closeModal} statusBarTranslucent={true} >
            <View style={[s.modalOuterContainer]}>
                <View style={[s.modalContainer, { height: '33%' }]}>
                    <CHeaderWithBack
                        onPress={closeModal}
                        title="Watch Video"
                        labelStyle={s.headerLabel}
                        // iconWrapColors={iconWrapColors}
                        containerStyle={s.headerContainerStyle}
                    />

                    {/* <YoutubePlayer
                        height={600}
                        play={play}
                        videoId={videoID}
                    /> */}

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
        width: '90%',
        // height: '35%',
        // height: 500,
        alignItems: 'stretch',
        backgroundColor: colors.CONTAINER_BG,
        borderRadius: 20,
        paddingHorizontal: 10,
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
