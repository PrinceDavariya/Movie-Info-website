import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
 import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import HorizontalCards from "./HorizontalCards";
import Loading from "./Loading";
import Dropdown from "./Dropdown";
import { asycloadperson, removeperson } from "../store/action/personaction";

const PersonDetailss = () => {
    document.title = "SCSDB | Person Detailss";

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { info } = useSelector((state) => state.person);
    const dispatch = useDispatch();
    const [category, setcategory] = useState("movie");

    useEffect(() => {
        dispatch(asycloadperson(id));
        return () => {
            dispatch(removeperson());
        };
    }, [id]);
    return info ? (
        <div className="px-[10%] w-screen max-md:h-[fit-content] h-[180vh] bg-[#1F1E24] ">
            {/* Part 1 navigation */}
            <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl ">
                <Link
                    onClick={() => navigate(-1)}
                    className="hover:text-[#6556CD] ri-arrow-left-line"
                ></Link>
            </nav>

            <div className="w-full flex max-md:flex-wrap max-md:items-center max-md:justify-center ">
                {/* Part 2 left Poster and Detailss */}
                <div className="w-[20%] max-md:w-[80%] ">
                    <img
                        className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover"
                        src={`https://image.tmdb.org/t/p/original/${info.details.profile_path}`}
                        alt=""
                    />
                    <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
                    {/* Sosial Media Links */}
                    <div className="text-2xl text-white flex gap-x-5">
                        <a
                            target="_blank"
                            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                        >
                            <i className="ri-earth-fill"></i>
                        </a>

                        <a
                            target="_blank"
                            href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                        >
                            <i className="ri-facebook-circle-fill"></i>
                        </a>

                        <a
                            target="_blank"
                            href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                        >
                            <i className="ri-instagram-fill"></i>
                        </a>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${info.externalid.twitter_id}`}
                        >
                            <i className="ri-twitter-x-fill"></i>
                        </a>
                    </div>
                    {/* Personal Information */}
                    <h1 className="text-2xl text-zinc-400 font-semibold my-5">
                        Person Info
                    </h1>

                    <h1 className="text-lg text-zinc-400 font-semibold ">
                        Known For
                    </h1>
                    <h1 className=" text-zinc-400 ">
                        {info.details.known_for_department}
                    </h1>

                    <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                        Gender
                    </h1>
                    <h1 className=" text-zinc-400 ">
                        {info.details.gender === 2 ? "Male" : "Female"}
                    </h1>

                    <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                        Birthday
                    </h1>
                    <h1 className=" text-zinc-400 ">{info.details.birthday}</h1>

                    <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                        Deathday
                    </h1>
                    <h1 className=" text-zinc-400 ">
                        {info.details.deathday
                            ? info.details.deathday
                            : "Still Alive"}
                    </h1>

                    <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                        Place Of Birth
                    </h1>
                    <h1 className=" text-zinc-400 ">
                        {info.details.place_of_birth}
                    </h1>

                    <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
                        Also Known As
                    </h1>
                    <h1 className=" text-zinc-400 ">
                        {info.details.also_known_as.join(", ")}
                    </h1>
                </div>

                {/* Part 3 right Detailss and information  */}
                <div className="w-[80%] ml-[5%]">
                    <h1 className="text-6xl text-zinc-400 font-black my-5">
                        {info.details.name}
                    </h1>

                    <h1 className="text-xl text-zinc-400 font-semibold ">
                        Biography
                    </h1>
                    <p className="text-zinc-400 mt-3 ">
                        {info.details.biography}
                    </p>

                    <h1 className="mt-5 text-lg text-zinc-400 font-semibold ">
                        Known For
                    </h1>
                    <HorizontalCards data={info.combinecredit.cast} />

                    <div className="w-full flex justify-between mt-8">
                        <h1 className="mt-5 text-xl text-zinc-400 font-semibold ">
                            Acting
                        </h1>

                        <Dropdown
                            title="Catgory"
                            option={["tv", "movie"]}
                            func={(e) => setcategory(e.target.value)}
                        />
                    </div>

                    <div className="list-disc text-zinc-400 w-full h-[50vh] mt-5 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5">
                         {info[category + "credits"].cast.map((c, i) => (
                            <li
                                key={i}
                                className="hover:text-white p-5 rounded hover:bg-[#19191d]  duration-300 cursor-pointer"
                            >
                                <Link
                                    to={`/${category}/detailss/${c.id}`}
                                    className=""
                                >
                                    <span>
                                        {" "}
                                        {c.name ||
                                            c.title ||
                                            c.original_name ||
                                            c.original_title}
                                    </span>

                                    <span className="block ml-5 mt-2">
                                        {c.character &&
                                            `Character Name:  ${c.character}`}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default PersonDetailss;
