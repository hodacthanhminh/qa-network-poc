import * as fs from "fs";

const harFilePath = "./har.cy.har";
const CSVOutputPath = `./csv/${new Date().getTime()}.csv`;

const rawHarContent = fs.readFileSync(harFilePath, "utf8");
const {
  log: { entries },
} = JSON.parse(rawHarContent);

const csvHeader = [
  "timings-blocked",
  "timings-dns",
  "timings-ssl",
  "timings-connect",
  "timings-send",
  "timings-wait",
  "timings-receive",
  "method",
  "request-body-size",
  "duration",
  "url",
  "response-status",
  "resource-type",
  "content-type",
  "response-body-size",
];

const convertToCSV = (arr) => {
  const csvRows = arr.map((networkRequest) => Object.values(networkRequest).toString());

  return [csvHeader, ...csvRows].join("\n");
};

const csvContent = convertToCSV(entries);

fs.writeFileSync(CSVOutputPath, csvContent, "utf8");
