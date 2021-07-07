import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";

const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateForm = props => {
    const [movie, setMovie] = useState(initialItem);
    useEffect(() => {
        const movieToEdit = props.movies.find(
            e => `${e.id}` === props.match.params.id
        )
        console.log(props.movies, movieToEdit);
        if (movieToEdit) {
            setMovie(movieToEdit)
        }
    }, [props.movies, props.match.params.id])

    const handleChange = e => {
        e.preventDefault();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, '');
        }
        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const stars = (e , index) => {
        e.preventDefault();
        let starList = [...movie.stars]
        starList[index] = e.target.value
        setMovie({
            ...movie,
            stars: starList
        })
    }

    const updateMovies = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, { ...movie })
            .then(res => {
                console.log(res.data);
                props.history.push(`/movies/${movie.id}`)
            })
            .catch(res => console.log(res))
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={updateMovies}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                    value={movie.title}
                />

                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="Director"
                    value={movie.director}
                />

                <input
                    type="number"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="Metascore"
                    value={movie.metascore}
                />

                {movie.stars && movie.stars.map((star, index) => {
                    console.log(star, index);
                    return (
                        <input
                            key={index}
                            type="text"
                            name='stars'
                            onChange={e => stars(e, index)}
                            placeholder="Star"
                            value={movie.stars[index]}
                        />
                    )
                })}

                <button>Update</button>
            </form>
        </div>
    );
}

export default UpdateForm;