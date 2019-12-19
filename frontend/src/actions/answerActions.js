import axios from "axios";
import { env } from "../configs/env";

export function createAnswer(answer) {
  return {
    type: "CREATE_ANSWER",
    payload: axios(env.NODE_ENV.url + "/answers", {
      method: "POST",
      data: JSON.stringify(answer),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      }
    })
  };
}

export function getAnswerPage(questionId, page) {
  return {
    type: "GET_ANSWERS",
    payload: axios(env.NODE_ENV.url + "/answers/"+questionId+"?page="+page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      }
    })
  };
}


export function voteAnswerUp(id, index) {
  return {
    type: "VOTE_ANSWER_UP",
    payload: axios(env.NODE_ENV.url + "/answers/" + id, {
      method: "PUT",
      data: { vote: 1 },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      } 
    }).then(() => {return index}) 
  };
}

export function voteAnswerDown(id, index) {
  return {
    type: "VOTE_ANSWER_DOWN",
    payload: axios(env.NODE_ENV.url + "/answers/" + id, {
      method: "PUT",
      data: { vote: -1 },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      } 
    }).then(() => {return index}) 
  };
}