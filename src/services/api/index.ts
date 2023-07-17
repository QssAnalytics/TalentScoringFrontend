import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStages = async () => {
  const { data } = await axiosInstance.get("stage-parent-lists/");
  return data?.stages;
};

export const getQuestions = async () => {
  const { data } = await axiosInstance.get("question-lists/umumi-suallar/");
  return data?.questions[0]?.questions;
};
