// ## Tweet Controller
const mongoose = require("mongoose");
const Tweet = mongoose.model("Tweet");
const User = mongoose.model("User");

exports.tweetList = (req, res) => {
  const page = (req.param("page") > 0 ? req.param("page") : 1) - 1;
  const perPage = 15;
  const options = {
    perPage: perPage,
    page: page
  };
  let tweets, count;
  Tweet.limitedList(options)
    .then( result => {
      tweets = result;
      return Tweet.count();
    })
    .then( result => {
      count = result;
      return res.send(tweets);
    })
    .catch( error => {
      return res.render("500");
    });
}

exports.usersList = (req, res) => {
  const page = (req.param("page") > 0 ? req.param("page") : 1) - 1;
  const perPage = 15;
  const options = {
    perPage: perPage,
    page: page
  };
  let users, count;
  User.list(options)
    .then( result => {
      users = result;
      return User.count();
    })
    .then( result => {
      count = result;
      return res.send(users);
    })
    .catch( error => {
      return res.render("500");
    });
}
