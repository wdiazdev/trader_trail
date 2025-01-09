import { Ionicons } from "@expo/vector-icons"
import React, { useEffect } from "react"
import { Text, Animated } from "react-native"

type IoniconName = React.ComponentProps<typeof Ionicons>["name"]

interface ToastProps {
  type: "success" | "warning" | "error"
  message: string
  onHide: () => void
}

const Toast = ({ type, message, onHide }: ToastProps) => {
  const opacity = new Animated.Value(0)

  const toastStyles = {
    success: {
      backgroundColor: "#4CAF50",
      textColor: "#FFFFFF",
      iconName: "checkmark-circle-outline",
    },
    warning: {
      backgroundColor: "#FFC107",
      textColor: "#000000",
      iconName: "alert-circle-outline",
    },
    error: {
      backgroundColor: "#F44336",
      textColor: "#FFFFFF",
      iconName: "close-circle-outline",
    },
  }

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(onHide)
      }, 2500)
    })
  }, [])

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: toastStyles[type].backgroundColor,
        padding: 10,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 1000,
        opacity,
      }}
    >
      <Ionicons
        name={toastStyles[type].iconName as IoniconName}
        size={20}
        color={toastStyles[type].textColor}
        style={{ marginHorizontal: 8 }}
      />
      <Text style={{ color: toastStyles[type].textColor }} numberOfLines={2}>
        {message}
      </Text>
    </Animated.View>
  )
}

export default Toast