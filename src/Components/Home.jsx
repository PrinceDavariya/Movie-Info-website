import React, { useState, useEffect } from "react";
import Sidnav from "./Templates/Sidnav";
import Topnav from "./Templates/Topnav";
import axios from "../Components/Utils/Axios";
import Header from "./Templates/Header";
import HorizontalCards from "./Templates/HorizontalCards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Templates/Loading";

function Home() {
  document.title = "SCSDB | Homepage";

  const [Wallpaper, setWallpaper] = useState(null);
  const [Trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");
  const [isSidnavOpen, setIsSidnavOpen] = useState(false);

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData = data.results[Math.floor(Math.random() * data.results.length)];
      setWallpaper(randomData);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getTrending();
    if (!Wallpaper) {
      getHeaderWallpaper();
    }
  }, [category]);

  const toggleSidnav = () => {
    setIsSidnavOpen(!isSidnavOpen);
  };

  return Wallpaper && Trending && Header ? (
    <>
      <Sidnav isOpen={isSidnavOpen} onClose={toggleSidnav} />
      <div className={` bg-[#1F1E24] ${isSidnavOpen ? ' w-[80%]  ' : 'w-full ml-[-19%] max-sm:ml-[-29%]'} transition-all duration-300 h-full overflow-x-hidden m-2`}>
        <Topnav toggleSidnav={toggleSidnav} />
        <Header data={Wallpaper} />
        <div className="flex mt-3 mb-3 items-center justify-between p-4">
          <h1 className="text-2xl text-center text-white font-bold">Trending</h1>
          <Dropdown title="Filter" option={["tv", "movie", "all"]} func={(e) => setCategory(e.target.value)} />
        </div>
        <HorizontalCards data={Trending} func={setCategory} />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
