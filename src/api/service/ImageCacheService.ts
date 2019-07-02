
import fs from "fs";
import https from "https";

type CallbackFunction = (res?: string) => void;

class ImageCacheService {
  public static getFilenameForUserId(userId: string) {
    const fileName = `${ImageCacheService.FILES_LOCATION}${userId}.file`;
    return fileName;
  }

  public static fileExists(userId: string) {
    const fileName = ImageCacheService.getFilenameForUserId(userId);
    return fs.existsSync(fileName);
  }

  public static createFile(userId: string, fileURL: string, callback: CallbackFunction) {
    const fileName = ImageCacheService.getFilenameForUserId(userId);

    const file = fs.createWriteStream(fileName, {
      autoClose: true,
      encoding: "base64",
    });

    const request = https.get(fileURL, (response) => {
      if (response.statusCode !== 200) {
        return callback(null);
      }
      const stream = response.pipe(file);

      stream.on("close", () => callback(fileName));
    });

    request.on("error", () => callback(null));

  }
  private static FILES_LOCATION = "./cache/";

}

export default ImageCacheService;
