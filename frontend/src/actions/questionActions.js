import axios from "axios";
import { env } from "../configs/env";

export function createQuestion(question) {
  return {
    type: "CREATE_QUESTION",
    payload: axios(env.NODE_ENV.url + "/questions", {
      method: "POST",
      data: JSON.stringify(question),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      }
    })
  };
}

export function getQuestionsPage(page) {
  return {
    type: "GET_QUESTIONS_PAGE",
    payload: axios(env.NODE_ENV.url + "/questions?page=" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      }
    })
  };
}

export function getMqQuestionsPage(page) {
  return {
    type: "GET_QUESTIONS_PAGE",
    payload: axios(env.NODE_ENV.url + "/questions/myquestions?page" + page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      }
    })
  };
}

export function getQuestion(id) {
  return {
    type: "GET_QUESTION",
    payload: axios(env.NODE_ENV.url + "/questions/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      }
    })
  };
}

export function voteQuestionUp(id, index) {
  return {
    type: "VOTE_QUESTION_UP",
    payload: axios(env.NODE_ENV.url + "/questions/" + id, {
      method: "PUT",
      data: { vote: 1 },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      } 
    }).then(() => {return index}) 
  };
}

export function voteQuestionDown(id, index) {
  return {
    type: "VOTE_QUESTION_DOWN",
    payload: axios(env.NODE_ENV.url + "/questions/" + id, {
      method: "PUT",
      data: { vote: -1 },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      } 
    }).then(() => {return index}) 
  };
}

export function getHotQuestions(){
  return {
    type: "GET_HOT_QUESTIONS",
    payload: axios(env.NODE_ENV.url + "/questions/hot", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Barer " + sessionStorage.getItem("token")
      } 
    })
  };
}