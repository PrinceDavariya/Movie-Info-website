import React, { useState,useEffect } from "react";
 
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../Utils/Axios";
import VerticalCard from "./VerticalCard";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Tvshows() {
  document.title = "SCSDB || Tv Shows";
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [duration, setduration] = useState("day");
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const gettv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
      //   settv(data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshhandler = async () => {
    if (tv.length === 0) {
      gettv();
    } else {
      setpage(1);
      settv([]);
      gettv();
    }
  };
  useEffect(() => {
    refreshhandler();
  }, [category, duration]);
  return tv .length > 0 ? (
    <div className="w-full bg-black  h-screen">
      <div className="w-full h-[12vh]  p-3 flex  items-center  ">
      <div className="text-2xl max-md:text-4xl flex items-center font-black text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="mr-3 ml-3 ri-arrow-left-line text-[#6556CD] hover:text-[#6736CD]"
          ></i>
          <h4 className="max-lg:hidden"> Tv Shows {(category)}</h4>
        </div>
        <div className="w-[115%] ">
          <Topnav></Topnav>
        </div>
        <div className="flex  flex-col gap-2 mt-4  ">
          <Dropdown
            title="Catogary"
            option={["popular", "top_rated", "airing_today", "on_the_air"]}
            func={(e) => setcategory(e.target.value)}
          ></Dropdown>
          <Dropdown
            title="Duration"
            option={["Week", "day"]}
            func={(e) => setduration(e.target.value)}
          ></Dropdown>
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={gettv}
        hasMore={true}
        loader={
          <>
            <h1>Loading..</h1>
          </>
        }
      >
        <VerticalCard data={tv} title="tv"></VerticalCard>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default Tvshows;
