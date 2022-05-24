const axios  = require("axios");
const prompts= require( "prompts");
// const ig = require("instagram-scraping")

(async () => {
  console.log("Starting Terminal scraper…");
  const response = await prompts({
    type: "text",
    name: "username",
    message: "Which User you like to scrape??",
  });
  console.log("Starting to scrape");
  //The input from the terminal can be found with response.username
  //now we take that result and call getUserData
  getUserData(response.username);
})();

async function getUserData(username) {
  try {
    const { data } = await axios.get(
      `https://www.instagram.com/${username}/?__a=1`
    );
    const user = data.graphql.user;
    const {
      biography,
      edge_followed_by,
      edge_follow,
      is_private,
      is_verified,
      profile_pic_url,
      edge_owner_to_timeline_media,
    } = user;

    const graphql = {
      biography,
      edge_followed_by,
      edge_follow,
      is_private,
      is_verified,
      profile_pic_url,
      edge_owner_to_timeline_media,
    };
    console.log(graphql);
  } catch (error) {
    console.error(error);
    // throw Error(error);
  }
}
