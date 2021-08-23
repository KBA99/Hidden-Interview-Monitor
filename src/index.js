require('dotenv').config()

require("dotenv").config();
const request = require("request");
const cheerio = require("cheerio");

  // const webScraper = async () => {
  //   try {
  //     let start = Date.now();
  //     result = await requestScraper();

  //     let end = Date.now();
  //     let elapsed = end - start;
  //     console.log(`
  //     Date: ${new Date().toString().replace(" GMT+0100", " ")}
  //     Time Taken: ${elapsed / 1000} seconds 
  //     \n`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

const proxy = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
};

let requestOptions = {
  websiteLink: "https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452/",
  outOfStockIdentifier: "#dp",
  outStockText: "Currently unavailable",
  monitor_delay: 5000,
};

let options = {
  url: requestOptions.websiteLink,
  proxy: `http://${proxy.user}:${proxy.password}@${proxy.host}:${proxy.port}`,
};


let requestScraper = () => {
  let start = Date.now();

  console.log("request here")
  result = request({
    'url': requestOptions.websiteLink,
    'method': "GET",
    // 'proxy': options.proxy //PROXY IS optional
  }, 
  function await (error, response, html) {
    if (!error && response.statusCode === 200) {
      // console.log(html)
      const $ = cheerio.load(html);
      const buyBox = $(requestOptions.outOfStockIdentifier)
        .text()
        .replace(/\s\s+/g, "");
      if (buyBox.includes(requestOptions.outStockText)) {
        console.log(`${requestOptions.websiteLink} is displaying ${requestOptions.outStockText}`);
      } else {
        console.log(`Item is in stock at ${requestOptions.websiteLink}`);
      }
      // console.log("end of request here")
    } else {
      console.log(error)
    }

    let end = Date.now();
    let elapsed = end - start;
    console.log(`
    Date: ${new Date().toString().replace(" GMT+0100", " ")}
    Time Taken: ${elapsed / 1000} seconds 
    \n`);
  });

};



requestScraper();

// module.exports = webScraper;
