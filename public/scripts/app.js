/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
    createTweetElement(tweetData);

});

function createTweetElement(tweetInfo) {
    let timeDiff = timeCalculator(tweetInfo.created_at);
    let output = $(`<section id="tweet-container"><header class="tweet"><img class="avatar-pic" src=${tweetInfo.user.avatars.small}><div class="user">${tweetInfo.user.name}</div><div class="handle">${tweetInfo.user.handle}</div></header><article class="tweet">${tweetInfo.content.text}</article><footer class="tweet">${timeDiff}<img class="interactOptions" src="/images/interactOptions.png"></footer></section>`)

    $('.container').append(output);
}


const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}

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
}

function generateBoard() {

    for (let player = 1; player <= 2; player++) {
        for (let rowIndex = 0; rowIndex <= 9; rowIndex++) {
            for (let column = 1; column <= 10; column++) {
                const cell = $(`<div>${rowArray[rowIndex]}${column}</div>`)
                    .addClass(`row${rowArray[rowIndex]}`)
                    .addClass(`column${column}`)
                    .addClass('grid-item');
                $(`#P${player}-grid-container`).append(cell);
            }
        }
    }
};