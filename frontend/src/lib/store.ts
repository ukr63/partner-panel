import { configureStore } from '@reduxjs/toolkit'
import SettingsReducer from "@/lib/reducers/settingsReducer";
import UserReducer from "@/lib/reducers/userReducer";

export const makeStore = () => {
    // @ts-ignore
    return configureStore({
        reducer: {
            settings: SettingsReducer,
            user: UserReducer
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']