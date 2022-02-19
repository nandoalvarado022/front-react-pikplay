import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { configureStore, createSlice, ThunkAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { useMemo } from 'react'

let store

const initialState = {
    coins: 0,
    current_date: new Date(),
    guide_step: 1, // guia de bienvenida de primeros usuarios
    isMobile: false,
    notifications: [],
    messageModal: { id: "empty" },
    checkedNotifications: typeof window != "undefined" && localStorage.getItem("checkedNotifications") ? JSON.parse(localStorage.getItem("checkedNotifications")) : [],
    selectedUser: null,
    user: { id: 0 },
    showNotification: true
}

// create your reducer
const reducer = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case 'CHANGE_PROPERTY':
            return { ...state, [action.payload.property]: action.payload.value };
        case 'LOGOUT':
            return { ...state, user: { id: 0 } };
        case "SET_MESSAGE":
            const notifications1Time = ["postRegistro"]
            let messageModal = !payload?.message ? { id: "empty", message: "" } : payload.message
            // si el tipo de notificacion es 1time debe quedar almacenada en local storage
            const notifications = localStorage.getItem("checkedNotifications") ? JSON.parse(localStorage.getItem("checkedNotifications")) : []
            if (notifications1Time.indexOf(messageModal.id) != 1 && notifications.find(item => item == messageModal.id)) { // si es notificacion 1time y ya lo tenemos en el local storage no se debe mostrar
                messageModal.id = "empty"
            }
            if (notifications1Time.indexOf(messageModal.id) != -1 && !notifications.find(item => item == messageModal.id)) {
                // notifications.push(messageModal.id)
                // localStorage.setItem("checkedNotifications", JSON.stringify(notifications))
            }
            return {
                ...state,
                messageModal
            }
        case "RECLAMAR_COINS":
            return {
                ...state,
                coins: state.coins + payload.coins,
            }
        default:
            return state;
    }
}

const persistedReducer = persistReducer({
    key: 'user',
    storage,
    whitelist: ['user', 'token']
}, reducer)

// create a makeStore function
const makeStore = (initialState) => createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware())
)

export const initializeStore = (preloadedState) => {
    let _store = store ?? makeStore(preloadedState)
    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = makeStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }
    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store
    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}