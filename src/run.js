import { requestScraper, requestOptions } from "./index.js"

const startAmazon = () => {
  setInterval(() => {
    requestScraper()
  }, 5000);
}

startAmazon()