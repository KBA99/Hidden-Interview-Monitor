const { requestScraper, requestOptions } = require("./index.js")

requestScraper()

  setInterval(() => {
    if (requestOptions.outStockText != requestOptions.current_text) {
      setTimeout(() => {
        requestOptions.current_text = requestOptions.websiteLink
        requestScraper();
      }, 300000);
    } else {
        requestScraper();
    }

  }, 5000)


