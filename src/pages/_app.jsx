import '@/styles/globals.css'
import { useState } from 'react';
import SearchBar from '@/components/searchBar/searchBar';
import MovieCardsList from '@/components/movieCard/movieCardsList';
import GeneralPopup from '@/components/popups/generalPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import Loader from '@/components/loader/loader';
import MessageWithIcon from '@/components/messageWithIcon/messageWithIcon';
import { Provider } from 'react-redux';
import store from '@/store/store';
import './App.css';
import '@/css/sass/index.scss';
import '/src/pages/index.module.css'

const App = () => {
  const [movies, setMovies] = useState([]);
  const [typedValue, setTypedValue] = useState('');
  const [loader, setLoader] = useState(false);

  return (
    <Provider store={store}>
      <SearchBar 
        setMovies={setMovies} 
        setTypedValue={setTypedValue} 
        setLoader={setLoader}
      />

      {
        (!loader && typedValue?.length && !movies?.length)
          ? <MessageWithIcon 
              icon={<FontAwesomeIcon icon={faFaceSadTear} className='margin-r-8' />}
              text='Sorry, there are no results for the requested title'
          />
          : <MovieCardsList
              movies={movies} 
              typedValue={typedValue}
              setLoader={setLoader}
          />
      }
      {
        loader
          ? <Loader />
          : null
      }
      {/* General popup takes it's content from a redux store, so the same popup can be used where needed with different content only by updating the redux variables of the popup store */}
      <GeneralPopup />
    </Provider>
  );
}



export default App;