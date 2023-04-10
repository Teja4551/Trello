import { makeStyles } from "@mui/styles";
import axios from "axios";


export const useStyles = makeStyles({
    font: {
        fontFamily: "Roboto !important",
    },
});

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);
  
      dispatch({ type: COMMENT, payload: data });
  
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };