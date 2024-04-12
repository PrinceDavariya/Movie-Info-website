export { removeperson } from "../reducers/personslice";
import axios from "../../Utils/Axios";
import { loadperson } from "../reducers/personslice";

export const asycloadperson = (id) => async (dispatch, getstate) => {
  try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combinecredit = await axios.get(`/person/${id}/combined_credits`);
    const moviecredits = await axios.get(`/person/${id}/movie_credits`);
    const tvcredits = await axios.get(`/person/${id}/tv_credits`);
   
    
    let alldetail = {
      details: details.data,
      externalid: externalid.data,
      combinecredit : combinecredit.data,
      tvcredits : tvcredits.data ,
      moviecredits : moviecredits.data   
    };
     dispatch(loadperson(alldetail));
  } catch (error) {
    console.log("Error", error);
  }
};
