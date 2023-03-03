import { useState } from "react";
import { MoviesContainer, MoviesPoster, MoviesRow, MoviesTitle } from "./Movies.styles";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function Movies({ title, movies }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const moviesPerPage = 8;
    const maxIndex = movies.length - 1;

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex === 0 ? currentIndex : currentIndex - 1);
        }
        //setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex < movies.length - 1) {
            setCurrentIndex(currentIndex === maxIndex ? currentIndex : currentIndex + 1);
        }
        //setCurrentIndex((prevIndex) => prevIndex + 1);
    };


    return (
        <MoviesContainer>
            <MoviesTitle>{title}</MoviesTitle>

            <MoviesRow>
                {currentIndex > 0 && (
                    <button onClick={handlePrev} className="left-arrow">
                        <FaArrowLeft /> 
                    </button>
                )}
                {movies.slice(currentIndex, currentIndex + moviesPerPage).map((movie) => (
                    <MoviesPoster
                        key={movie.id}
                        src={"https://image.tmdb.org/t/p/w300" + movie.poster_path}
                        alt={movie.name}
                    />
                ))}
                {currentIndex + 5 < movies.length && (
                    <button onClick={handleNext} className="right-arrow">
                        <FaArrowRight /> 
                    </button>
                )}
            </MoviesRow>

        </MoviesContainer>
    );
}

export default Movies;