# Mr.Grape
<div align="center">
	<img src="images/mrgrape.png" title="Mr Grape" alt="Mr grape" />
</div>
A fun open source discord bot made using discord.js
music, economy and more!

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/kinglalu/Mr.Grape)

#### Basic info

Contains a wide variety of music commands using ytdl-core, and has a very expansive economy systen with many features such as a shop and inventory. This also has many other commands such as kick and banning, purging, and as well as many fun commands.

# Notes
* The bots prefix is `+`, however this can be changed during operation with the command `+prefix <new prefix`.
* Many of the APIs used in Mr. Grape require Private Keys to be issued and added before those services will work.

# API's
You will need to go to each of these websites and aquire an API key for each of their associated services.
* https://api.ksoft.si/
* https://thecatapi.com/
* https://thedogapi.com/
* https://api.nasa.gov/
* https://products.wolframalpha.com/api/

# Setup
 Press the deploy to Heroku Button, give the app a name.
Make sure you have a application made in https://discord.com/developers/applications, create a bot under that application, and get the BOT TOKEN from there.
Once the heroku app is deployed, go to Configure dynos and make sure web dyno is off and worker dyno is on like so:
<div align="center">
	<img src="images/dynos.JPG" alt="Dyno config" />
</div>
Once that is done, you will wanna go to Settings and under config vars, you wanna name a key called BOT_TOKEN. Then as the value, you will wanna paste in the token in the bot under the application. Do not share these tokens with anyone, or that person will have access to your bot. Then once you have that, you will wanna get your own api keys for the apis listed above, and then put in the names of the apis and the keys in the value, like so:
<div align="center">
	<img src="images/keys.jpg" alt="KEY config" />
</div>
Finally, you will need a database to store the data of the players using the economy commands. We use keyv, but it can be easily edited to use a diffrent db such as MongoDB. Go to Resources tab, and where you see Add-ons, Search "Heroku Postgres", and attach it as a database, like so:
<div align="center">
	<img src="images/database.JPG" alt="Database config" />
</div>
 Make sure in setting and under config vars, that there is a key called DATABASE_URL and the value is the url of the database in Add-ons. You should be all set and the bot should be online. For any questions or inquires, feel free to join the discord and ask! https://discord.gg/bYFkqsdmqQ
