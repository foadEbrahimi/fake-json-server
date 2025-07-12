// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add delay middleware
server.use((req, res, next) => {
  setTimeout(next, 2000); // 1000ms = 1 second delay
});
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id',
  })
);
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
