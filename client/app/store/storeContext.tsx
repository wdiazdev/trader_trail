import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react"
import { changeReducer } from "./reducer"

type InitialState = {
  token: string
}

const initialState = {
  token: "",
}

const AppContext = createContext<{
  state: InitialState
  dispatch: Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null,
})

const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within a AppContextProvider")
  }
  return context
}

const mainReducer = ({ token }: InitialState, action: any) => changeReducer(token, action)

type Props = {
  children: ReactNode
}

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<any>(mainReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch } as any}>{children}</AppContext.Provider>
}

export { AppContextProvider, useAppContext }
