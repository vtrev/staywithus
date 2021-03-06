const express = require('express');
const bodyParser = require('body-parser');
const Handlebars = require("handlebars");
const fs = require('fs');
const pdf = require('html-pdf');
const app = express();

app.use(bodyParser());
app.use('/', express.static(__dirname + '/public'));


app.post('/invoice', (req, res) => {
    var fileName = '';
    const template = Handlebars.compile(fs.readFileSync('./invoice.hbs', 'utf8'));
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds()
    let data = {
        dateSigned : formatted_date,
        name : req.body.name,
        suppliedBy : req.body.suppliedBy,
        suppliedTo : req.body.suppliedTo.replace(/\n/g ,"<br/>"),
        date : req.body.date,
        total : req.body.total
    }
    let templatedHTML = template(data);

    var options = {
        format: 'Letter'
    };

    pdf.create(templatedHTML, options).toFile('./out/invoice.pdf', function (err, resp) {
        if (err) return console.log(err);
        fileName =  resp.filename;
        var invoicePdf = fs.readFileSync(fileName);
        res.contentType("application/pdf");
        res.send(invoicePdf);
    })    
    });
     
app.listen(process.env.PORT || 5000)