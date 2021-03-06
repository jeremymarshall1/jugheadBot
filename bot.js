var Discord = require('discord.io');
var giphy = require('giphy-api')();
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `@`
    if (message.substring(0, 1) == '@') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        logger.info(evt);
        args = args.splice(1);        

        switch(cmd) {

            case 'gif':
                giphy.search({
                    q: args,
                    limit: 10
                }, function (err, res) {
                    // Random number to pick from search results
                    var ranPick = Math.floor(Math.random() * 5) + 1;

                    bot.sendMessage({
                        to: channelID,
                        message: res.data[ranPick].url
                    })
                });

            break;
            
         }
     }
});