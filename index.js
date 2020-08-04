const puppeteer = require('puppeteer');
const url = process.argv[2];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 10,
    // devtools: true,
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1366, height: 768});
  await page.goto(url);
  await page.waitForSelector('.flight-select__flight-date-picker__day__info', {timeout: 300000});

  const result = await page.evaluate(() => {
    const priceCards = document.querySelectorAll('.flight-select__flight-date-picker__day__info');
    return Array.from(priceCards).map(priceCard => {
      const priceElement = priceCard.querySelector('.flight-select__flight-date-picker__day__price');
      let price = null, currency = null;
      if (priceElement) {
        const priceElementText = priceElement.textContent.trim();
        const firstDigitIndex = priceElementText.search(/\d/);
        price = parseFloat(priceElementText.substring(firstDigitIndex));
        currency = priceElementText.substr(firstDigitIndex - 1, 1);
      }
      return {
        date: priceCard.querySelector('.flight-select__flight-date-picker__day__number').textContent.trim(),
        price,
        currency
      };
    });
  });

  console.log(result);

  await browser.close();
})();
