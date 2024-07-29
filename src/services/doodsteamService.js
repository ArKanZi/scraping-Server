const axios = require("axios");

async function doodstreamScraper(url) {
  function getRandomString(length = 10) {
    const allowedChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += allowedChars.charAt(
        Math.floor(Math.random() * allowedChars.length)
      );
    }
    return result;
  }

  function doodHeaders(host) {
    return {
      "User-Agent": "Aniyomi",
      Referer: `https://${host}/`,
    };
  }
  const response = await axios.get(url);

  const newUrl = response.request.res.responseUrl;
  const quality = "Doodstream";
  const doodHost = new URL(newUrl).hostname;
  console.log(response);
  const content = response.data;
  if (!content.includes("'/pass_md5/")) return null;

  const md5 = content.split("'/pass_md5/")[1].split("',")[0];
  const token = md5.split("/").pop();
  const randomString = getRandomString();
  const expiry = Date.now();

  const videoUrlStartResponse = await axios.get(
    `https://${doodHost}/pass_md5/${md5}`,
    {
      headers: { Referer: newUrl },
    }
  );
  const videoUrl = `${videoUrlStartResponse.data}${randomString}?token=${token}&expiry=${expiry}`;
  return {
    newUrl,
    quality,
    videoUrl,
    headers: doodHeaders(doodHost),
  };
}
module.exports = { doodstreamScraper };
