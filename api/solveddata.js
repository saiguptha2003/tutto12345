const axios = require('axios');
const cheerio = require('cheerio');

async function getCodeChefProfileInfo(link) {
  const getProfileHTML = async username => {
    try {
      const response = await axios.get(link);
      return response.data;
    } catch (error) {
      console.error('Error fetching CodeChef profile page:', error);
      return null;
    }
  };

  const html = await getProfileHTML(username);

  if (html) {
    const $ = cheerio.load(html);

    // Scrape practice problems
    const practiceProblems = [];
    $('.problems-solved h5:contains("Practice") + p a').each(
      (index, element) => {
        practiceProblems.push($(element).text());
      },
    );

    // Scrape ranking number
    const ranking = $('.rating-number').text();
    const parts = link.split('/');
    let username = parts[parts.length - 1];
    return {
      ranking: ranking,
      practiceProblems: practiceProblems,
      username: username,
      success: true,
    };
  }

  return {success: false};
}
