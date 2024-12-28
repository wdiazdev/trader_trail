import { Platform } from "react-native"

export const shadowStyles = (colorScheme: string) => ({
  shadowColor: colorScheme === "dark" ? "#FFFFFF" : "#333333",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  ...Platform.select({
    android: { elevation: 1 },
  }),
})
