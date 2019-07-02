import axios from "axios";
import fs from "fs";

const USERS_FILE = "./scrapped_users.json";

const scrapUsers = (page: number) => {
  return axios.get(`https://reqres.in/api/users?page=${page}`)
    .then((res) => {
      const users = res.data.data;
      if (users) {
        for (const u of users) {
          fs.appendFileSync(USERS_FILE, JSON.stringify(u) + ",\r\n");
        }
      }
    })
    .catch((e) => { throw e; });
};

export default scrapUsers;
