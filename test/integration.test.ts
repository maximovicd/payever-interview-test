import request from "supertest";

import app from "../src/app";

describe("Basic requests", () => {
  it("Should return 404 on missing route", () => {
    return request(app).get("/unknown")
      .expect(404);
  });
  it("Should return valid code for known get user route", () => {
    return request(app).get("/api/user/1")
      .expect(200);
  });
  it("Should return valid code for known get user avatar route", () => {
    return request(app).get("/api/user/1/avatar")
      .expect(200);
  });
  it("Should return valid code for known delete user avatar route", () => {
    return request(app).delete("/api/user/1/avatar")
      .expect(200);
  });
});
