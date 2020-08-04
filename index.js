const puppeteer = require('puppeteer');

const URL = 'https://wizzair.com/#/booking/select-flight/BVA/SOF/2020-08-05/null/1/0/0/0/null';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 10,
    // devtools: true,
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1366, height: 768});
  await page.goto(URL);
  await page.waitForSelector('.flight-select__flight-date-picker__day__info', {timeout: 100000});

  const result = await page.evaluate(() => {
    const priceCards = document.querySelectorAll('.flight-select__flight-date-picker__day__info');
    return Array.from(priceCards).map(priceCard => {
      const priceElement = priceCard.querySelector('.flight-select__flight-date-picker__day__price');
      return {
        date: priceCard.querySelector('.flight-select__flight-date-picker__day__number').textContent.trim(),
        price: priceElement ? priceElement.textContent.trim() : null
      };
    });
  });

  console.log(result);

  await browser.close();
})();
