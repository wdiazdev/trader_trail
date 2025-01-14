import { Switch as DefaultSwitch, SwitchProps } from "react-native"
import { COLORS } from "../constants/Colors"
import useColorScheme from "../hooks/useColorScheme"

interface CustomSwitchProps
  extends Omit<SwitchProps, "value" | "onValueChange"> {
  value: boolean
  onValueChange: (value: boolean) => void
}

export default function Switch({
  value,
  onValueChange,
  ...rest
}: CustomSwitchProps) {
  const colorScheme = useColorScheme()
  return (
    <DefaultSwitch
      {...rest}
      trackColor={{ false: "#767577", true: "#767577" }}
      thumbColor={value ? COLORS[colorScheme].icon : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
    />
  )
}
