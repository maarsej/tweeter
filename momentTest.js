var moment = require('moment');
// console.log(moment().format())

let created = 1461116232227

today = new Date();
now = today.getTime();

//  console.log('post: ',post + 'now: ', now);
nowArr = moment(now).toArray();
createdArr = moment(created).toArray();
a = moment(nowArr);
b = moment(createdArr);

diffY = a.diff(b, 'years')
diffM = a.diff(b, 'months')
diffM = a.diff(b, 'weeks')
diffM = a.diff(b, 'days')

console.log('years: ', differenceY);