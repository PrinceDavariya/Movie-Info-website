// Topnav.js
import React, { useState, useEffect } from "react";
import axios from "../Utils/Axios";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
function Topnav({ toggleSidnav }) {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="w-full h-[10vh] relative flex items-center ">
      <div>
        <i
          className="ri-menu-unfold-4-line text-zinc-200 text-2xl mr-3 border-2 p-1 hover:text-zinc-400 cursor-pointer"
          onClick={toggleSidnav}
        ></i>
      </div>
      <div className="ml-[16%] max-sm:ml-2 w-full flex items-center">
        <i className="ri-search-2-line text-zinc-200 text-3xl"></i>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-[50%] mx-10 max-sm:mx-2 max-sm:w-[70%] text-xl p-2 rounded-3xl bg-transparent text-white outline-none border-none"
          placeholder="Search Anything"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery("")}
            className="ri-close-fill text-zinc-200 text-3xl"
          ></i>
        )}

        <div className="z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[22%] overflow-auto max-sm:w-[70%] ">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 max-sm:p-8 max-sm:h-5 flex justify-start items-center border-b-2 border-zinc-100"
            >
              <img
                className="w-[10vh] h-[10vh] max-sm:w-[5vh] max-sm:h-[5vh] object-cover rounded mr-5 shadow-lg "
                src={
                  s.backdrop_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span>
                {s.name || s.title || s.original_name || s.original_title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Topnav;
