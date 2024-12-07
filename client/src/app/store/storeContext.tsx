import React, { createContext, Dispatch, ReactNode, useContext, useReducer } from "react"
import { User } from "@/src/types"

export const CHANGE_STORE = "change_store"

type InitialStateType = {
  user: User | null
  registrationEmail: string | null
}

const initialState: InitialStateType = {
  user: null,
  registrationEmail: null,
}

type ChangeStoreAction = {
  type: typeof CHANGE_STORE
  payload: Partial<InitialStateType>
}

type Action = ChangeStoreAction

const changeReducer = (state: InitialStateType, action: Action): InitialStateType => {
  switch (action.type) {
    case CHANGE_STORE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const AppContext = createContext<{
  state: InitialStateType
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => undefined,
})

const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context
}

type Props = {
  children: ReactNode
}

const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(changeReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppContextProvider, useAppContext }
