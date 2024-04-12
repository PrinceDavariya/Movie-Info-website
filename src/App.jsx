import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Trending from "./Components/Templates/Trending";
import Popular from "./Components/Templates/Popular";
import Movies from "./Components/Templates/Movies";
import Tvshows from "./Components/Templates/Tvshows";
import People from "./Components/Templates/People";
import Moviedetail from "./Components/Templates/Moviedetail";
import Tvdetail from "./Components/Templates/Tvdetail";
import Persondetails from "./Components/Templates/Persondetails";
import Trailer from "./Components/Templates/Trailer";
import NotFound from "./Components/Templates/NotFound";
 function App() {
  return (
    <>
      <div className="bg-[#1F1E24]  w-[full]  h-screen flex ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/movie" element={<Movies />} />
          <Route path="/movie/details/:id" element={<Moviedetail/>} > 
                <Route path="/movie/details/:id/trailer" element={<Trailer/>}/>
          </Route>
          <Route path="/tvshows" element={<Tvshows />} />
          <Route path="/tv/details/:id" element={<Tvdetail/>} />
          <Route path="/person" element={<People />} />
          <Route path="/person/details/:id" element={<Persondetails/>} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
