import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import "./Home.css";


class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
    <section class="container">
      {isLoading ? (
        <div class="loader">
          <span class="loader__text">Loading...</span>
        </div>
        ) : (
      <div class="movies">
       {movies.map(movie => (
        <Movie
         id={movie.id}
         year={movie.year} 
         title={movie.title} 
         summary={movie.summary}
         poster={movie.medium_cover_image} 
         genres={movie.genres}
         />
         ))}
   </div>
    )}
    </section>
    ); 
}
}

export default Home;
