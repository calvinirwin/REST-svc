var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var Config = {
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




exports.ExecSql = function(req){
    var conn = new Connection(Config);
    conn.on('connect', function(err) {
        // If no error, then good to go...
        if (err) {
            console.log(err);
        }
        else
        {
            conn.execSql(req);
        }
    });
};


module.exports.Connection = Connection;
module.exports.Request = Request;
module.exports.Config = Config;