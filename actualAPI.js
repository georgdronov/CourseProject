import axios from "axios";

const getApiVersion = async () => {
  try {
    const response = await axios.get("https://cweb2-dev-ed.develop.my.salesforce.com/services/data/", {
      headers: {
        Authorization: `Bearer ${process.env.SALESFORCE_ACCESS_TOKEN}`,
      },
    });
    console.log("Available API versions:", response.data);
  } catch (error) {
    console.error("Error fetching API versions:", error);
  }
};

getApiVersion();