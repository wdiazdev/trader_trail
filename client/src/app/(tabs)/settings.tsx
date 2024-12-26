import React, { useState } from "react"
import { Switch, TouchableOpacity, View } from "react-native"
import Container from "@/src/components/Container"
import { useAppContext } from "@/src/store/storeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { shadowStyles } from "@/src/helpers/shadowStyles"
import useColorScheme from "@/src/hooks/useColorScheme"
import { COLORS } from "@/src/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import Text from "@/src/components/Text"
import CustomAlert from "@/src/components/AlertModal"

export default function Settings() {
  const { dispatch } = useAppContext()
  const colorScheme = useColorScheme()

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false)
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false)

  const toggleSwitch = () => setIsSwitchEnabled((previousState) => !previousState)

  const handleLogOut = async () => {
    dispatch({
      type: "change_store",
      payload: {
        user: null,
      },
    })
    await AsyncStorage.removeItem("token")
  }

  const handleModalVisible = () => {
    setDeleteAccountModalVisible((previousState) => !previousState)
  }

  return (
    <Container>
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <View style={{ gap: 12 }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>App</Text>
            <View
              style={{
                flexDirection: "column",
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLORS[colorScheme].secondaryBackground,
                ...shadowStyles(colorScheme),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                }}
              >
                <Text>Dark Mode</Text>
                <Switch
                  thumbColor={isSwitchEnabled ? COLORS[colorScheme].icon : "#3E3E3E"}
                  ios_backgroundColor="#3E3E3E"
                  onValueChange={toggleSwitch}
                  value={isSwitchEnabled}
                />
              </View>
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={{ fontWeight: "bold" }}>Account</Text>
            <View
              style={{
                flexDirection: "column",
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLORS[colorScheme].secondaryBackground,
                ...shadowStyles(colorScheme),
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                }}
                onPress={handleModalVisible}
              >
                <Text>Delete Account</Text>
                <Ionicons name="chevron-forward" size={22} color={COLORS[colorScheme].text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 8,
                }}
                onPress={handleLogOut}
              >
                <Text>Log Out</Text>
                <Ionicons name="exit-outline" size={22} color={COLORS[colorScheme].text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CustomAlert
        visible={deleteAccountModalVisible}
        onCancel={handleModalVisible}
        onConfirm={() => console.log("Account Deleted")}
      />
    </Container>
  )
}
