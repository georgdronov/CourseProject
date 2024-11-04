import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

console.log(username, password, domain); // Проверяем переменные окружения

const auth = {
  username: username,
  password: password,
};

export async function getUsers() {
  try {
    const baseUrl = "https://" + domain + ".atlassian.net";

    const config = {
      method: "get",
      url: baseUrl + "/rest/api/2/users",
      headers: { "Content-Type": "application/json" },
      auth: auth,
    };
    const response = await axios.request(config);
    console.log("Response data:", response.data); // Логируем данные ответа
    return response.data;
  } catch (error) {
    console.log("Error occurred:");
    console.log("Error message:", error.message);
    if (error.response) {
      console.log("Response data:", error.response.data);
      console.log("Status code:", error.response.status);
    } else {
      console.log("Error details:", error);
    }
  }
}

// Вызов функции
(async () => {
  await getUsers();
})();
