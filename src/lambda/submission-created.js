const http = require('https');

exports.handler = function submissionCreated(event, context, callback) {

    const request = JSON.parse(event.body);

    let body = '';

    console.log('First name', request.payload.first_name);

    const data = JSON.stringify({
        email: request.payload.data.email,
        first_name: request.payload.first_name,
        name: request.payload.data.first_name,
        api_key: process.env.GATSBY_CONVERTKIT_API_KEY
    });

    const req = http.request({
        host: 'api.convertkit.com',
        path: `/v3/courses/${process.env.GATSBY_CONVERTKIT_SEQUENCE_ID}/subscribe`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(data)
        }
    }, function response(res) {

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            body+= chunk;
        });

        res.on('end', function() {

            console.log('body', body);

            callback(null, {
                statusCode: 200
            });
        });
    });

    req.write(data);
    req.end();
};
