# Twumps API

Create a platform to present dynamic data using D3 charts. We aim to find funny and interesting statistics through Donald Trump twitter account.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
- Nodejs & npm
- yarn
- sqlite3

### Installing

Clone this repository and install all node modules

```
yarn install
```

Setup the local database

```
touch data/db/database.db
sqlite3 data/db/database.db < data/db/db_script.sql
```

Edit the configuration file `.env`

### Start the server
```
node index.js
```

## Synopsis
### Analyse
#### Examine the subject in detail

Our objective is to carry out an unconventional project, interesting and creative that is out of the ordinary. We found many ideas but only one stood out from the crowd :  use Donald Trump's Twitter account to make various statistics in order to learn more about him and his behaviour. Thanks to Twitter, we can take his tweets and use them for analysis. For example, it’s possible to count how many times one word is used, or find the lexical field employed by Donald Trump.

#### Identify the main problem

To do this, we use the Twitter API to retrieve all this data. Our objective is to set up a Node.js application, using a server-client architecture in the same way of a RESTFUL API. The server side is responsible for data analysis, while the client side is in charge of displaying interesting information in graphical form, to attract users. To do this, we’re using D3 charts. The main difficulty is on the server side: refreshing the data taking into account the request limit of the Twitter API, and analyzing all of this data to produce key figures about Donald Trump.

#### Break it down into sub-problems
It’s a real challenge, because it implies learning libraries and new technologies, like Node.js for the server side and AngularJS or React to make the client side. If we go further into details, we can split our analyse in two main idea:

* Server side:
	* The server needs to use the Twitter API to have data to analyze. The Twitter API sets a limit of a number of requests per month. This is a huge problem, because it involves the need for caution in its use. But, the fact is that the former tweets will not change.
	* So, first of all, we need to create a database of Trump's tweets since his presidential campaign, in order to analyze them without using the Twitter API. And finally, only use the Twitter API to add the latest Trump tweets.
	* Then, implement data analysis algorithms to produce figures that characterize Donald Trump.
	* The Twitter API allows to retrieve a user's tweets, but not all of them, in the case of a user who has tweeted more than 3200 times.
* Client side:
	* Use D3 library to make interesting and attractive graphics, like charts, tag cloud. This library is amazing and allows to make many many graphics

Finally, maybe the main difficulty is to imagine and generate new ideas of information about Trump, in order to make our project great again !

#### By using information searches

To do that, we will need to get the knowledge to use all those tools: 
* the Twitter API mainly about tweet object : https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object.html
* D3 API Docs : https://github.com/d3/d3/wiki
* And to define well our project, get informations that aren’t necessarily on Twitter about Trump.

### Design
#### Develop elements of solutions for specific sub-problems

To solve the API Twitter problem, the solution is obvious. We need to retrieve the scope of data we want (for example data since the presidential campaign) by using an open source project named : twitter_scraping. It allows to retrieve all the tweets of a Twitter's user. Then, we are able to store these information in a database to use them. And, if API Twitter let us retrieve data, we can only retrieve the last tweets of Donald Trump, in order to be as accurate as possible. The API Twitter returns data in JSON format, that we can insert into our database.
To answer to the analyse problem, we need to choose well what we want to show to the user, and to create tasty statistics about Trump. So, we imagine this :
* Funny data (like a “Fake news” counter)
* A timeline to highlight important moments of his presidency (since the presidential campaign) with buzz visualization
* Geographical data visualization (to show where Donald Trump travels most frequently for example)
* The most retweeted tweets (and funny retweets)
* A keyword search engine
* Create a tag cloud (lexical scope of Donald Trump)
* Use Texts/Videos/Pictures/…
Maybe, if we got time to implement all of this, we can do :
* A comparison of Twitter accounts to show the most influential person
These statistics are not so much hard to compute, but a large work on data storage is necessary. That’s why, we're going to use a database : SQLite. In addition, if we encounter various data, we can change and use mongoDB for example.
To make graphics, we have to study the D3 documentation, and see examples.

#### Synthesize them into larger solutions

The backend side of our web site is developed in Node.js. It is the mastermind of our application. Whereas the client side use the D3 charts to print graphics, and AngularJS technology to make the interaction between user and our application more simple.
So, to retrieve the Twitter data, we need to use the API under certain constraints (a limited number of requests per month). The solution is to save these information one time, and to refresh them daily for instance, to ensure to have accurate figures.
Then, we are able to apply some mathematical process and algorithms to determine interesting statistics about Donald Trump (like the most used word for example).
Finally, thanks to these figures, we can display them graphically to users.

#### Until it provides a general solution to the problem

To resume our project, we’re going to make a website about Donald Trump’s Twitter account with relevant statistics. To do it, we’ve to save information from Donald Trump’s Twitter account (thanks to the API Twitter) into a database (SQLite), to finally analyse them and display our results graphically (D3 charts).

#### Of which a specification of principle, textual and schematic can be given

We are going to get all the tweet of Trump with all the informations linked from the Twitter API as his profile. We will store them into a database and then show it to the client with some statistics
![capture](https://user-images.githubusercontent.com/23191626/46653555-ae0e9100-cba6-11e8-9761-7a9730435662.PNG)

### Plan
#### Define a roadmap, with the phases (or cycles, or sprints) and intermediate stages (subgoals) of development in order to achieve the main goal (successful defense) / Estimate the workload of each phase and associated tasks / Establish a provisional timetable with milestone dates for milestones and objectives to be achieved for it, collectively and individually / Include in this agenda regular team intermediate points, physical or remote, to review progress on the current phase and specify collective and individual objectives for the next sprint. A weekly frequency is a good frequency.

We have created a table summarizing the roadmap we will follow to make our project a success.
![roadmap](https://user-images.githubusercontent.com/23191626/46679985-5ee95000-cbe8-11e8-9916-987c4bdb85c6.JPG)

#### Distribute this responsibility fairly, according to the skills and responsibilities of each team member

We worked all together on the launching session, that is to say that we agree on the project definition. Alexis has created the Github repository to make easier the project versioning. Each of us has written a part of the synopsis as well. Frédéric spent more time to explain clearly what we want to do exactly (some reformulations, roadmap creation ...). Nicolas set up the project thanks to what he did during his internship this summer. He also retrieved the tweets from the Twitter API.
We get to the heart of the matter: the development. All of us want to work as well as on the server side than the client side, because it’s important to learn new technologies. Each of us has to work approximately 10 hours. So, according to requirements, we will dispatch our workforce on different subjects. However, we know that Alexis doesn't like web development, so he will work more on the server side. Each of us is able to adapt.
Finally, we will all prepare the presentation, splitting the work fairly.

Because we are into the same speciality : Software engineering, we can organize easily meetings (about one per week) to share our progress.

### Define an initial prototype
#### Define a viable functional subset that allows immediate use testing
To get quickly and consistency data about Donald Trump, we're using an open source project called twitter_scraping. It allows us to get all public tweets in a certain time range and to trim them as we wish.
Then with this subset of data, we can start building the analysis of them, and make them accessible to any client, to finally display some simple charts at the beginning.
That's only the basis of our project, but we can imagine new interesting figures to make our web application more attractive.

#### Specify the contours and functional content (detailed functionalities, scenario of interaction with the user)
We need to get all the tweets to decide what data to use, but we wish to implement some kind of lexical field analyze (word counters, tag cloud), to display charts with the evolution of the account’s subscribers, the milestones in term of buzz (retweets). We are also studying the possibility of integrating a keyword search.
The result is a web application, using D3 library, in order to present some appealing graphics. And the user will be able to interact with all those charts (click to view more details, animation, effects ...), and may be able to sort tweets by keywords/date for example.

#### Provide a concrete answer with a detailed action plan distributed throughout the team to the question of "how to build this prototype tomorrow ?”

Start from the seeds we have (front and back), get the tweets history through https://github.com/bpb27/twitter_scraping and then build server-side a service to update this list daily/hourly. Meanwhile, begin to work on the client-side, create charts with the history and decide what data needs to be analyzed and sent from the server.
Adapt the data as decided and build the proof of concept (PoC, that is to say the prototype is functional).
