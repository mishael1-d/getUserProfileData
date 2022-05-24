
const ig = require("instagram-scraping");
const express = require('express')
 
const bodyparser = require('body-parser')
 
const app = express()
 
app.use(bodyparser.urlencoded({ extended: false }))
 
app.use(bodyparser.json())
 
app.set('view engine','ejs')
 
app.get('/', (req, res) => {
    res.render('index',{data:''})
})
 
app.post('/getprofile', (req, res) => {
  // using username for scraping
    ig.scrapeUserPage(req.body.username).then((result) => {
        const user = result.user
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
    res.render('index',{data:result})
  });
})
 
app.listen(5000, () => {
    console.log('App is listening on Port 5000')
})