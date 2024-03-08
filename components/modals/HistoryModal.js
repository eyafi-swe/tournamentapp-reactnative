import React, { useState } from 'react'
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import CButtonInput from '../common/CButtonInput'
import CHeaderWithBack from '../common/CHeaderWithBack'
import colors from '../../assets/constants/colors'
import CheckIcon from '../../assets/svg/CheckIcon'
import PendingIcon from '../../assets/svg/PendingIcon'


export default function HistoryModal({
  visibility,
  setVisibility,
  data,
  type
}) {


  const closeModal = () => {
    setVisibility(false)
  }


  const renderContent = (item) => {
    const renderedContentArr = [];
    let pending = false;

    if (!item.status && !item.cancelled) {
      pending = true;
    }

    for (const key in item) {
      if (Object.hasOwnProperty.call(item, key)) {
        const title = key == '_id' ? 'Order ID' : key == 'status' || key == 'cancelled' ? 'Status' : key.toUpperCase();
        const value = key == 'status' && item[key] ? 'Completed' : key == 'cancelled' && item[key] ? 'Cancelled' : item[key];
        renderedContentArr.push(
          <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderTopWidth: key == '_id' ? 0 : 0.5, borderTopColor: colors.SEC_BG }}>
            <Text>{title}</Text>
            <Text style={{ backgroundColor: value == 'Completed' ? colors.GREEN_NORMAL : value == 'Cancelled' ? colors.RED_NORMAL : null, color: colors.BLACK, padding: value == 'Completed' || value == 'Cancelled' ? 5 : 0, borderRadius: value == 'Completed' || value == 'Cancelled' ? 5 : 0 }}>{value}</Text>
          </View>

        );
      }
    }
    if (pending) {
      renderedContentArr.push(
        <View key={item._id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderTopWidth: 0.5, borderTopColor: colors.SEC_BG }}>
          <Text>Status</Text>
          <Text style={{ color: colors.BLACK, backgroundColor: colors.ICON_NORMAL, padding: 5, borderRadius: 5 }}>Pending</Text>
        </View>
      );
    }
    return renderedContentArr;
  }


  return (
    <Modal transparent visible={visibility} animationType="fade" onRequestClose={closeModal} >
      <View style={[s.modalOuterContainer]}>
        <View style={[s.modalContainer,]}>
          <CHeaderWithBack
            onPress={closeModal}
            title={type == 'order' ? 'Order History' : 'Withdraw History'}
            labelStyle={s.headerLabel}
            // iconWrapColors={iconWrapColors}
            containerStyle={s.headerContainerStyle}
          />

          <FlatList
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <View key={index} style={{ marginTop: index == 0 ? 0 : 16, backgroundColor: colors.WHITE, padding: 10, borderRadius: 10 }}>
                  {renderContent(item)}
                </View>
              )
            }}
            style={{ flex: 1, width: '100%' }}
            showsVerticalScrollIndicator={false}
          />

        </View>
      </View>
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
    width: '95%',
    height: '95%',
    alignItems: 'stretch',
    backgroundColor: colors.MODAL_BG,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,

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
    borderBottomColor: colors.SEC_BG,
    paddingVertical: 8,
  },
  settingsItemText: {
    fontFamily: 'inter-regular',
    color: colors.BLACK,
    fontSize: 12,
  },
})
