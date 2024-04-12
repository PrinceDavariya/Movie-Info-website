  import React from "react";
  import noimage from "/noimage.jpg"
  import { Link } from "react-router-dom";
import Loading from "./Loading";
  
  function HorizontalCards({ title,data }) {
      return data ?
     (
         <div className="w-full h-[45vh]"> 
        <div className="h-full mt-3 w-[100%] flex  overflow-x-scroll   ">
          {data.length > 0 ? data.map((d, i) => (
            <Link to={`/${d.media_type || title}/details/${d.id}`} className=" mr-4 min-w-[200px] text-white ml-4" key={i}>
              <img
                  className="min-w-[100%] min-h-[53%] object-cover "
                  src={d.backdrop_path || d.poster_path ?
                  `https://image.tmdb.org/t/p/original${
                    d.backdrop_path || d.poster_path || d.profile_path
              }`   :  noimage}
                  alt=""
                />
              <h1 className="text-xl font-bold">
              {d.title || d.name || d.original_title}
              </h1>
              <p className="mt-5 text-[12px] font-semibold gap-0 w-[100%]  opacity-75 leading-5	">{d.overview.slice(0,80)}...<span className="text-zinc-500" >More</span></p>
            </Link>
          )) : <h1>Nothing To Show</h1>}
        </div>
      </div>
    ): <Loading></Loading>
  }

  export default HorizontalCards;
