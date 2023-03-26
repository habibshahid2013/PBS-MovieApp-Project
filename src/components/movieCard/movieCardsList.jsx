import React from 'react';
import MovieCard from './movieCard';
import PropTypes from 'prop-types';

const MovieCardsList = ({ movies, typedValue, setLoader }) => {
    // show in the list only the movies that have a title and a date
    return(
        movies?.length
            ? <div className='movieCardsList'>
                {
                    movies.filter(movieInfo => movieInfo.original_title && movieInfo.release_date).map((movieInfo, index) => (
                        <div key={index}>
                            <MovieCard
                                movieInfo={movieInfo} 
                                typedValue={typedValue}
                                setLoader={setLoader}
                            />
                        </div>
                    ))
                }
            </div> 
        : null
    )
};

MovieCardsList.propTypes = {
    movies: PropTypes.array,
    typedValue: PropTypes.string,
    setLoader: PropTypes.func
};

export default MovieCardsList;