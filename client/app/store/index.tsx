import { createContext, Dispatch, ReactNode, useReducer } from "react"
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

const mainReducer = ({ token }: InitialState, action: any) => changeReducer(token, action)

type Props = {
  children: ReactNode
}

const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer<any>(mainReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch } as any}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }
