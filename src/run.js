import { requestScraper, requestOptions } from "./index.js"

requestScraper()

  setInterval(() => {
    if (requestOptions.outStockText != requestOptions.currentText) {
      // Item in in stock -> you can add your discord webhook here
      setTimeout(() => {
        requestOptions.currentText = requestOptions.websiteLink
        requestScraper();
      }, 300000);
    } else {
        requestScraper();
    }

  }, 5000)


