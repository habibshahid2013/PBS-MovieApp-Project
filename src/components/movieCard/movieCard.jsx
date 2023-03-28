import React from 'react';
import service, { urls } from '../../services/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import globalUtilities from '../../Utilities/globalUtilities';
import MovieDetailsPopup from '../../components/popups/movieDetailsPopup';
import { useSelector, useDispatch } from 'react-redux';
import Rating from './rating';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const MovieCard = ({ movieInfo, typedValue, setLoader }) => {
    const popupStore = useSelector(state => state.popup);
    const dispatch = useDispatch();

    // when a user clicks on the movie card, then we want to show the popup for that specific movie with the appropriate movie details data
    // new request is made ONLY when user clicks the movie card (so I avoid making the getMovieDetails request for all of the movies when they are retrieved, it would make the user wait way more)
    const onMovieCardClick = async () => {
        if(movieInfo.id) {
            setLoader(true);
            
            // retrieve the cast, genres, runtime, productionCompanies data
            const { cast, genres, runtime, productionCompanies } = await service.getMovieDetails(movieInfo.id);

            setLoader(false);

            // show the popup with the original movie details, appended with the detailed data that I just retrieved
            if(!popupStore.showPopup) {
                dispatch({ type: 'popup/setShowPopup', payload: true });
                dispatch({ type: 'popup/setPopupContent', payload: <MovieDetailsPopup movieInfo={{...movieInfo, cast, genres, runtime, productionCompanies}} /> });
            }
        }
    };
    
    const getTextClasses = (part, highlightedPart) => classNames({ 'highlightedPart': part.toLowerCase() === highlightedPart.toLowerCase() });

    // logic to get the title's text in 3 parts and make one of them highlighted (the one that is the same with the one that the user has typed in)
    const getHighlightedText = (text, highlight) => {
        if(!highlight?.length) return text;

        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        
        return (<span> 
            { 
                parts.map((part, i) => 
                    <span key={i} className={getTextClasses(part, highlight)}>
                        { part }
                    </span>)
            } 
        </span>);
    };

    return(
        <div className='movieCard'>
            <img
                className='movieCard-poster'
                
                src={ movieInfo.poster_path ? `${urls.imagesBaseUrl}${movieInfo.poster_path}` : globalUtilities.getNoAvailablePosterUrl()}
                alt=''
                onClick={onMovieCardClick}
            />
            <div className='movieCard-generalInfo'>
                <div>   
                    <span className='titleFont'> 
                        {getHighlightedText(movieInfo.original_title, typedValue)}
                    </span> 
                    <span className='normalFont margin-l-5'> 
                        {/* take only the year fro the date string */}
                        ({ movieInfo?.release_date ? movieInfo.release_date.split('-')[0] : '' }) 
                    </span>
                </div>
                <div className='movieCard-generalInfo-details'>
                    <Rating 
                        rating={movieInfo?.vote_average} 
                        votesNum={movieInfo?.vote_count} 
                    />
                    <FontAwesomeIcon 
                        icon={faCircleInfo}
                        className='infoIcon'
                        onClick={onMovieCardClick}
                    />
                </div>
            </div>
        </div>
    );
};

MovieCard.propTypes = {
    movieInfo: PropTypes.shape({}),
    typedValue: PropTypes.string,
    setLoader: PropTypes.func
};

export default MovieCard;