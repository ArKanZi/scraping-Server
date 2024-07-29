// controllers/doodsteamController.js
const doodsteamService = require("../services/doodsteamService");

const doodstream = async (req, res) => {
  const filterDomain = /^(https?:\/\/)([^\/]+)/;

  const altDomain = req.body.altDomain;
  let url = req.body.url;
  if (altDomain) {
    url = url.replace(filterDomain, altDomain);
  }

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  try {
    const data = await doodsteamService.doodstreamScraper(url);
    res.json({ message: "Scraped data successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to scrape data", error: error.message });
  }
};

module.exports = { doodstream };
