const getData = require('./../get_data');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (req, reply) => {
    getData((err, jokes) => {
      if (err) {
        return reply('Something went wrong sorry!');
      }
      const options = { jokes };
      jokes.forEach((joke) => {
        if (joke.username === req.auth.credentials.username) {
          joke.self = true;
        }
      });
      console.log(jokes);
      if (req.auth.isAuthenticated) {
        options.credentials = req.auth.credentials;
      }
      reply.view('index', options);
    });
  },

};
