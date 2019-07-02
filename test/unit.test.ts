import { assert } from "chai";
import fs from "fs";
import request from "supertest";

import ImageCacheService from "../src/api/service/ImageCacheService";
import app from "../src/app";

const dummyUserId = "123123123";
const dummyUserAvatar = "https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg";

describe("Basic image cache service use", () => {
  beforeAll((done) =>  {
    fs.unlinkSync(ImageCacheService.getFilenameForUserId(dummyUserId));
    done();
  });
  it("The file that hasn't been created should not be there", (done) => {
    assert.equal(ImageCacheService.fileExists(dummyUserId), false);
    done();
  });

  it("The should be successfully created", (done) => {
    ImageCacheService.createFile(dummyUserId, dummyUserAvatar, (res) => {
      assert.isNotNull(res);
      done();
    });
  });

  it("The file that has been created should be there", (done) => {
    assert.equal(ImageCacheService.fileExists(dummyUserId), true);
    done();
  });

});
