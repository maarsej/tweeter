/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
let data= [];

$(document).ready(function () {

    loadTweets(renderTweets);
    $("form").on('submit', ajaxAddTweet)
    $("#compose").on('click', slideNewTweet)

});

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

function loadTweets(cb) {
    $.ajax({
        url:'/tweets/',
        method: 'GET',
        success: function(incomingData) {
            cb(incomingData);
        }
    })
   
}

function ajaxAddTweet() {
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

function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

function renderTweets(tweetsArr) {
    tweetsArr.forEach(function(element) {
        createTweetElement(element);
    });
};
function loadNewTweet(tweetsArr) {
    createTweetElement(tweetsArr[tweetsArr.length-1]);
}

function createTweetElement(tweetInfo) {
    let timeDiff = timeCalculator(tweetInfo.created_at);
    let output = $(`<section class="tweet-container"><header class="tweet"><img class="avatar-pic" src=${tweetInfo.user.avatars.small}><div class="user">${tweetInfo.user.name}</div><div class="handle">${tweetInfo.user.handle}</div></header><article class="tweet">${escape(tweetInfo.content.text)}</article><footer class="tweet">${timeDiff}<img class="interactOptions" src="/images/interactOptions.png"></footer></section>`)

    $('#feed-container').prepend(output);
};



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

