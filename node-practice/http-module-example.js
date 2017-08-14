// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
/*  http module  */
const http = require('http');

/*  
    get a server instance from http module.
    Server object returned by create server is a Event Emitter
*/

var server = http.createServer();

// when a http request comes 'request' event is fired and event handler's callback function
// is passed a request and response object
// request object implements readableStream interface.

server.on('request', (req, response) => {
    const { method, url, headers } = req;
    const userAgent = headers['user-agent'];
    console.info(headers);
    let body = [];

    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
    });

    console.info(body);

    response.writeHead(200, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'bacon'
    });

    response.write('<html>');
    response.write('<body>');
    response.write('<h1>Hello, World!</h1>');
    response.write('</body>');
    response.write('</html>');
    response.end();


});

server.listen(3000, () => {
    console.info("server started on port 3000");
});

