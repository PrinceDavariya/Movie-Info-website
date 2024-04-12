import React, { useEffect } from "react";
import {
  useNavigate,
  useParams,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "./Loading";
import HorizontalCards from "../Templates/HorizontalCards";
 import { loadtv, removetv } from "../store/reducers/tvslice";
import { asycloadtv } from "../store/action/tvaction";
import noimage from "/noimage.jpg"
useLocation;
function Tvdetail() {
  const { info } = useSelector((state) => state.tv);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asycloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),  url(https://image.tmdb.org/t/p/original/${
          info.details.poster_path || info.details.backdrop_path
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen h-[185vh] max-md:h-[320vh] bg-red-200 px-[10%] overflow-hidden"
    >
      <nav className="w-full text-zinc-100 flex gap-10 text-[20px] h-[10vh] items-center">
        <Link
          onClick={() => navigate(-1)}
          className="mr-3 ml-3 ri-arrow-left-line text-[#6556CD] hover:text-[#6736CD]"
        ></Link>
        <a target="_blank" href={`${info.details.homepage}`}>
          <i className="ri-external-link-fill text-[#6556CD] hover:text-[#6736CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill text-[#6556CD] hover:text-[#6736CD]"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDB
        </a>
      </nav>

      {/* part 1 poster and details */}
      <div className="w-full  flex max-md:flex-wrap items-center justify-center text-white">
        <img
          className="w-[150px] max-md:w-28 max-md:h-[30vh] mt-5 h-[39vh] shadow-xl object-cover "
          src={`https://image.tmdb.org/t/p/original${
            info.details.backdrop_path || info.details.poster_path
          }`}
          alt=""
        />
        <div className="content ml-5 text-white">
          <h2 className="text-[44px] font-bold mb-2 text-white text-center">
            {info.details.title ||
              info.details.name ||
              info.details.original_title ||
              info.details.original_name}

            <small className="text-xl ml-2 text-zinc-100">
              ({info.details.first_air_date.split("-")[0]})
            </small>
          </h2>
          <div className="flex gap-5  items-baseline font-semibold ">
            <div className="mb-5 text-white   bg-yellow-600 p-1 rounded-full w-10 h-10 flex items-center justify-center text-center font-semibold">
              <span>
                {(info.details.vote_average * 10 || info.details.popularity / 10   ).toFixed()}
                <sup>%</sup>
              </span>
            </div>
            
            <div>{info.details.genres.map((g) => g.name).join(",")}</div>
            <h1>{info.details.release_date}</h1>
            <h1>{info.details.episode_run_time} min</h1>
          </div>
           <div className=" m-4 gap-5 items-baseline font-semibold">
           Seasons : {info.details.number_of_seasons} <br></br><br></br> 
          Total Episode :  {info.details.number_of_episodes}
            </div> 
          <div className="font-semibold">{info.details.overview}</div>
          <Link
            to={`${pathname}/trailer`}
            className="w-[fit-content] text-[18px] bg-[#6556CD] px-4 py-3 rounded-md inline-block mt-4 transition duration-300 ease-in-out transform hover:bg-[#513fc5] hover:scale-105 mb-10 font-bold"
          >
            <i class="ri-play-fill mr-3"></i>Watch Trailer
          </Link>
        </div>
      </div>
      {/* part 2 for buy,rent */}

      {info.watchproviders === undefined ? (
        <span></span>
      ) : (
        <div className="flex flex-col gap-10 text-white mt-5 font-semibold">
          {info.watchproviders.flatrate &&
            info.watchproviders.flatrate.length > 0 && (
              <div className="mt-4 text-white items-center flex gap-5">
                Avilable on Platform
                {info.watchproviders.flatrate.map((w) => (
                  <img
                    key={w.id}
                    className="w-[6vh] h-[6vh] rounded-md"
                    src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                    alt=""
                  />
                ))}
              </div>
            )}

          {info.watchproviders.rent && info.watchproviders.rent.length > 0 && (
            <div className="flex gap-7 items-center">
              Avilable For Rent
              {info.watchproviders.rent.map((w) => (
                <img
                  className="w-[6vh] h-[6vh] rounded-md"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}

          {info.watchproviders.buy && info.watchproviders.buy.length > 0 && (
            <div className="flex gap-7 items-center">
              Avilable For Buy
              {info.watchproviders.buy.map((w) => (
                <img
                  className="w-[6vh] h-[6vh] rounded-md"
                  src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
                  alt=""
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* part 3 Seasons */}
       
      <div className="w-full h-[45vh] overflow-x-hidden  "> 
        <div className="h-full mt-3 w-[130vw] flex overflow-x-auto   ">
          {info.details.seasons.length > 0 ? info.details.seasons.map((d, i) => (
            <div 
            className=" mr-4 min-w-[15%] text-white ml-4" key={i}>
              <img
                  className="w-[100%] h-[73%]  object-cover "
                  src={d.backdrop_path || d.poster_path ?
                  `https://image.tmdb.org/t/p/original${
                    d.backdrop_path || d.poster_path
              }`   :  noimage}
                  alt=""
                />
              <h1 className="text-xl max-md:font-thin max-md:text-[12px] font-bold">
              {  d.name }
              </h1>
             
            </div>
          )) : <h1>Nothing To Show</h1>}
        </div>
      </div>


      {/* part 4 recomendation */}
      <center>
        <h1 className="text-white text-2xl font-bold mt-5 mb-5">
          Recomendation & Similor Stuff{" "}
        </h1>
      </center>
      <hr />
      <HorizontalCards
       title="tv"
       data={
           info.recommendations.length > 0
               ? info.recommendations
               : info.similar
       }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default Tvdetail;
