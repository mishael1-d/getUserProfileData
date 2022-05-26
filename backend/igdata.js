const express = require('express')
const puppeteer = require('puppeteer')
 
class InstagramClient {
  async start() {
    this.browser = await puppeteer.launch({
      headless: true //When set to true, a new browser window will ge opened
    })
  }
 
  async stop() {
    await this.browser.close()
  }
 
  async getFollowers(username) {
    if (!this.browser) throw new Error('Browser not started')
 
    const page = await this.browser.newPage()
    await page.goto(`https://instagram.com/${username}/`)
 
    const pageExists = await page.evaluate(_ => {
      return document.querySelector('.error-container') === null
    })
    if (!pageExists) {
      throw new Error(`Page of ${username} doesn't exist`)
    }
 
    //Wait until the page got completly renderer
    await page.waitForSelector('h1')
 
    const followers = await page.evaluate(username => {
      //This code will get executed on the instagram page
 
      //Get the number of followers
      const followers = document.querySelector(`a[href="/accounts/login/?next=%2F${username}%2Ffollowers%2F&source=followed_by_list"]`).querySelector('span').innerText
      //Return the number of followers back to the node process
      return followers
    }, username)
 
    page.close()
 
    return followers
  }
}
 
const client = new InstagramClient()
const app = express()
 
app.get('/:instagramName/followers', async (request, response) => {
  const instagramName = request.params.instagramName
  try {
    const followers = await client.getFollowers(instagramName)
    response.json({
      success: true,
      followers: followers
    })
  } catch (e) {
    response.json({
      success: false,
      error: e.toString()
    })
    return
  }
})
 
async function start() {
  const PORT = 3000
  await client.start()
  app.listen(PORT, _ =>
    console.log(`Server is listening on port ${PORT}
Goto http://localhost:${PORT}/teslamotors/followers to try it out`)
  )
}
 
start()