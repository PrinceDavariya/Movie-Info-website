import React from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function Header({ data }) {
   return    data.backdrop_path && data.poster_path ?
   (
    <div
    className="w-full h-[60vh] flex flex-col justify-end font-bold"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.poster_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        textAlign: "left", // center align text
        paddingTop: "50px", // add some padding from top
        paddingBottom: "30px", // add some padding from bottom
        paddingLeft: "40px",
        color: "white",
      }}
    >
      <h1 className="mb-3 text-2xl">
        {data.title || data.name || data.original_title || data.original_name}
      </h1>
      <p className="mt-5 text-[16px] name font-semibold gap-0 w-[40%]  opacity-75 leading-5 max-md:max-h-[15%] text-ellipsis">{data.overview.slice(0,200) }...<Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400" >More</Link></p>
     <div className="flex gap-6 max-sm:md:hidden mt-3"> <p className="text-[14px] " ><i className="ri-megaphone-fill mr-2   text-[#e7e738] "></i>{data.release_date || "No information"}</p>
      <p className="text-[14px] "><i className="ri-album-fill  mr-2  text-[#e7e738] "></i>{(data.media_type).toUpperCase()}</p></div> 
      <Link to={`${data.media_type}/details/${data.id}/trailer`}  className="w-[fit-content]  bg-[#6556CD] px-5 py-3 rounded-md inline-block mt-4 transition duration-300 ease-in-out transform   max-sm:text-[15px] max-sm:px-1 max-sm:py-1  hover:bg-[#513fc5] hover:scale-105 text-xl ">Watch Trailer</Link>
    </div>
  ) : <Loading></Loading>
}

export default Header;
