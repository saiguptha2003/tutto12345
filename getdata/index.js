const puppeteer = require('puppeteer');

async function scrapeCodeChefProfile(username) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the user's profile page
    await page.goto(`https://www.codechef.com/users/${username}`);

    // Scrape ranking number
    const ranking = await page.$eval(
      '.rating-number',
      element => element.innerText,
    );

    // Scrape recently solved problems
    const solvedProblems = await page.evaluate(() => {
      const problems = [];
      document
        .querySelectorAll('.problems-solved .problemname a')
        .forEach(element => {
          problems.push(element.innerText);
        });
      return problems;
    });

    return {ranking, solvedProblems};
  } catch (error) {
    console.error('Error scraping CodeChef profile:', error);
    return null;
  } finally {
    await browser.close();
  }
}

// Usage example
const username = 'gkey_pandusai'; // Replace with the CodeChef username you want to scrape

scrapeCodeChefProfile(username).then(profileInfo => {
  if (profileInfo) {
    console.log('Ranking:', profileInfo.ranking);
    console.log('Recently Solved Problems:', profileInfo.solvedProblems);
  }
});
