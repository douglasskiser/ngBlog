var nodemailer = require('nodemailer');

exports.index = function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: 'douglass.kiser@gmail.com',
            pass: 'enjgsdmfyicqkoqp'
        }
    });

    smtpTransport.sendMail({
        from: name + '&lt;' + email + '&gt;',
        to: 'Douglass Kiser <douglass.kiser@gmail.com>',
        subject: 'Blog Contact Form from ' + email,
        text: name + ' : ' + email + ' : ' + message
    }, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent : ' + response.message);
        }

        smtpTransport.close();
    });
    res.json(req.body);
};