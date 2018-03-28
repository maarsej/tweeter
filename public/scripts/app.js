 /*
 Created by: Jacob Maarse
 Date Created: March 26th, 2018
 Last Editted: March 28th, 2018
 Purpose: tweeter app project for lighthouse labs
 Function: -Built on premade server that handles requests
           -CSS and HTML styling to provide an aesthetic and functional web app
           -The aformentioned styling also provides a sense of interactivity through highlighting the hovered tweet or being able to slide the new tweet section in and out of view.
           -Live update of tweets using ajax
           -Tweets that persist through server restarts through the use of mongoDB
 */

let data= [];

// Allow document to load DOM before loading the persisted tweets and adding listeners
$(document).ready(function () {

    loadTweets(renderTweets);
    $("form").on('submit', addTweet)
    $("#compose").on('click', slideNewTweet)

});

// Functions 

//Toggle the state of the window for new tweet creation
let shown = true;
function slideNewTweet () {
    $(".new-tweet").slideToggle("slow")
    if (shown === true){
        shown = false;
    } else {
        shown = true;
        $('#compose-input-field').focus();
    }
}

// Request the data and given that data perform callback on it, in this case rendering the tweets
function loadTweets(cb) {
    $.ajax({
        url:'/tweets/',
        method: 'GET',
        success: function(incomingData) {
            cb(incomingData);
        }
    })
   
}

// Triggered when the form is submitted, looks at the new data coming through and loads in the new tweet.
function addTweet() {
    event.preventDefault();
    if ($(this).find('textarea').val() === "") {
        alert("Cannot send empty tweet");
    } else if ($(this).find('textarea').val().length > 140) {
        alert("Cannot tweet more than 140 characters");
    } else {
        $.ajax({
            url: '/tweets/',
            method: 'POST',
            data: $(this).serialize(),
            success: function () {
                loadTweets(loadNewTweet);
            }
        })
        $(this)[0].reset();
    }
};

// Protects from potential attacks where users input html tags
function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// Given an array of tweets 'render' them all with the utilization of the createTweetElement function
function renderTweets(tweetsArr) {
    tweetsArr.forEach(function(element) {
        createTweetElement(element);
    });
};

// Load the last tweet added to the database (the newest)
function loadNewTweet(tweetsArr) {
    createTweetElement(tweetsArr[tweetsArr.length-1]);
}

// Given the info for 1 tweet, produces an element and prepends it to the specified area (the feed in this case)
function createTweetElement(tweetInfo) {
    let timeDiff = timeCalculator(tweetInfo.created_at);
    let output = $(`
    <section class="tweet-container">
        <header class="tweet"> 
            <img class="avatar-pic" src=${tweetInfo.user.avatars.small}>  
            <div class="user">${tweetInfo.user.name}</div><div class="handle">${tweetInfo.user.handle}</div></header>
        <article class="tweet">${escape(tweetInfo.content.text)}</article>
        <footer class="tweet">${timeDiff}
            <form method="PUT" action="/tweets/like">
            <input class="interactOptions" type="image" src="/images/interactOptions.png"></form></footer></section>`)

    $('#feed-container').prepend(output);
};

// Determines, based on the date created how many minutes/hours/days/weeks/months/years have passed and selects the appropriate unit to display
function timeCalculator(created) {
    today = new Date();
    now = today.getTime();
    let nowArr = moment(now).toArray();
    let createdArr = moment(created).toArray();
    let a = moment(nowArr);
    let b = moment(createdArr);

    let diffY = a.diff(b, 'years')
    let diffM = a.diff(b, 'months')
    let diffW = a.diff(b, 'weeks')
    let diffD = a.diff(b, 'days')
    let diffH = a.diff(b, 'hours')
    let diffMin = a.diff(b, 'minutes')

    if (diffY >= 1) {
        if (diffY > 1) {
            return (`${diffY} years ago`);
        } else {
            return (`${diffY} year ago`);
        }
    }
    else if (diffM >= 1) {
        if (diffM > 1) {
            return (`${diffM} months ago`);
        } else {
            eturn(`${diffM} month ago`);
        }
    }
    else if (diffW >= 1) {
        if (diffW > 1) {
            return (`${diffW} weeks ago`);
        } else {
            return (`${diffW} week ago`);
        }
    }
    else if (diffD >= 1) {
        if (diffD > 1) {
            return (`${diffD} days ago`);
        } else {
            return (`${diffD} day ago`);
        }
    }
    else if (diffH >= 1) {
        if (diffH > 1) {
            return (`${diffH} hours ago`);
        } else {
            return (`${diffH} hour ago`);
        }
    } else {
        if (diffMin > 1) {
            return (`${diffMin} minutes ago`);
        } else {
            return (`${diffMin} minute ago`);
        }
    }
};

