import Router from './router'
import lookup from './src/handlers/lookup';
import webhook from './src/handlers/webhook';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const r = new Router();
  r.get('/', () => new Response("Hello, world! This is the root page of your Worker template."))
  r.post('/lookup', lookup);
  r.post('/webhook', webhook);

  let response = await r.route(request);

  if (!response) {
    response = new Response('Not found', { status: 404 });
  }

  return response;
}