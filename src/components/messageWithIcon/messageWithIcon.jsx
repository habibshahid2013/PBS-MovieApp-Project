import React from 'react';
import PropTypes from 'prop-types';

// Create a functional MessageWithIcon component
const MessageWithIcon = ({ text, icon }) => {
    return(
        <div className='messageFont text-center'>
            { icon }
            <span>
                { text }
            </span>
        </div>
    )
};

MessageWithIcon.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.element
};

export default MessageWithIcon;