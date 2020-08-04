# Wizz air scraper

A simple scraper using puppeteer to extract the prices on all displayed dates from the Wizz air **Select flights** page.

## Setup

```
yarn
```

## Usage

```
node index.js <WIZZ_AIR_SELECT_FLIGHTS_URL>
```

## Output example

```
node index.js https://wizzair.com/#/booking/select-flight/BVA/SOF/2020-08-05/null/1/0/0/0/null
```

```
[
  { date: 'Tue 04, Aug', price: null, currency: null },
  { date: 'Wed 05, Aug', price: 69.99, currency: '€' },
  { date: 'Thu 06, Aug', price: null, currency: null },
  { date: 'Fri 07, Aug', price: 49.99, currency: '€' },
  { date: 'Sat 08, Aug', price: null, currency: null },
  { date: 'Sun 09, Aug', price: null, currency: null },
  { date: 'Mon 10, Aug', price: 34.99, currency: '€' }
]
```

`NOTE` Depending on your location, it may take up to 45sec to extract the data.
I suspect it's because of the techinques employed by Wizz to discourage scraping.
