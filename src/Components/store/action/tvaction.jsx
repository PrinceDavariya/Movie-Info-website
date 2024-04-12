export { removetv } from "../reducers/tvslice";
import axios from "../../Utils/Axios";
import { loadtv } from "../reducers/tvslice";

export const asycloadtv = (id) => async (dispatch, getstate) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
     let alldetail = {
      details: details.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(m => m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    dispatch(loadtv(alldetail))
   } catch (error) {
    console.log("Error", error);
  }
};
