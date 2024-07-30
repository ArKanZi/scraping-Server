const { chromium } = require("playwright");

async function doodstreamScraper(url) {
  const quality = "Doodstream";
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  const timestamp = Date.now();
  await page.getByRole("link", { name: "Download Now" }).click();
  const newUrl = page.url();
  const hostname = new URL(newUrl).hostname;
  await page.waitForTimeout(5000);
  await page.getByRole("link", { name: "High quality" }).click();
  await page.screenshot({
    path: `./src/images/screeenshot-${timestamp}.png`,
    fullPage: true,
  });
  const videoUrl = await page
    .getByRole("link", { name: "Download file" })
    .getAttribute("href");
  await browser.close();
  function doodHeaders(host) {
    return {
      "User-Agent": "Aniyomi",
      Referer: `https://${host}/`,
    };
  }
  return {
    newUrl,
    quality,
    videoUrl,
    headers: doodHeaders(hostname),
  };
}

module.exports = { doodstreamScraper };
