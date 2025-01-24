import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Container from "@/src/shared/Container"
import { useAppContext } from "@/src/store/storeContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useColorScheme from "@/src/hooks/useColorScheme"
import { COLORS } from "@/src/constants/Colors"
import { Ionicons } from "@expo/vector-icons"
import Text from "@/src/shared/Text"
import CustomAlert from "@/src/shared/CustomAlert"
import agent from "@/src/api/agent"
import { useRouter } from "expo-router"
import { useToast } from "@/src/context/toastContext"
import Switch from "@/src/shared/Switch"
import BorderedContainer from "@/src/shared/BorderedContainer"

export default function Settings() {
  const { state, dispatch } = useAppContext()
  const colorScheme = useColorScheme()
  const router = useRouter()
  const { showToast } = useToast()

  const [isFaceIdEnabled, setIsFaceIdEnable] = useState(false)
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false)
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false)

  const toggleSwitch = (type: string) => {
    if (type === "fadeId") {
      setIsFaceIdEnable((previousState) => !previousState)
    } else if (type === "darkMode") {
      setIsDarkModeEnabled((previousState) => !previousState)
    }
  }

  const handleModalVisible = () => {
    setDeleteAccountModalVisible((previousState) => !previousState)
  }

  const handleLogOut = async () => {
    dispatch({
      type: "change_store",
      payload: {
        user: null,
      },
    })
    await AsyncStorage.removeItem("access_token")
    router.push("/(public)")
  }

  const handleDeleteAccount = async () => {
    try {
      if (state.user && state.user.userId) {
        await agent.Auth.delete()
        dispatch({
          type: "change_store",
          payload: {
            user: null,
          },
        })
      }
      await AsyncStorage.removeItem("access_token")
      await AsyncStorage.removeItem("balanceVisible")
      showToast("success", "Account deleted successfully.")
      router.push("/(public)")
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Error deleting account"
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
        <View style={{ marginTop: 20, gap: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>App</Text>
          <BorderedContainer fullWidth>
            <View
              style={{
                minHeight: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: COLORS[colorScheme].border,
              }}
            >
              <Text>Fade ID</Text>
              <Switch
                id="fadeId"
                accessibilityLabel="Face ID switch"
                onValueChange={() => toggleSwitch("fadeId")}
                value={isFaceIdEnabled}
              />
            </View>

            <View
              style={{
                minHeight: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
            >
              <Text>Dark Mode</Text>
              <Switch
                id="darkMode"
                accessibilityLabel="Dark Mode switch"
                onValueChange={() => toggleSwitch("darkMode")}
                value={isDarkModeEnabled}
              />
            </View>
          </BorderedContainer>
        </View>

        <View style={{ marginTop: 20, gap: 18 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Account</Text>
          <BorderedContainer>
            <TouchableOpacity
              id="deleteAccount"
              accessibilityLabel="Delete Account"
              style={{
                minHeight: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: COLORS[colorScheme].border,
              }}
              onPress={handleModalVisible}
            >
              <Text>Delete Account</Text>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={COLORS[colorScheme].text}
              />
            </TouchableOpacity>

            <TouchableOpacity
              id="logOut"
              accessibilityLabel="Log Out"
              style={{
                minHeight: 50,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
              }}
              onPress={handleLogOut}
            >
              <Text>Log Out</Text>
              <Ionicons
                name="exit-outline"
                size={22}
                color={COLORS[colorScheme].text}
              />
            </TouchableOpacity>
          </BorderedContainer>
        </View>
      </View>
      <CustomAlert
        title="Delete Account"
        message="Deleting your account is permanent, and our support team will not be able to recover it. Are you sure you want to delete your account?"
        visible={deleteAccountModalVisible}
        onCancel={handleModalVisible}
        onConfirm={handleDeleteAccount}
      />
    </Container>
  )
}
