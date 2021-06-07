import axios from "axios";
import { Order } from "../types";

const getUrl = "https://cloud-storage-prices-moberries.herokuapp.com/prices";
const postUrl = "https://httpbin.org/post";

export const getPrices = async () => {
  try {
    const { data } = await axios.get(getUrl);
    return data;
  } catch (error) {
    return error;
  }
};

export const setOrder = async (order: Order) => {
  try {
    const { status } = await axios.post(postUrl, order);
    return status;
  } catch (error) {
    return error;
  }
};
