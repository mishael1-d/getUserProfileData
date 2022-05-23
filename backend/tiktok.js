const { gotScraping } = require("got-scraping");

(async function TikTokUpdate() {
  console.log("Tiktok scraping starting");
  const Tok = await gotScraping({ url: "https://tiktok.com/@therock" });

  const start = Tok.body.indexOf("ItemModule");
  const end = Tok.body.indexOf("UserPage");
  const tikTokF = Tok.body.substring(start, end)
  .replaceAll("\\u002F", "\\")
  .replaceAll(' ', '')
  // .replaceAll("\n", ',')
  // .replaceAll(', \n', '')
  console.log(tikTokF);
})();



// .slice(start, end)
// .replaceAll("\\u002F", "\\")
// .replace(',""', "");