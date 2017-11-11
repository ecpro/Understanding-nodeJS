var http = require('http');
var path = require('path');
var fs = require('fs');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} and ${req.method}`);
    if (req.method === 'GET') {
        var fileUrl;
        if (req.url === '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        filePath = path.resolve('./public' + fileUrl);
        var fileExt = path.extname(filePath);
        if (fileExt === '.html') {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<html><body><h1>Error 404: ' + fileUrl +
                        ' not found</h1></body></html>');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Error 404: ' + fileUrl +
            ' not a HTML file</h1></body></html>');
    }
});

server.listen(port, hostname, function () {
    console.log(`running server at http://${hostname}:${port}`);
})

