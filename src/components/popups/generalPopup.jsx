import React from 'react';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

// a general popup that takes it's content component from redux
const GeneralPopup = () => {
    const popupStore = useSelector(state => state.popup);

    const getGeneralPopupClasses = (show) => classnames('generalPopup', {'popupShown': show, 'popupHidden': !show});

    return(
        <div className={getGeneralPopupClasses(popupStore.showPopup)}>
            { popupStore.popupContent }
        </div>
    )
};

export default GeneralPopup;