import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Rating = ({ rating, votesNum }) => {
    return(
        <div className='rating'>
            { rating ? <FontAwesomeIcon icon={faStar} className='rating-icon' /> : null }
            <span>
                { rating ? `${rating} / 10 ` : '' }
            </span>
            <span>
                { votesNum ? `(${votesNum} votes)` : '' }
            </span>
        </div>
    )
};

Rating.propTypes = {
    rating: PropTypes.number,
    votesNum: PropTypes.number
};

export default Rating;

