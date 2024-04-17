import axios from "axios"

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjY0ZDMxMTU2NWYzNjBiOTk5ODkyMjIyMjkwY2M4MiIsInN1YiI6IjY0Yjc3ZWY2ZWVlMTg2MDBhZWQ5MDJiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6sjTn9O9t12kYDKwAVfTSnKv16bcYwatdztxPrFEOFs'
      }
})

export default instance