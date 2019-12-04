// ISO 8601 Extended Format
// new Date(`YYYY-MM-DDTHH:mm:ss:sssZ`)
/* 
YYYY: 4-digit year
MM: 2-digit month (where January is 01 and December is 12)
DD: 2-digit date (0 to 31)
-: Date delimiters
T: Indicates the start of time
HH: 24-digit hour (0 to 23)
mm: Minutes (0 to 59)
ss: Seconds (0 to 59)
sss: Milliseconds (0 to 999)
:: Time delimiters
Z: If Z is present, date will be set to UTC. If Z is not present, it'll be Local Time. (This only applies if time is provided.)
*/
/////////////////////////////////////////

// new Date(year, month(zero-indexed), date, hour, minute, second) => Localtime
// new Date(Date.UTC(year, month(zero-indexed), date, hour, minute, second)) => UTC Time

//////////////////////////////////////////
// Using timestamp - amount of milliseconds elapsed since 1 January 1970


//////////////////////////////////////////
// Formating a Date
/*
toString gives you Wed Jan 23 2019 17:23:42 GMT+0800 (Singapore Standard Time)
toDateString gives you Wed Jan 23 2019
toLocaleString gives you 23/01/2019, 17:23:42
toLocaleDateString gives you 23/01/2019
toGMTString gives you Wed, 23 Jan 2019 09:23:42 GMT
toUTCString gives you Wed, 23 Jan 2019 09:23:42 GMT
toISOString gives you 2019-01-23T09:23:42.079Z
*/
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]

//Date.toLocaleDateString()
//Date.toLocaleTimeString()
//date.getTimezoneOffset()
// console.log(event.toLocaleString('en-GB', { timeZone: 'UTC' }));
// BC 47 language tag -- http://www.lingoes.net/en/translator/langcode.htm
// IANA timezone