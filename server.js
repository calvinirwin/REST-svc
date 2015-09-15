var http = require("http");
var connect = require('./connect');

http.createServer(function(request, response) {
  


	var callback = function(err, result) {
        
		if (err){
			console.log(err);
		}
		else
		{
	        response.writeHead(200, {'Content-Type' : 'x-application/json'});
	        response.write(result);
	        response.end();
    	}
    };


   	executeStatement(callback);

  // response.writeHead(200, {"Content-Type": "text/html"});
  // if (connect.result.err)
  // {
	 //  response.write('<p>ERROR: <br />');
	 //  response.write(connect.result.err);
	 //  response.write('</p>');
  // }
  // else {
	 //  response.write('<p>SQL:<br />');
	 //  response.write(connect.result.sql);
	 //  response.write('</p><p>OUTPUT: <br />');
	 //  response.write(connect.result.output);
	 //  response.write('</p>');
  // }

  // response.end();

}).listen(8888);



var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = {
    userName: 'mlsuser',
    password: 'mlsuser',
    server: 'DEVDB1',
    
    // If you're on Windows Azure, you will need this:
    options: {
    	encrypt: true,
        port: 49557,
		database: 'mlsmaster',
	    instancename: 'sql2k12std',
	    useColumnNames: true
	}
};


var res = {
  rowCount: -1,
  sql: 'SELECT TOP 10 mlsarea, mlsnumber, price, CreateDate, SquareFeet, PropertyType, City, State, Zip, County, TotalBedrooms, TotalBaths, Age, AgentName, AgentPhone FROM MLSMASTER.dbo.AutoListings WHERE age IS NOT NULL',
  output: '',
  rows: null,
  err: ''
};
var output = '';
 


  function executeStatement(callback){

    var connection = new Connection(config);

    connection.on('connect', function(err) {
      // If no error, then good to go...

        if (err) {
           //res.err = 'connection issue: ' + err;
            console.log(err);
        }
        else
        {
			request = new Request(res.sql, function(err, rowCount) {
			      if (err){
			        // do sometihgn with the error
			        //res.err = err;
			        console.log(err);
			      }  
			      else {
			        //res.rowCount =  rowCount;
			        //console.log(rowCount);
			      }
			    });

				request.on('columnMetadata', function(columns) {
			        //console.log(' ' + column.value);
			      
			    });

			    request.on('row', function(columns) {

			      //columns.forEach(function(column) {
			        //output += ' ' + column.value;
			        //console.log(' ' + column.value);
			      //});
			    	
			    	output += JSON.stringify(columns.Age);
			    	//console.log(columns.Age.metadata.colName);
			    	//console.log(columns.Age.value);
					console.log(columns.Age);

			    });

			    connection.execSql(request);
			    //connection.close();
			    //console.log(output);
			    callback(null, output);

        }
      }); 

    
  }