// Sidnav.js
import React from "react";
import { Link } from "react-router-dom";

function Sidnav({ isOpen, onClose }) {
  return (
    <div className={`w-1/5 h-full bg-[#1F1E24] text-white sidbar transition-all duration-300 ${isOpen ? '' : 'transform -translate-x-full '} `}>
      <h1 className="text-white font-black ml-4 mt-4 max-md:border-b-2">
        <i className="text-[#6556CD] ri-tv-fill text-2xl"></i>
        <span className="text-2xl max-md:text-[14px] "> SCSDB</span>
      </h1>
      <nav className="flex flex-col text-xl text-zinc-300 gap-2 p-2 max-md:p-1">
        <h1 className="font-bold text-xl mt-5 mb-3 ml-2 max-md:hidden ">New Feed</h1>
        <Link to="/trending" className="hover:bg-[#6556CD] duration-300 rounded-lg p-3 "><i className="ri-fire-fill mr-2"></i>Trending</Link>
        <Link to="/popular" className="hover:bg-[#6556CD] duration-300 rounded-lg p-3 mr-2"><i className="ri-bard-fill mr-2"></i>Popular</Link>
        <Link to="/movie" className="hover:bg-[#6556CD] duration-300 rounded-lg p-3 mr-2"><i className="ri-movie-2-fill mr-2"></i>Movies</Link>
        <Link  to="/tvshows" className="hover:bg-[#6556CD] duration-300 rounded-lg p-3 mr-2"><i className="ri-tv-2-fill mr-2"></i>Tv Shows</Link>
        <Link to="/person" className="hover:bg-[#6556CD] duration-300 rounded-lg p-3 mr-2"><i className="ri-team-fill mr-2"></i>People</Link>
      </nav>
      <hr className="border-1 w-[90%] m-auto  "/>
      <nav className="flex flex-col text-xl text-zinc-300 gap-2 p-1 max-md:hidden">
        <h1 className="font-bold text-xl mt-5 mb-3 ml-2 ">Website info</h1>
        <Link className="hover:bg-[#6556CD] duration-300 rounded-lg p-3 "><i  className="ri-information-2-fill mr-2 "></i>About SCSDB</Link>
        <Link className="hover:bg-[#6556CD] duration-300 rounded-lg p-3 mr-2"><i className="ri-phone-fill mr-2"></i>Contact Us</Link>
      </nav>
    </div>
  );
}

export default Sidnav;
