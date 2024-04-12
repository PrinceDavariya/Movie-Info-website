import {configureStore} from "@reduxjs/toolkit"
import tvreducer from "./reducers/tvslice"
import personreducer from "./reducers/personslice"
import moviereducer from "./reducers/movieslice"

export const store = configureStore({
    reducer:{
        movie:moviereducer,
        tv:tvreducer,
       person:personreducer,
    },
})