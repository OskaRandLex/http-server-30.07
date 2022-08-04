const http = require('http');
let fs = require('fs');
const mime = require('mime');

http.createServer((req, res) => {
    console.log('Request!', req.url);

// lvl 1

    if (req.url === '/') {
        res.end('Welcome');
    } else if (req.url === '/123') {
        res.end('Good /123');

// lvl 2
////////////////////
// lvl 3

    } else if (req.url === '/index.html') {
        res.setHeader('content-type', 'text/html');
        fs.readFile('./public/html/index.html', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('file not found');
            } else {
                res.write(data);
            }
            res.end();
        });
        
    } else if (req.url === '/main.css') {
        res.setHeader('content-type', 'text/css');
        fs.readFile('./public/css/main.css', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('file not found');
            } else {
                res.write(data);
            }
            res.end();
        });
        
    } else if (req.url === '/avatar') {
        res.setHeader('content-type', 'image/jpg');
        fs.readFile('./public/img/avatar.jpg', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('file not found');
            } else {
                res.write(data);
            }
            res.end();
        });

// lvl 4
        
    } else if (req.url === '/random-img') {
        const contentType = mime.getType('random-img.jpg');
        res.setHeader('content-type', `${contentType}`);
        fs.readFile('./public/img/random-img.jpg', null, function (error, data) {
            if (error) {
                res.writeHead(404);
                res.write('file not found');
            } else {
                res.write(data);
            }
            res.end();
        });
        
// lvl 5

    } else {
        const url = req.url;
        const splitUrl = url.toString().split('/');
        // console.log(splitUrl);
        if (splitUrl[1] === 'img') {
            // console.log('good');

            const files = fs.readdirSync('./public/img/');
            // console.log(files);

            for (i = 0; i < files.length; i++) {
                if (splitUrl[2] === files[i]) {
                    // console.log('ur img', files[i]);

                    const contentType = mime.getType(files[i]);
                    res.setHeader('content-type', `${contentType}`);
                    fs.readFile(`./public/img/${files[i]}`, null, function (error, data) {
                        if (error) {
                            res.writeHead(404);
                            res.write('file not found');
                        } else {
                            res.write(data);
                        }
                        res.end();
                    });

                } 
            }

        } else {
            res.statusCode = 404;
            res.end('Page not found');
        }

        
    }

    res.end;
}).listen(5000);