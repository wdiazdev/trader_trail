// components/Toast.tsx
import React, { useEffect } from "react"
import { Text, Animated } from "react-native"

interface ToastProps {
  message: string
  onHide: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onHide }) => {
  const opacity = new Animated.Value(0)

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
      }, 2000)
    })
  }, [opacity, onHide])

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        zIndex: 1000,
        opacity,
      }}
    >
      <Text style={{ color: "white" }}>{message}</Text>
    </Animated.View>
  )
}

export default Toast
