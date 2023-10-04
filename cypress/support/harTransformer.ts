// types
import type { Entry } from "har-format";

const addKeyPrefixes = (object: unknown, prefix: string) =>
  JSON.parse(JSON.stringify(object).replace(/(?<=[{,]{1}\s*")(.+?)(?="\s*:)/gim, `${prefix}-$1`));

const harTransformer = (entry: Entry) => ({
  ...addKeyPrefixes(entry.timings, "timings"),
  method: entry.request.method,
  "request-body-size": entry.request.bodySize,
  duration: entry.time,
  url: entry.request.url,
  "response-status": entry.response.status,
  "resource-type": entry._resourceType,
  "content-type": entry.response.content.mimeType,
  "response-.body-size": entry.response.bodySize,
});

export default harTransformer;
