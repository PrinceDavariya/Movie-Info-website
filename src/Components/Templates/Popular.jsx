import React, { useEffect ,useState} from "react";
import axios from "../Utils/Axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Dropdown from "./Dropdown";
 import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./Topnav";
import VerticalCard from "./VerticalCard";
 
function Popular() {
     document.title = "SCSDB || Popular"
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasmore, sethasmore] = useState(true);

  const getpopular = async () => {
    try {
      const { data } = await axios.get(
        `${category}/popular?page=${page}`
             );
       if (data.results.length > 0) {
        setpopular((prevstate) => [...prevstate, ...data.results]);
        setpage(page + 1);
      } else {
        sethasmore(false);
      }
      //   setTrending(data.results);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const refreshhandler = async () => {
    if (popular.length === 0) {
      getpopular();
    } else {
      setpage(1);
      setpopular([]);
      getpopular();
    }
  };
  useEffect(() => {
    refreshhandler();
  }, [category]);



  return popular ? (
    <div className="w-full h-screen">
      <div className="w-full h-[12vh]  p-3 flex  items-center  ">
      <div className="text-2xl max-md:text-4xl flex items-center font-black text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="mr-3 ml-3 ri-arrow-left-line text-[#6556CD] hover:text-[#6736CD]"
          ></i>
          <h4 className="max-lg:hidden mr-2"> Popular  </h4>
        </div>
        <div className="w-[115%] ">
          <Topnav></Topnav>
        </div>
        <div className="flex  flex-col gap-2 mt-4  ">
          <Dropdown
            title="Catogary"
            option={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          > </Dropdown>
        </div>
      </div>

      <InfiniteScroll
      dataLength={popular.length}
      next={getpopular}
      hasMore={true}
        loader={
          <>
            <h1>Loading..</h1>
          </>
        }
      >
        <VerticalCard data={popular} title={category} ></VerticalCard>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading></Loading>
  );
}

export default Popular;
