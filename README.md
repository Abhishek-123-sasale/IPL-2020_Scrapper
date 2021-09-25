# IPL-2020_Scrapper
Using Cheerio and SheetJS, Parsed it to .xlsx format
PL-2020_Scrapper (Using Cheerio and SheetJS, Parsed it to .xlsx format)

Project description1. Scrapped data of all the matches in IPL series 2020 using Cheerio and Node.js from 'https://www.espncricinfo.com'.
2. After Scrapping all the tables in scorecard section of each match I made an excel file (IPL-2020.xlsx) using SheetJS and put each table in each sheet of the excel and named them as match number, match Id, Inning number and batting or bawling.
• About SheetJS: -
o Parser and writer for various spreadsheet formats.
o To promote a format-agnostic view, SheetJS starts from a pure-JS representation that we call the "Common Spreadsheet Format". Emphasizing a uniform object representation enables new features like format conversion (reading an XLSX template and saving as XLS) and circumvents the mess of classes. By abstracting the complexities of the various formats, tools need not worry about the specific file type!
