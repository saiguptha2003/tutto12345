const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = mongoose.model('users');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  const {
    username,
    email,
    password,
    codecheflink,
    codeforceslink,
    geeksforgeekslink,
    leetcodelink,
    hackerranklink,
    hackerearthlink,
  } = req.body;

  if (!email || !password || !username) {
    return res.status(422).json({error: 'Please fill all the fields'});
  }

  Users.findOne({email: email})
    .then(async savedUser => {
      if (savedUser) {
        return res
          .status(422)
          .json({error: 'User already exists with that email'});
      }

      const user = new Users({
        username,
        email,
        password,
        codecheflink,
        codeforceslink,
        geeksforgeekslink,
        leetcodelink,
        hackerranklink,
        hackerearthlink,
      });

      user
        .save()
        .then(user => {
          const token = jwt.sign(
            {_id: user._id.tostring()},
            'pandurangasaiguptah',
          );
          res.json({token});
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post('/login', (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(422).json({error: 'Please fill all the fields'});
  } else {
    Users.findOne({email: email})
      .then(savedUser => {
        if (!savedUser) {
          return res.status(422).json({error: 'Invalid email or password'});
        } else {
          console.log(savedUser);
          if (savedUser.password === password) {
            savedUser.success = true;
            savedUser._id = savedUser._id.toString();
            res.json(savedUser);
          } else {
            return res.status(422).json({error: 'Invalid email or password'});
            res.json({success: false});
            console.log('Invalid email or password');
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
});

router.post('/getdata', (req, res) => {
  const {link} = req.body;
  console.log('saiguptha', link);
  const username = link.split('/')[4];
  console.log(username);
  getCodeChefProfileInfo(link).then(profileInfo => {
    if (profileInfo) {
      console.log('Ranking:', profileInfo.ranking);
      console.log('Recently Solved Problems:', profileInfo.practiceProblems);
      console.log('Username:', profileInfo.username);
      console.log(profileInfo);
      res.json(profileInfo);
    }
  });
});

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

  const html = await getProfileHTML(link);

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
    const stars = getStarRating(ranking);
    let username = parts[parts.length - 1];
    return {
      ranking: ranking,
      practiceProblems: practiceProblems,
      username: username,
      stars: stars,
      success: true,
    };
  }

  return {success: false};
}

module.exports = router;
function getStarRating(rating) {
  if (rating >= 2000) {
    return 5;
  } else if (rating >= 1800) {
    return 4;
  } else if (rating >= 1600) {
    return 3;
  } else if (rating >= 1400) {
    return 2;
  } else {
    return 1;
  }
}
