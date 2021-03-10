require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fetch = require('node-fetch');
const Themeparks = require('themeparks');
bot.login(TOKEN);

String.prototype.stripSlashes = function(){
    return this.replace(/\\(.)/mg, "$1");
}

const DisneyWorldMagicKingdom = new Themeparks.Parks.WaltDisneyWorldMagicKingdom(),
      DisneyWorldEpcot = new Themeparks.Parks.WaltDisneyWorldEpcot(),
      DisneyWorldAnimalKingdom = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom(),
      DisneyWorldHollywoodStudios = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();



/* CHANNEL IDS */
//logs 807753524938801192

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  let $usertag = msg.member.user.tag,
      $discordID = '608316909951254538';

  if (msg.mentions.has(bot.user) && !msg.content.includes('here')) {
    if (msg.content.includes('doing')) {
      msg.channel.send('Hey there, '+msg.author.username+'. I am just hanging around. ***[Gets a bur on his finger]***  Aah! Pricker bushes got me! Gator down! Gator down! I can feel the darkness closing in! So cold!');
      return;
    }

    if (msg.content.includes('what\'s up')) {
      msg.channel.send('*[Louis jumps out of the bush]*  I found a stick! *[Naveen and Tiana give him a blank stare]*');
      return;
    }

    if (msg.content.includes('mama odie')) {
      msg.channel.send('Mama Odie. She is the voodoo queen of the Bayou. She got magic and spells of kind a hoodoo.');
      return;
    }

    if (msg.content.includes('Do you like the music') ||
        msg.content.includes('Is my music good') ||
        msg.content.includes('How is my music selection')
      ) {
      msg.channel.send('You better believe it, '+msg.author.username+'. This music is the tops!');
      return;
    }

    if (msg.content.includes('park hours') && (msg.content.includes('wdw') || msg.content.includes('walt disney world'))) {
      msg.channel.send('wdw');
      return;
    }

    if (msg.content.includes('park hours') && (msg.content.includes('dlp') || msg.content.includes('disneyland'))) {
      msg.channel.send('dlp');
      return;
    }

    if (msg.content.includes('park hours')) {
      if (!msg.content.includes('wdw') ||
          !msg.content.includes('walt disney world') ||
          !msg.content.includes('disneyland')
        ) {

        msg.channel.send({embed: {
            color: 3066993,
            title: '',
            description: '@'+msg.author.username+', please react with which Disney Park?',
            fields: [{
                name: "Walt Disney World",
                value: '1️⃣'
              },
              {
                name: "Disneyland",
                value: '2️⃣'
              }
            ],
            timestamp: new Date()
          }
        });
      }
      return;
    }

    let random = Math.floor((Math.random() * 7) + 1);
    if (random === 1) {
      msg.channel.send('Why hello there, '+msg.author.username);
    } else if (random === 2) {
      msg.channel.send(msg.author.username+', are you talking about me?');
    } else if (random === 3) {
      msg.channel.send(msg.author.username+', how are ya?');
    } else if (random === 4) {
      msg.channel.send('Hello, '+msg.author.username+'. What brought you here to the bayou?');
    } else if (random === 5) {
      msg.channel.send('Hello, '+msg.author.username+'. Do you know how to play an instrument?');
    } else if (random === 6) {
      msg.channel.send('Hello, '+msg.author.username+'. Did ya know the bayou is the best jazz school in the world');
    } else if (random === 7) {
      msg.channel.send('Hello, '+msg.author.username+'. Boy, I would love to be jamming with the big boys.');
    } else {
      msg.channel.send('Hello, '+msg.author.username+'. I sure hope you are havin\' a great day!');
    }
  }

  if (msg.content.startsWith('!ride')) {
    const prefix = '!';
    if (msg.content[0] === prefix) {
      const args = msg.content.trim().split(/ +/g);
      const cmd = args[0].slice(prefix.length).toLowerCase();

      if (args[1].toLowerCase() === 'mk' || args[1].toLowerCase() === 'magic kingdom') {
        msg.channel.send(msg.author.username+', which attraction at **Magic Kingdom**?')
        .then(() => {
          msg.channel.awaitMessages(response => response.content !== '', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
              DisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {
                let $output = '';
                  rideTimes.forEach((ride) => {
                    if (ride.name.toLowerCase().indexOf(collected.first().content.toLowerCase()) > -1) {
                      $output += ride.name+': '+ride.waitTime+' minute wait ('+ride.status+')\r\n';
                    }
                    //console.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
                  });
                  if ($output === '') {
                    $output = 'I could not find that attraction. 😅 Please try again.';
                  }
                  msg.channel.send($output);
              }).catch((error) => {
                  console.error(error);
                  msg.channel.send('I lost my trumpet and have to look for it. 😅 Please try again later.');
              }).then(() => {
                  //setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
              });
            })
            .catch(() => {
              //msg.channel.send('There was no collected message that passed the filter within the time limit!');
            });
        });
      } else if (args[1].toLowerCase() === 'epcot') {
        msg.channel.send(msg.author.username+', which attraction at **EPCOT**?')
        .then(() => {
          msg.channel.awaitMessages(response => response.content !== '', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
              DisneyWorldEpcot.GetWaitTimes().then((rideTimes) => {
                let $output = '';
                  rideTimes.forEach((ride) => {
                    if (ride.name.toLowerCase().indexOf(collected.first().content.toLowerCase()) > -1) {
                      $output += ride.name+': '+ride.waitTime+' minute wait ('+ride.status+')\r\n';
                    }
                    //console.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
                  });
                  if ($output === '') {
                    $output = 'I could not find that attraction. 😅 Please try again.';
                  }
                  msg.channel.send($output);
              }).catch((error) => {
                  console.error(error);
                  msg.channel.send('I lost my trumpet and have to look for it. 😅 Please try again later.');
              }).then(() => {
                  //setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
              });
            })
            .catch(() => {
              //msg.channel.send('There was no collected message that passed the filter within the time limit!');
            });
        });
      } else if (args[1].toLowerCase() === 'ak' || args[1].toLowerCase() === 'dak' || args[1] === 'animal kingdom') {
        msg.channel.send(msg.author.username+', which attraction at **Disney\'s Animal Kingdom**?')
        .then(() => {
          msg.channel.awaitMessages(response => response.content !== '', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
              DisneyWorldAnimalKingdom.GetWaitTimes().then((rideTimes) => {
                let $output = '';
                  rideTimes.forEach((ride) => {
                    if (ride.name.toLowerCase().indexOf(collected.first().content.toLowerCase()) > -1) {
                      $output += ride.name+': '+ride.waitTime+' minute wait ('+ride.status+')\r\n';
                    }
                    //console.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
                  });
                  if ($output === '') {
                    $output = 'I could not find that attraction. 😅 Please try again.';
                  }
                  msg.channel.send($output);
              }).catch((error) => {
                  console.error(error);
                  msg.channel.send('I lost my trumpet and have to look for it. 😅 Please try again later.');
              }).then(() => {
                  //setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
              });
            })
            .catch(() => {
              //msg.channel.send('There was no collected message that passed the filter within the time limit!');
            });
        });
      } else if (args[1] === 'dhs' || args[1] === 'hollywood studios') {
        msg.channel.send(msg.author.username+', which attraction at **Disney\'s Hollywood Studios**?')
        .then(() => {
          msg.channel.awaitMessages(response => response.content !== '', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
              DisneyWorldHollywoodStudios.GetWaitTimes().then((rideTimes) => {
                let $output = '';
                  rideTimes.forEach((ride) => {
                    if (ride.name.toLowerCase().indexOf(collected.first().content.toLowerCase()) > -1) {
                      $output += ride.name+': '+ride.waitTime+' minute wait ('+ride.status+')\r\n';
                    }
                    //console.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
                  });
                  if ($output === '') {
                    $output = 'I could not find that attraction. 😅 Please try again.';
                  }
                  msg.channel.send($output);
              }).catch((error) => {
                  console.error(error);
                  msg.channel.send('I lost my trumpet and have to look for it. 😅 Please try again later.');
              }).then(() => {
                  //setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
              });
            })
            .catch(() => {
              //msg.channel.send('There was no collected message that passed the filter within the time limit!');
            });
        });
      } else {
        msg.channel.send({embed: {
            color: 3066993,
            title: '',
            description: msg.author.username+', I couldn\'t find the park you wanted.',
            fields: [{
                name: "For Magic Kingdom",
                value: 'type "mk"'
              },
              {
                name: "for EPCOT",
                value: 'type "epcot"'
              },
              {
                name: "for Disney's Hollywood Studios'",
                value: 'type "dhs" or "hollywood studios"'
              },
              {
                name: "for Disney's Animal Kingdom'",
                value: 'type "dak" or "animal kingdom"'
              }
            ],
            timestamp: new Date()
          }
        });
      }
    }
    return;
  }

  /* ADD POINTS TO D-COT ACCOUNT */
  if (msg.content.startsWith('!leaderboard')) {
    //mee6 https://mee6.xyz/api/plugins/levels/leaderboard//608316909951254538
  }

  /* SYNC ROLES */
  if (msg.content.startsWith('!role')) {
    return fetch('https://www.d-cot.com/api/?task=get_role&usertag='+encodeURIComponent($usertag), {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let data = responseJson;
      if (data) {
        bot.channels.cache.find(channel => channel.name === 'logs').send(msg.author.username+' used the !role command ('+new Date()+').');

        if (data[0].is_supporter === 1) {
          if (!msg.member.roles.cache.has('680122314029006960')) {
            const role = msg.guild.roles.cache.find(role => role.name === 'Supporter');
            msg.member.roles.add(role);

            msg.channel.send({embed: {
                color: 3066993,
                description: msg.author.username+' has been assigned the **Supporter** role.',
              }
            });
          } else {
            msg.channel.send({embed: {
                color: 3066993,
                description: msg.author.username+' is already assigned the **Supporter** role.',
              }
            });
          }
        } else {
          if (msg.member.roles.cache.has('680122314029006960')) {
            const role = msg.guild.roles.cache.find(role => role.name === 'Supporter');

            msg.member.roles.remove(role);
            msg.channel.send({embed: {
                color: 3066993,
                description: msg.author.username+' was removed from the **Supporter** role.',
              }
            });
          }
        }
        if (data[0].no_id === 1) {
          msg.reply('I could not find your D-COT username. Please add your Discord Tag to your D-COT profile by editing your profile and clicking on the "Discord" tab.');
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  /* GET CURRENTLY PLAYING SONG FOR USER */
  if (msg.content.startsWith('!cs') || msg.content.startsWith('!currentsong')) {
    return fetch('https://www.d-cot.com/api/?task=get_current_song&usertag='+encodeURIComponent($usertag), {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let data = responseJson;
      if (data) {
        console.log(msg.author.username+' used the !cs command ('+new Date()+').');
        bot.channels.cache.find(channel => channel.name === 'logs').send(msg.author.username+' used the !cs command ('+new Date()+').');

        if (data[0].current_song && data[0].current_song != 'null') {
          function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }
          if (data[0].usernames && data[0].usernames.length && data[0].usernames != 'null') {
            let $listeners = data[0].usernames.join(', '),
                $weeklyPlays = data[0].playcountweek,
                $allPlays = data[0].playcount,
                $dateAdded = data[0].added;

            if ($weeklyPlays != 'null' && $allPlays != 'null') {
              $weeklyPlays = formatNumber($weeklyPlays);
              $allPlays = formatNumber($allPlays);
              $weeklyPlays = formatNumber($weeklyPlays);
            }

            msg.channel.send({embed: {
                color: 3066993,
                title: '',
                description: msg.author.username+' is listening to **'+data[0].current_song+'** along with **'+$listeners+'**',
                fields: [{
                    name: "Weekly Plays",
                    value: $weeklyPlays
                  },
                  {
                    name: "Total Plays",
                    value: $allPlays
                  },
                  {
                    name: "Date Added",
                    value: $dateAdded
                  }
                ],
                timestamp: new Date()
              }
            });

            //update bot presence
            bot.user.setPresence({
              status: 'online',
              activity: {
                name: data[0].current_song.stripSlashes()+ ' ('+msg.author.username+', '+$listeners+')',
                //name: data[0].current_song.stripSlashes(),
                type: 'LISTENING'
              }
            });
          } else {
            msg.channel.send({embed: {
                color: 3066993,
                title: '',
                description: msg.author.username+' is listening to **'+data[0].current_song+'**',
                fields: [{
                    name: "Weekly Plays",
                    value: formatNumber(data[0].playcountweek)
                  },
                  {
                    name: "Total Plays",
                    value: formatNumber(data[0].playcount)
                  },
                  {
                    name: "Date Added",
                    value: data[0].added
                  }
                ],
                timestamp: new Date()
              }
            });

            //update bot presence
            bot.user.setPresence({
              status: 'online',
              activity: {
                name: data[0].current_song.stripSlashes()+ ' ('+msg.author.username+')',
                //name: data[0].current_song.stripSlashes(),
                type: 'LISTENING'
              }
            });
          }
        }

        if (data[0].no_id === 1) {
          msg.reply('I could not find your D-COT username. Please add your Discord Tag to your D-COT profile by editing your profile and clicking on the "Discord" tab.');
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  /* BETA GET CURRENTLY PLAYING SONG FOR USER */
  if (msg.content.startsWith('!song')) {
    return fetch('https://data.d-cot.com/api/beta.php?task=get_current_song&usertag='+encodeURIComponent($usertag), {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let data = responseJson;
      if (data) {
        console.log(msg.author.username+' used the !song command ('+new Date()+').');
        bot.channels.cache.find(channel => channel.name === 'logs').send(msg.author.username+' used the !song command ('+new Date()+').');

        if (data[0].current_song && data[0].current_song != 'null') {
          function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }
          if (data[0].usernames && data[0].usernames.length && data[0].usernames != 'null') {
            let $listeners = data[0].usernames.join(', '),
                $weeklyPlays = data[0].playcountweek,
                $allPlays = data[0].playcount,
                $dateAdded = data[0].added;

            if ($weeklyPlays != 'null' && $allPlays != 'null') {
              $weeklyPlays = formatNumber($weeklyPlays);
              $allPlays = formatNumber($allPlays);
              $weeklyPlays = formatNumber($weeklyPlays);
            }

            msg.channel.send({embed: {
                color: 3066993,
                title: '',
                description: msg.author.username+' is listening to **'+data[0].current_song+'** in the beta jukebox along with **'+$listeners+'**',
                fields: [{
                    name: "Weekly Plays",
                    value: $weeklyPlays
                  },
                  {
                    name: "Total Plays",
                    value: $allPlays
                  },
                  {
                    name: "Date Added",
                    value: $dateAdded
                  }
                ],
                timestamp: new Date()
              }
            });

            //update bot presence
            bot.user.setPresence({
              status: 'online',
              activity: {
                name: data[0].current_song.stripSlashes()+ ' ('+msg.author.username+', '+$listeners+')',
                //name: data[0].current_song.stripSlashes(),
                type: 'LISTENING'
              }
            });
          } else {
            msg.channel.send({embed: {
                color: 3066993,
                title: '',
                description: msg.author.username+' is listening to **'+data[0].current_song+'** in the beta jukebox',
                fields: [{
                    name: "Weekly Plays",
                    value: formatNumber(data[0].playcountweek)
                  },
                  {
                    name: "Total Plays",
                    value: formatNumber(data[0].playcount)
                  },
                  {
                    name: "Date Added",
                    value: data[0].added
                  }
                ],
                timestamp: new Date()
              }
            });

            //update bot presence
            bot.user.setPresence({
              status: 'online',
              activity: {
                name: data[0].current_song.stripSlashes()+ ' ('+msg.author.username+')',
                //name: data[0].current_song.stripSlashes(),
                type: 'LISTENING'
              }
            });
          }
        }

        if (data[0].no_id === 1) {
          msg.reply('I could not find your D-COT username. Please add your Discord Tag to your D-COT profile by editing your profile.');
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  /* GET SUPPORTER INFO FOR USER */
  if (msg.content.startsWith('!supporter')) {
    let formData = {
      task: 'get_supporter_info',
      usertag: $usertag
    };
    return fetch('https://www.d-cot.com/api/?task=get_supporter_info&usertag='+encodeURIComponent($usertag), {
      method: 'POST',
      mode: 'cors',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let data = responseJson;
      if (data) {
        bot.channels.cache.find(channel => channel.name === 'logs').send(msg.author.username+' used the !supporter command ('+new Date()+').');

        if (data[0].no_id === 1) {
          msg.reply('I could not find your D-COT username. Please add your Discord Tag to your D-COT profile by editing your profile and clicking on the "Discord" tab.');
        }

        if (data[0].supporter_start_date) {
          msg.channel.send({embed: {
              color: 3066993,
              title: "Supporter Information for "+msg.author.username,
              description: "Thank you for being a supporter.",
              fields: [{
                  name: "Start Date",
                  value: data[0].supporter_start_date
                },
                {
                  name: "End Date",
                  value: data[0].supporter_end_date
                }
              ],
              timestamp: new Date()
            }
          });
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
});
