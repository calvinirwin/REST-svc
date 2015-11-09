var Connect = require('../connect.js');


exports.loadData = function(req, res) {

  console.log(req);
  res.send("ok " + req.body);
  //res.send("<p>here is the contents of what you sent: </p>" + req.body.mlsarea);

};

exports.getTopTenListingsByArea = function(req, res) {

	var output = '';
	var values = 
	{
		'mlsarea':
		{
			'value':'ABOR',
			'metadata':
			{
				'userType':0,
				'flags':8,
				'type':
				{
					'type':'BIGVARCHR',
					'name':'VarChar',
					'hasCollation':true,
					'dataLengthLength':2,
					'maximumLength':8000,
					'id':167
				},
				'colName':'mlsarea',
				'collation':
				{
					'lcid':1033,
					'codepage':'CP1252',
					'flags':208,
					'version':0,
					'sortId':52
				},
				'dataLength':50
			}
		}
	};

	res.set('Content-Type', 'application/json');	
	//res.send("test");
    console.log(req.params);
    //var area = parseInt(req.params.area);
    //console.log('getTopTenListingsByArea: ' + area);

    //res.writeHead(200, {'Content-Type' : 'application/json'});

	// var callback = function(err, result) {
        
	//  	if (err){
	//  		console.log(err);
	//  	}
	//  	else
	//  	{
	//          res.writeHead(200, {'Content-Type' : 'x-application/json'});
	//          res.write(result);
	//          res.end();
 //     	}
 //    };

    var sql = 'SELECT TOP 10 mlsarea, mlsnumber, price, CreateDate, SquareFeet, PropertyType, City, State, Zip, County, TotalBedrooms, TotalBaths, Age, AgentName, AgentPhone FROM MLSMASTER.dbo.AutoListings WHERE age IS NOT NULL';

	request = new Connect.Request(sql, function(err, rowCount) {
		if (err){
			// do sometihgn with the error
			//res.err = err;
			console.log(err);
		}  
		else {
			res.send(output);
			//res.rowCount =  rowCount;
			//console.log(rowCount);
		}
	});

	request.on('columnMetadata', function(columns) {
		//console.log(' ' + column.value);

	});

	request.on('row', function(columns) {

		//columns.forEach(function(column) {
		
		//console.log(' ' + column.value);
		//});

		//res.status(200).jsonp(columns);
		output +=JSON.stringify(columns); 
		//res.send(JSON.stringify(columns));
	
		//console.log(columns.Age.metadata.colName);
		//console.log(columns.Age.value);
		//console.log(columns.Age);

	});

	// request.on('done', function(rowCount, err) {
	// 	res.send(output);
	// });

	
	Connect.ExecSql(request);

	// * offline testing : res.jsonp(values);

	//console.log(contents:    + output);
	//callback(null, output);

};