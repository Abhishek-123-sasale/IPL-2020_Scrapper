const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const chalk = require("chalk");
const xlxs = require("xlsx");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results",requestCallback);
let matchArray = [];
function requestCallback (err,res,html)
{
    const $ = cheerio.load(html);
    let matchArrayObj = $('a[data-hover="Scorecard"]');
    for(let i=0 ; i<matchArrayObj.length ; i++)
    {
        let matchURL = "https://www.espncricinfo.com" + $(matchArrayObj[i]).attr("href");
        matchArray.push({
            "url" : matchURL,
            "num" : i
        });
        request(matchURL,inningFinder.bind(this,i));
    }
}

function inningFinder(index,err,res,html){
    const $ = cheerio.load(html);

}