import React, { useEffect, useState } from "react";
import axios from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./Topnav";
 import VerticalCard from "./VerticalCard"
function People() {
  document.title = "SCSDB || Popular";
  const navigate = useNavigate();
  const [popular, setPopular] = useState([]);
  const [category, setCategory] = useState("popular");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPopular = async () => {
    try {
      const { data } = await axios.get(`person/${category}?page=${page}`);
       if (data.results.length > 0) {
        setPopular((prevState) => [...prevState, ...data.results]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshHandler = async () => {
    setPage(1);
    setPopular([]);
    setHasMore(true); // Resetting hasMore to true
    getPopular();
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular !== null && popular !== undefined ? (
    <div className="w-full h-screen overflow-x-hidden">
      <div className="w-full h-[12vh] p-3 flex items-center">
      <div className="text-2xl max-md:text-4xl flex items-center font-black text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="mr-3 ml-3 ri-arrow-left-line text-[#6556CD] hover:text-[#6736CD]"
          ></i>
          <h4 className="max-lg:hidden mr-2"> People</h4>
        </div>
        <div className="w-[115%] ">
          <Topnav></Topnav>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={getPopular}
        hasMore={hasMore} // Using hasMore state variable
        loader={<h1>Loading..</h1>}
      >
        <VerticalCard data={popular} title="person"></VerticalCard>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default People;
