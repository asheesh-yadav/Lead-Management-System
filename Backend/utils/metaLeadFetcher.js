import axios from "axios";

export const fetchMetaLeadDetails = async (leadgenId) => {
  const url = `https://graph.facebook.com/v19.0/${leadgenId}`;

  const response = await axios.get(url, {
    params: {
      access_token: process.env.META_PAGE_ACCESS_TOKEN,
    },
  });

  return response.data.field_data;
};
