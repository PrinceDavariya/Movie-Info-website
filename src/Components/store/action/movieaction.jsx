export { removemovie } from "../reducers/movieslice";
import axios from "../../Utils/Axios";
import { loadmovie } from "../reducers/movieslice";

export const asycloadmovie = (id) => async (dispatch, getstate) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
     let alldetail = {
      details: details.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(m => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
     dispatch(loadmovie(alldetail))
   } catch (error) {
    console.log("Error", error);
  }
};
