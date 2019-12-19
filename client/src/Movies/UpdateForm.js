import React from 'react';
import Axios from 'axios';

const initialItem = {
    state = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
}

const UpdateForm = props => {
    const [ movie, setMovie] = useState(initialItem);
    useEffect(() => {
       const movieToEdit = props.movies.find(
           e => `${e.id}` === props.match.params.id
       )
       console.log(props.movies, movieToEdit);
       if ( movieToEdit ) {
           setMovie(movieToEdit)
       }
    }, [props.movies, props.match.params.is])

    const handleChange = e => {
        e.preventDefault();
        this.prop.handleChange(this.state.updateMovie)
    }

    updateMovies = (Movie) => {
        axios
            .put(`http://localhost:5000/api/movies/update-movie/:id`, Movie)
            .then(res => {
                props.updateMovie(res.data);
                props.history.push(`/movies/${id}`)
            })
            .catch(res => console.log(res))
    }
}

export default UpdateForm;