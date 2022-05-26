const axios = require("axios");
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













// async function instagramPhotos() {
  //   // It will contain our photos' links
  //   // const res = []
  
  //   try {
  //     const userInfoSource = await axios.get(
  //       "https://www.instagram.com/therock/?__a=1"
  //     );
  
  //     // userInfoSource.data contains the HTML from Axios
  //     const jsonObject = userInfoSource.data
  //       .match(
  //         /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
  //       )[1]
  //       .slice(0, -1);
  
  //     const userInfo = JSON.parse(jsonObject);
  //     // Retrieve only the first 10 results
  //     const mediaArray = userInfo.entry_data.ProfilePage[0].graphql.user;
  
  //     console.log(mediaArray);
  //   } catch (error) {
  //     console.error(error);
  //     // throw Error(error);
  //   }
  // }
