import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import Toast from "../../components/Toast"

type ToastType = "success" | "warning" | "error"

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<{ visible: boolean; type: ToastType; message: string }>({
    visible: false,
    type: "success",
    message: "",
  })

  const showToast = useCallback(
    (type: ToastType, message: string) => {
      if (toast.visible) return
      setToast({ visible: true, type, message })
    },
    [toast.visible],
  )

  const hideToast = useCallback(() => {
    setToast({ visible: false, type: "success", message: "" })
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && <Toast type={toast.type} message={toast.message} onHide={hideToast} />}
    </ToastContext.Provider>
  )
}
