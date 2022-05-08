import type { VercelResponse, VercelRequest } from "@vercel/node";

const ApiRoute = (req: VercelRequest, res: VercelResponse) =>
	res.status(200).send(
		`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/IMG/favicon.png" alt="Our logo" />
          <title>API 😎</title>
          <style>
            * {
              font-family: Courier, monospace;
              color: #f2f9f9;
            }
            body {
              background-color: #356169;
            }
          </style>
        </head>
        <body>
          <div style="text-align: center">
            <img src="/IMG/favicon.png" width="64" />
            <h1>Tombola - API ROUTE 💥</h1>
            <h3>✅ All services are up (because otherwise you wouldn't have been able to see this message)</h3>
          </div>
        </body>
      </html>`
	);

export default ApiRoute;
