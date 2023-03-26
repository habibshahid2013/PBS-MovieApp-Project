import React, { useEffect, useRef } from 'react';
import { urls } from '../../services/service';
import globalUtilities from '../../Utilities/globalUtilities';
import Rating from '../movieCard/rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// movie specific popup which becomes the content of generalPopup component when user clicks on a movie card
const MovieDetailsPopup = ({ movieInfo }) => {
    const popupStore = useSelector(state => state.popup);
    const dispatch = useDispatch();
    
    const popupRef = useRef(null);
    useOutsidePopupClick(popupRef, popupStore.showPopup);

    // custom hook that detects when user clicks outside popup and closes the popup (if it's already open)
    function useOutsidePopupClick(ref, showPopup) {
        useEffect(() => {
            const handleClickOutside = (e) => ref.current && !ref.current.contains(e.target) && onPopupClose(showPopup);
            
            document.addEventListener("mousedown", handleClickOutside);
            
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [ref, showPopup]);
    };

    // when user clicks the X button or clicks outside of the popup, close the popup
    const onPopupClose = (showPopup) => {
        if(showPopup) dispatch({ type: 'popup/setShowPopup', payload: false });
    };

    return(
        <div className='generalPopup-content movieDetailsPopup' ref={popupRef}>
            <div className='infoSection'>
                <img
                    className='movieCard-poster smallPoster'
                    src={ movieInfo.poster_path ? `${urls.imagesBaseUrl}${movieInfo.poster_path}` : globalUtilities.getNoAvailablePosterUrl()}
                    alt=''
                />
                <div>
                <div className='title margin-l-15'>
                    { movieInfo.original_title }
                </div>
                <div className='infoSection-itemsGroup'>
                    <div className='infoSection-itemsGroup-item'>
                        { movieInfo?.release_date ? movieInfo.release_date.split('-')[0] : '' }
                    </div>
                    <div className='infoSection-itemsGroup-item'>
                        { movieInfo?.runtime ? `${movieInfo.runtime} mins` : '' }
                    </div>
                </div>
                {movieInfo?.genres ? <div className='infoSection-itemsGroup'>
                    {
                        movieInfo.genres.map((genre, index) => 
                            <div className='infoSection-itemsGroup-item' key={index}>
                                { genre.name }
                            </div>
                        )
                    }
                </div> : null}
                <div className='infoSection-itemsGroup'>
                    <Rating 
                        rating={movieInfo.vote_average} 
                        votesNum={movieInfo.vote_count} 
                    />
                </div>
                </div>
            </div>
            <div className='margin-t-10'>
                { movieInfo.overview }
            </div>
            {movieInfo?.productionCompanies?.length ? <div className='detailItem margin-t-15'>
                <span className='detailItem-title'> Production Companies: </span>
                {
                    movieInfo.productionCompanies.map((company, index) => <span className='margin-l-5' key={index}>
                        { company.name }{ index === movieInfo.productionCompanies.length - 1 ? '' : ',' }
                    </span>)
                }
            </div> : null}
            {movieInfo?.cast?.length ? <div className='detailItem margin-t-15'>
                <span className='detailItem-title'> Cast: </span>
                {
                    movieInfo.cast.map((name, index) => <span className='margin-l-5' key={index}>
                        { name }{ index === movieInfo.cast.length - 1 ? '' : ',' }
                    </span>)
                }
            </div> : null}
            <FontAwesomeIcon 
                icon={faXmark} 
                className='closeIcon' 
                onClick={() => onPopupClose(popupStore.showPopup)} 
            />
        </div>
    )
};

MovieDetailsPopup.propTypes = {
    movieInfo: PropTypes.shape({})
}

export default MovieDetailsPopup;