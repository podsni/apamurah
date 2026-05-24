import type { IncomingMessage, ServerResponse } from "node:http";

type ServerEntry = { default: { fetch: (req: Request) => Promise<Response> } };

let entryPromise: Promise<{ fetch: (req: Request) => Promise<Response> }>;

function getEntry() {
  if (!entryPromise) {
    entryPromise = (import("../dist/server/server.js") as Promise<ServerEntry>).then(
      (m) => m.default,
    );
  }
  return entryPromise;
}

function toWebRequest(req: IncomingMessage): Request {
  const host = (req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost") as string;
  const proto = (req.headers["x-forwarded-proto"] ?? "https") as string;
  const url = `${proto}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  if (!hasBody) return new Request(url, { method: req.method, headers });

  const body = new ReadableStream({
    start(controller) {
      req.on("data", (chunk: Buffer) => controller.enqueue(chunk));
      req.on("end", () => controller.close());
      req.on("error", (err: Error) => controller.error(err));
    },
  });

  return new Request(url, { method: req.method, headers, body, duplex: "half" } as RequestInit);
}

async function sendWebResponse(res: ServerResponse, webRes: Response) {
  res.statusCode = webRes.status;
  res.statusMessage = webRes.statusText;
  webRes.headers.forEach((value, key) => res.setHeader(key, value));
  if (webRes.body) {
    const reader = webRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const entry = await getEntry();
    const webReq = toWebRequest(req);
    const webRes = await entry.fetch(webReq);
    await sendWebResponse(res, webRes);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
