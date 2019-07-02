import express from "express";
import cron from "node-cron";
import scrapUsers from "./tasks/users";

const app = express();
const port = 1338;

let currentPage = 1;
cron.schedule("* * * * *", () => {
  try {
    scrapUsers(currentPage);
    currentPage++;
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error(e.message);
  }
});

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Cron task running on ${port}`));
