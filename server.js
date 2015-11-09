var express = require('express'),
    route = require('./routes/listing'),
    bodyParser = require('body-parser');
 
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

app.get('/listings/', route.getTopTenListingsByArea);

app.post('/listings/', function(req, res) {

  //console.log(req.body);
  res.send( req.body.mlsarea);
  //res.send( req.body.mlsarea.value);
  //res.send("<p>here is the contents of what you sent: </p>" + req.body.mlsarea);

});

app.listen(3000);
console.log('Listening on port 3000...');





