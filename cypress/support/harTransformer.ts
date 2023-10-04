// types
import type { Entry } from "har-format";

// Check null values
const isNaN = <T extends string | number | undefined | null>(value: T) =>
  ["", undefined, -1, null].includes(value);
// Get rounded integer number
const formatNumber = (num: number) => Math.round(num);
// Get valid string
// https://stackoverflow.com/a/47340986
const formatString = (str: string) => {
  if (str.replace(/ /g, "").match(/[\s,"]/)) {
    return '"' + str.replace(/"/g, '""') + '"';
  }

  return str;
};

const harTransformer = (entry: Entry) => {
  const extractHarEntry = {
    "timings-blocked": entry.timings.blocked,
    "timings-dns": entry.timings.dns,
    "timings-ssl": entry.timings.ssl,
    "timings-connect": entry.timings.connect,
    "timings-send": entry.timings.comment,
    "timings-wait": entry.timings.wait,
    "timings-receive": entry.timings.receive,
    method: entry.request.method,
    "request-body-size": entry.request.bodySize,
    duration: entry.time,
    url: entry.request.url,
    "response-status": entry.response.status,
    "resource-type": entry._resourceType,
    "content-type": entry.response.content.mimeType,
    "response-body-size": entry.response.bodySize,
  };

  const standardizeHarObject = () =>
    Object.entries(extractHarEntry).reduce((formattedObject, [key, plainValue]) => {
      switch (true) {
        case isNaN(plainValue):
          return {
            ...formattedObject,
            [key]: "NaN",
          };
        case typeof plainValue === "number":
          return {
            ...formattedObject,
            [key]: formatNumber(plainValue),
          };
        case typeof plainValue === "string":
          return {
            ...formattedObject,
            [key]: formatString(plainValue),
          };
        default:
          return {
            ...formattedObject,
            [key]: plainValue,
          };
      }
    }, {});

  return standardizeHarObject();
};

export default harTransformer;
