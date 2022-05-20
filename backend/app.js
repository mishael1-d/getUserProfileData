const axios  = require("axios");
const prompts= require( "prompts");

(async () => {
  console.log("Starting Terminal scraper…");
  const response = await prompts({
    type: "text",
    name: "username",
    message: "Which User you like to scrape??",
  });
  console.log("Starting to scrape");
  //The input from the terminal can be found with response.username
  //now we take that result and call getFollowers
  getFollowers(response.username);
})();

async function getFollowers(username) {
  try {
    const { data } = await axios.get(
      `https://www.instagram.com/${username}/?__a=1`
    );
    user = data.graphql.user;
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
    console.log("USER NOT FOUND");
    // throw Error(error);
  }
}
