import puppeteer from 'puppeteer';

const verbose = false;

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  // Open a new tab
  const page = await browser.newPage(); 

  // Visit the URL and wait until network connections are completed
  const url = 'https://www.example.org/';
  if (verbose) {
    console.error({ url });
  }
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Interact with the DOM and retrieve data
  const results = await page.evaluate(() => {
    const selector = 'body > div > p';
    return [...document.querySelectorAll(selector)].map(el => ({
      raw: el.textContent,
      content: el.innerText,
      link: el.querySelector('a') ? el.querySelector('a')?.href : null,
    }));
  });

  // Close the browser instance to clean up the memory
  await browser.close();

  // Output results
  console.log(results);
})();
