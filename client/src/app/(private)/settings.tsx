import React, { useState } from "react"
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native"
import Container from "@/src/components/Container"
import { useAppContext } from "@/src/store/storeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { shadowStyles } from "@/src/helpers/shadowStyles"
import useColorScheme from "@/src/hooks/useColorScheme"
import { COLORS } from "@/src/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import Text from "@/src/components/Text"
import CustomAlert from "@/src/components/AlertModal"
import agent from "@/src/api/agent"
import { useRouter } from "expo-router"
import { useToast } from "@/src/context/toastContext"

export default function Settings() {
  const { state, dispatch } = useAppContext()
  const colorScheme = useColorScheme()
  const router = useRouter()
  const { showToast } = useToast()

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

  const handleDeleteAccount = async () => {
    try {
      if (state.user && state.user._id) {
        await agent.Auth.delete(state.user._id)
        dispatch({
          type: "change_store",
          payload: {
            user: null,
          },
        })
      }
      await AsyncStorage.removeItem("token")
      showToast("success", "Account deleted successfully.")
      router.push("/(public)")
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error deleting account"
      showToast("error", errorMessage)
      console.log("Error:", error?.response?.data)
    }
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
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: COLORS[colorScheme].altText,
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
        onConfirm={handleDeleteAccount}
      />
    </Container>
  )
}
