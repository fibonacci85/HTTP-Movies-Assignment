import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const UpdateMovie = (props) => {

    const initialState = {
        title:"",
        director:"",
        metascore:"",
        stars:[]
    }

    console.log(initialState)

    const [updateMovie, setUpdateMovie] = useState(initialState)

    const {id} = useParams(); // ?
    const {push} = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            // console.log(res.data)
            setUpdateMovie(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const changeHandler = (e) => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore"){
            value = parseInt(value, 10);
        }
        setUpdateMovie({
            ...updateMovie,
            [e.target.name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
            .then(res => {
             props.setMovieList(res.data);
             push(`/movies/`)
            })
    }


    return(
        <form onSubmit={handleSubmit}>
            <input placeholder="movie title"
                   type="text"
                   name="movie_title"
                   onChange={changeHandler}
                   value={updateMovie.title}
             /><br/>
            <input placeholder="director"
                   type="text"
                   name="director"
                   onChange={changeHandler}
                   value={updateMovie.director}
            /><br/>
            <input placeholder="metascore"
                   type="text"
                   name="metascore"
                   onChange={changeHandler}
                   value={updateMovie.metascore} 
            /><br/>
            <input placeholder="stars"
                   type="text"
                   name="stars"
                   onChange={changeHandler}
                   value={updateMovie.stars}           
            /><br/>
            <br/>
            <button>Update</button>
        </form>
    )
}

export default UpdateMovie;