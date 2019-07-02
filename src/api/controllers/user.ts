import axios from "axios";
import fs from "fs";
import http from "http";
import path from "path";

import { NextFunction, Request, Response } from "express";
import ImageCacheService from "../service/ImageCacheService";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send("Missing userId parameter");
  }
  return axios.get(`https://reqres.in/api/users/${userId}`).then(
    (apiRes) => {
      return res.send(apiRes.data);
    }
  )
  .catch((e) => res.status(500).send(e.message));
};

export const getUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send("Missing userId parameter");
  }

  const sendByName = (fileName: string) => {
    if (!fileName) {
      throw new Error("Error downloading file");
    }

    const buffer = fs.readFileSync(fileName).toString("base64");
    return res.send(buffer);
  };

  if (ImageCacheService.fileExists(userId)) {
    return sendByName(ImageCacheService.getFilenameForUserId(userId));
  }

  return axios.get(`https://reqres.in/api/users/${userId}`).then(
    (apiRes) => ImageCacheService.createFile(userId, apiRes.data.data.avatar, sendByName))
  .catch((e) => res.status(500).send(e.message));
};

export const deleteUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send("Missing userId parameter");
  }

  try {
    fs.unlinkSync(ImageCacheService.getFilenameForUserId(userId));
    res.send("Success!");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
