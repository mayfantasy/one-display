import React, { FC, useMemo } from 'react'
import { ThemeProvider } from 'next-themes'

export interface State {
  displaySidebar: boolean
  displayDropdown: boolean
  displayModal: boolean
  displayToast: boolean
  modalView: string
  toastText: string
  displaySearchbar: boolean
  displayProductMenu: boolean
  cartItemsCount: number
}

const initialState = {
  displaySidebar: false,
  displayDropdown: false,
  displayModal: false,
  modalView: 'LOGIN_VIEW',
  displayToast: false,
  toastText: '',
  displaySearchbar: false,
  displayProductMenu: false,
  cartItemsCount: 0,
}

type Action =
  | {
      type: 'OPEN_SIDEBAR'
    }
  | {
      type: 'CLOSE_SIDEBAR'
    }
  | {
      type: 'OPEN_TOAST'
    }
  | {
      type: 'CLOSE_TOAST'
    }
  | {
      type: 'SET_TOAST_TEXT'
      text: ToastText
    }
  | {
      type: 'OPEN_DROPDOWN'
    }
  | {
      type: 'CLOSE_DROPDOWN'
    }
  | {
      type: 'OPEN_MODAL'
    }
  | {
      type: 'CLOSE_MODAL'
    }
  | {
      type: 'SET_MODAL_VIEW'
      view: MODAL_VIEWS
    }
  | {
      type: 'OPEN_SEARCHBAR'
    }
  | {
      type: 'CLOSE_SEARCHBAR'
    }
  | {
      type: 'OPEN_PRODUCT_MENU'
    }
  | {
      type: 'CLOSE_PRODUCT_MENU'
    }
  | {
      type: 'SET_CART_ITEMS_COUNT'
      count: number
    }

type MODAL_VIEWS = 'SIGNUP_VIEW' | 'LOGIN_VIEW' | 'FORGOT_VIEW'
type ToastText = string

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        displayDropdown: true,
      }
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        displayDropdown: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case 'OPEN_TOAST': {
      return {
        ...state,
        displayToast: true,
      }
    }
    case 'CLOSE_TOAST': {
      return {
        ...state,
        displayToast: false,
      }
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      }
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        toastText: action.text,
      }
    }
    case 'OPEN_SEARCHBAR': {
      return {
        ...state,
        displaySearchbar: true,
      }
    }
    case 'CLOSE_SEARCHBAR': {
      return {
        ...state,
        displaySearchbar: false,
      }
    }
    case 'OPEN_PRODUCT_MENU': {
      return {
        ...state,
        displayProductMenu: true,
      }
    }
    case 'CLOSE_PRODUCT_MENU': {
      return {
        ...state,
        displayProductMenu: false,
      }
    }
    case 'SET_CART_ITEMS_COUNT': {
      return {
        ...state,
        cartItemsCount: action.count,
      }
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' })
  const toggleSidebar = () =>
    state.displaySidebar
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' })
  const closeSidebarIfPresent = () =>
    state.displaySidebar && dispatch({ type: 'CLOSE_SIDEBAR' })

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' })
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' })

  const openModal = () => dispatch({ type: 'OPEN_MODAL' })
  const closeModal = () => {
    dispatch({ type: 'SET_MODAL_VIEW', view: 'LOGIN_VIEW' })
    return dispatch({ type: 'CLOSE_MODAL' })
  }

  const openToast = () => dispatch({ type: 'OPEN_TOAST' })
  const closeToast = () => dispatch({ type: 'CLOSE_TOAST' })

  const openSearchbar = () => dispatch({ type: 'OPEN_SEARCHBAR' })
  const closeSearchbar = () => dispatch({ type: 'CLOSE_SEARCHBAR' })

  const openProductMenu = () => dispatch({ type: 'OPEN_PRODUCT_MENU' })
  const closeProductMenu = () => dispatch({ type: 'CLOSE_PRODUCT_MENU' })

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view })

  const setCartItemsCount = (count: number) => {
    dispatch({ type: 'SET_CART_ITEMS_COUNT', count })
  }

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      openToast,
      closeToast,
      openSearchbar,
      closeSearchbar,
      openProductMenu,
      closeProductMenu,
      setCartItemsCount,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
)
