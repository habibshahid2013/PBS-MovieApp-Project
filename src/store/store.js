import { configureStore } from '@reduxjs/toolkit';
import combinedReducer from './combinedReducer';

const store = configureStore({ 
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredPaths: ['popup.showPopup', 'popup.popupContent'],
            ignoredActions: ['popup/setShowPopup', 'popup/setPopupContent']
        }
    })
});

export default store;