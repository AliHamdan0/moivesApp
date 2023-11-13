import axios from "axios";
import { APIKEY } from "@env";
function useFetch() {
  const auth =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yjk2OGZlMThjZDZlN2U4MWNjMDkwYjZiOWQ4MGI4MSIsInN1YiI6IjY1NDNmNTQ1NmJlYWVhMDBlYWY2NjAzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Oksqyk6gBQCi05phJ2FvQ4brdXTVosNEX0b6I7n93U4";
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${auth}`,
  };
  async function getFetch(url) {
    let response = await axios.get(url, {
      headers: headers,
    });
    if (response?.status == 200 || response?.status == 201)
      return Promise.resolve(response);
    else {
      return Promise.reject("");
    }
  }
  ////
  async function postFetch(url, body = {}) {
    try {
      const response = await axios.post(url, body, {
        headers: headers,
      });
      if (response?.status == 200 || response?.status == 201)
        return Promise.resolve(response);
      else {
        return Promise.reject("");
      }
    } catch (error) {
      return Promise.reject("");
    }
  }

  return [getFetch];
}
export default useFetch;
