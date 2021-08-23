const { requestScraper, requestOptions } = require("./index.js")

requestScraper()

  setInterval(() => {
    if (requestOptions.outStockText != requestOptions.current_text) {
      // Item in in stock -> you can add your discord webhook here
      setTimeout(() => {
        requestOptions.current_text = requestOptions.websiteLink
        requestScraper();
      }, 300000);
    } else {
        requestScraper();
    }

  }, 5000)


