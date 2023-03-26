import React, { useState } from 'react';
import service from '../../services/service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const SearchBar = ({ setMovies, setTypedValue, setLoader }) => {
    const [error, setError] = useState({
        showError: false,
        errorMessage: ''
    });

    // make the request for retrieving the movies according to the user's typed value
    // error handling: when user types in more than 40 characters, then the appropriate error will appear and the request will not be made until he deletes some characters
    const searchMovie = async (e) => {
        setLoader(true);
        const typedValue = e.target.value;

        if(typedValue?.length) {
            if(typedValue.length > 40) setError({
                showError: true,
                errorMessage: 'Title can not exceed 40 characters'
            })
            else {
                setTypedValue(typedValue);

                if(error.showError) setError({
                    showError: false,
                    errorMessage: ''
                });

                const moviesTemp = await service.getMovieByTitle(typedValue);

                if(moviesTemp) setMovies(moviesTemp);
            }
        } 
        else {
            setMovies([]);
            setTypedValue('');

            if(error.showError) setError({
                showError: false,
                errorMessage: ''
            });
        }

        setLoader(false);
    };

    return(
        <div className='searchBarWrapper'>
            <div className='searchBar'>
                <input
                    type='text'
                    className='searchBar-input'
                    onChange={searchMovie}
                    placeholder='Search a movie'
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon'/>
                {
                    error.showError && <div className='searchBar-error'>
                        { error.errorMessage }
                    </div>
                }
            </div>
        </div>
    )
};

SearchBar.propTypes = {
    setMovies: PropTypes.func,
    setTypedValue: PropTypes.func,
    setLoader: PropTypes.func
};

export default SearchBar;