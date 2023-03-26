const initialPopupState = {
    showPopup: false,
    popupContent: <></>
};

// popup reducer
const user = (state = initialPopupState, action) => {
    switch(action.type) {
        case 'popup/setShowPopup': {
            return {
                ...state,
                showPopup: action.payload
            };
        }
        case 'popup/setPopupContent': {
            return {
                ...state,
                popupContent: action.payload
            };
        }
        default: 
            return state;
    }
};

export default user;