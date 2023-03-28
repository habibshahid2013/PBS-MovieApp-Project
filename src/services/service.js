import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const urls = {
    serverUrl: 'https://moviesearcher-server.onrender.com',
   //  serverUrl: 'https://ql-movie-api.herokuapp.com/',
    imagesBaseUrl: 'https://image.tmdb.org/t/p/original'
};

// make the connection with the graphql API and use also the browser's cache for storing data that are already searched from the user
const client = new ApolloClient({
    uri: urls.serverUrl,
    cache: new InMemoryCache()
});

const queries = {
    searchMovie: title => `query {
        searchMovie(query:"${title}") {
            id,
            original_title,
            release_date,
            poster_path,
            overview,
            vote_average,
            vote_count
        }
    }`,
    getMovieDetail: id => `query {
        movieDetail(id:${id}) {
            runtime,
            genres {
                name
            },
            cast {
                name
            },
            production_companies {
                name
            }
          } 
    }`,
    getPersonDetail: id => `query {
        personDetail(id:${id}) {
            name
        }   
    }`
};

export const service = {
    getMovieByTitle: async (title) => client.query({ query: gql`${queries.searchMovie(title)}` }).then(res => res?.data?.searchMovie),
    getMovieDetails: async (id) => {
        let movieDetail =  await client.query({ query: gql`${queries.getMovieDetail(id)}`}).then(res => res?.data?.movieDetail);

        return {
            cast: movieDetail.cast.map(cast => cast.name),
            genres: movieDetail?.genres,
            runtime: movieDetail?.runtime,
            productionCompanies: movieDetail?.production_companies.slice(0, 2) // show only the 2 first production companies
        }
    }
};

export default service;