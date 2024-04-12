import React from "react";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpg";
import Loading from "./Loading";
function VerticalCard({ data, title }) {
  return data ? (
    <div className="w-[full] h-full bg-[#1F1F24] mt-5 flex flex-wrap justify-center verticalcard  ">
      {data.map((c, i) => (
        <Link
          key={i}
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[180px] p-2"
        >
          <div className=" relative shadow-md rounded-lg">
            <img
              className="w-full h-auto obj"
              src={
                c.poster_path || c.backdrop_path || c.profile_path
                  ? `https://image.tmdb.org/t/p/original${
                      c.poster_path || c.backdrop_path || c.profile_path
                    }`
                  : noimage
              }
              alt={c.title || c.name || c.original_title || c.original_name}
            />
            <div className="p-2 ">
              <h2 className="text-[14px] font-semibold mb-2 text-white text-center ">
                {c.title || c.name || c.original_title || c.original_name}
              </h2>
            </div>
          </div>
          {c.vote_average ? (
            <div className="max-lg:hidden  text-white absolute top-[61%] left-[80%] bg-[#6556CD] p-1 rounded-full w-10 h-10 flex items-center justify-center text-center font-semibold">
              {(c.vote_average * 10).toFixed()} <sup>%</sup>
            </div>
          ) : (
            <span></span>
          )}
        </Link>
      ))}
    </div>
  ) : (
    <Loading />
  );
}

export default VerticalCard;
