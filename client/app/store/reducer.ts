export const CHANGE_STORE = "change_store"

export const initialState = {}

export const changeReducer = (state: any, action: any) => {
  switch (action.type) {
    case CHANGE_STORE:
      return {
        ...action.payload,
      }
    default:
      throw new Error()
  }
}
