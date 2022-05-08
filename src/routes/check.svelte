<!-- /** @type {import('@sveltejs/kit').RequestHandler} */
export function get(event) {
  // log all headers
  console.log(...event.request.headers);
 
  return {
    body: {
      // retrieve a specific header
      userAgent: event.request.headers.get('user-agent')
    }
  };
} -->

<h1>Not Implemented yet</h1>
