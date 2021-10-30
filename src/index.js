import dotenv from 'dotenv';
import request from 'request';
// TODO: SWITCH TO AXIOS
// TODO: FIX PROXY
import cheerio from 'cheerio';
dotenv.config()

export const proxy = {
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
};

export const requestOptions = {
  websiteLink: "https://www.amazon.co.uk/PlayStation-9395003-5-Console/dp/B08H95Y452/",
  outOfStockIdentifier: "#dp",
  outStockText: "Currently unavailable",
  monitorDelay: 5000,
  currentText: ""
};

export const options = {
  url: requestOptions.websiteLink,
  proxy: `http://${proxy.user}:${proxy.password}@${proxy.host}:${proxy.port}`,
};



const calcTimeTaken = ( end, start ) => {
  const elapsed = end - start;
  console.log(`
  Date: ${new Date().toString().replace(" GMT+0100", " ")}
  Time Taken: ${elapsed / 1000} seconds 
  \n`);
}

export const requestScraper = async () => {

  // TODO: destructure requestOptions
let { websiteLink, outOfStockIdentifier, outStockText,  monitorDelay, currentText } = requestOptions


  const start = Date.now();
  request({
    'url': websiteLink,
    'method': "GET",
    // 'proxy': options.proxy //PROXY IS optional
  }, 
  function(error, response, html){
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const buyBox = $(outOfStockIdentifier)
        .text()
        .replace(/\s\s+/g, "");
      if (buyBox.includes(outStockText)) {
        currentText = outStockText
        console.log(currentText)
        console.log(`${websiteLink} is displaying ${outStockText}`);
      } else {
        currentText = "In Stock"
        console.log(`Item is in stock at ${websiteLink}`);
      }
    } else {
      console.log(error)
    }

    const end = Date.now();
    calcTimeTaken( end, start )
  });
};

