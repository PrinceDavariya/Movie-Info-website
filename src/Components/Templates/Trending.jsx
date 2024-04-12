import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import axios from "../Utils/Axios";
import VerticalCard from "./VerticalCard";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
  document.title = "SCSDB || Trending";
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [Trending, setTrending] = useState([]);
  const [duration, setduration] = useState("day");
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);
  const [loading, setLoading] = useState(true); // State to manage loading status

  const getTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      if (data.results.length > 0) {
        setTrending((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1);
        setLoading(false); // Set loading to false after data is loaded
      } else {
        sethasmore(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshhandler = async () => {
    if (Trending.length === 0) {
      getTrending();
    } else {
      setpage(1);
      setTrending([]);
      getTrending();
    }
  };

  useEffect(() => {
    refreshhandler();
  }, [category, duration]);

  return Trending.length > 0 ? (
    <div className="w-[full] h-screen">
      <div className="w-full h-[12vh]  p-3 flex  items-center  ">
        <div className="text-2xl max-md:text-4xl flex items-center font-black text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="mr-3 ml-3 ri-arrow-left-line text-[#6556CD] hover:text-[#6736CD]"
          ></i>
          <h4 className="max-lg:hidden mr-2"> Trending</h4>
        </div>
        <div className="w-[100%] ml-[3%]">
          <Topnav></Topnav>
        </div>
        <div className="flex  flex-col gap-2 mt-4  ">
          <Dropdown
            title="Catogary"
            option={["movie", "tv", "all"]}
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
        dataLength={Trending.length}
        next={getTrending}
        hasMore={true}
        loader={<Loading />}
      >
        <VerticalCard data={Trending}></VerticalCard>
      </InfiniteScroll>
      
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default Trending;
