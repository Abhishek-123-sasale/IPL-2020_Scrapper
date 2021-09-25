const request = require("request");
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const newWorkbook = xlsx.utils.book_new();
request(
  "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results",
  requestCallback
);
let matchArray = [];
async function requestCallback(err, res, html) {
  const $ = cheerio.load(html);
  let matchArrayObj = $('a[data-hover="Scorecard"]');
  for (let i = 0; i < matchArrayObj.length; i++) {
    let matchURL =
      "https://www.espncricinfo.com/" + $(matchArrayObj[i]).attr("href");
    matchArray.push({
      url: matchURL,
    });
    let splitAtSlash = matchURL.split("/");
    let dateAndId = splitAtSlash[6].toString();
    let splitAtDash = dateAndId.split("-");
    let Id = splitAtDash[splitAtDash.length - 1].toString();
    request(matchURL, scoreBoard.bind(this, i, Id));
  }
}

function scoreBoard(index, ID, err, res, html) {
  const $ = cheerio.load(html);

  let object1 = [];
  let object2 = [];
  let object3 = [];
  let object4 = [];

  let rows = $("table.batsman>tbody>tr"); //inning one batting
  inning1Bat(rows, ID);

  rows = $($(".table.bowler>tbody").html()); //inning one Bowlling
  inning1Ball(rows, ID);

  rows = $($($(".table.batsman>tbody")[1]).html()); //inning two batting
  inning2Bat(rows, ID);

  rows = $($($(".table.bowler>tbody")[1]).html()); //inning two Bowlling
  inning2Ball(rows, ID);

  let sheet1 = xlsx.utils.json_to_sheet(object1);
  let sheet2 = xlsx.utils.json_to_sheet(object2);
  let sheet3 = xlsx.utils.json_to_sheet(object3);
  let sheet4 = xlsx.utils.json_to_sheet(object4);
  xlsx.utils.book_append_sheet(
    newWorkbook,
    sheet1,
    "M-" + index + "-ID-" + ID + "-Inning-1-Bat"
  );
  xlsx.utils.book_append_sheet(
    newWorkbook,
    sheet2,
    "M-" + index + "-ID-" + ID + "-Inning-1-Ball"
  );
  xlsx.utils.book_append_sheet(
    newWorkbook,
    sheet3,
    "M-" + index + "-ID-" + ID + "-Inning-2-Bat"
  );
  xlsx.utils.book_append_sheet(
    newWorkbook,
    sheet4,
    "M-" + index + "-ID-" + ID + "-Inning-2-Ball"
  );

  xlsx.writeFile(newWorkbook, "IPL-2020.xlsx");

  function inning1Bat(rows, ID) {
    for (let i = 0; i < rows.length - 2; i++) {
      if (i % 2 == 0) {
        let row = $($(rows[i]).html()); //row 1

        if ($($(row)[5]).length > 0) {
          let name = $($(row)[0]).text();
          let runs = $($(row)[2]).text();
          let balls = $($(row)[3]).text();
          let fours = $($(row)[5]).text();
          let sixes = $($(row)[6]).text();
          let sr = $($(row)[7]).text();

          object1.push({
            name: name,
            runs: runs,
            balls: balls,
            fours: fours,
            sixes: sixes,
            sr: sr,
          });
        }
      }
    }
  }
  function inning1Ball(rows, ID) {
    for (let i = 0; i < rows.length; i++) {
      let row = $($(rows[i]).html()); //row 1

      let name = $($(row)[0]).text();
      let overs = $($(row)[1]).text();
      let maidain = $($(row)[2]).text();
      let runs = $($(row)[3]).text();
      let wickets = $($(row)[4]).text();
      let economy = $($(row)[5]).text();
      let dot = $($(row)[6]).text();
      let fours = $($(row)[7]).text();
      let sixes = $($(row)[8]).text();
      let wide = $($(row)[9]).text();
      let nb = $($(row)[10]).text();

      object2.push({
        name: name,
        overs: overs,
        maidain: maidain,
        runs: runs,
        wickets: wickets,
        economy: economy,
        dot: dot,
        fours: fours,
        sixes: sixes,
        wide: wide,
        NB: nb,
      });

      if (wickets != 0) {
        i++;
      }
    }
  }

  function inning2Bat(rows, ID) {
    for (let i = 0; i < rows.length - 2; i++) {
      if (i % 2 == 0) {
        let row = $($(rows[i]).html()); //row 1

        if ($($(row)[5]).length > 0) {
          let name = $($(row)[0]).text();
          let runs = $($(row)[2]).text();
          let balls = $($(row)[3]).text();
          let fours = $($(row)[5]).text();
          let sixes = $($(row)[6]).text();
          let sr = $($(row)[7]).text();

          object3.push({
            name: name,
            runs: runs,
            balls: balls,
            fours: fours,
            sixes: sixes,
            sr: sr,
          });
        }
      }
    }
  }

  function inning2Ball(rows, ID) {
    for (let i = 0; i < rows.length; i++) {
      let row = $($(rows[i]).html()); //row 1

      let name = $($(row)[0]).text();
      let overs = $($(row)[1]).text();
      let maidain = $($(row)[2]).text();
      let runs = $($(row)[3]).text();
      let wickets = $($(row)[4]).text();
      let economy = $($(row)[5]).text();
      let dot = $($(row)[6]).text();
      let fours = $($(row)[7]).text();
      let sixes = $($(row)[8]).text();
      let wide = $($(row)[9]).text();
      let nb = $($(row)[10]).text();

      object4.push({
        name: name,
        overs: overs,
        maidain: maidain,
        runs: runs,
        wickets: wickets,
        economy: economy,
        dot: dot,
        fours: fours,
        sixes: sixes,
        wide: wide,
        NB: nb,
      });

      if (wickets != 0) {
        i++;
      }
    }
  }
}
