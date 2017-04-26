var messages = {
    messages: [],
    maxMessagesCount: 20,

    deleteOldMessages: function() {
        var oldMessagesCount = this.messages.length - this.maxMessagesCount;
        for( var i = 0; i < oldMessagesCount; i++ ) {
            this.messages.splice(i, 1);
        }
    },

    addMessage: function( message, user ) {
        this.messages.push( { 'new': true, 'time': new Date(), 'message': message, 'user': user } );
        return this;
    },

    getMessages: function() {
    	this.deleteOldMessages();
        var ret = [];
        for( var i = 0; i < this.messages.length; i++ ) {
            if( this.messages[i].new ) {
                ret.push(this.messages[i]);
                this.messages[i].new = false;
            }
        }
        return ret;
    }
};

var http = require("http");

messages.addMessage( 'Vítejte na našem chatu!', 'Robot' );

function mineFromParameters( parametersString, parameterName, splitMark, assignMark ) {
    if( !parametersString )
        return false;
    var parameters = parametersString.split( splitMark );
    for (var i = 0; i < parameters.length; i++) {
        var tmpArr = parameters[i].split( assignMark );
        if( tmpArr[0] == parameterName )
            return decodeURIComponent( tmpArr[1] ).replace( /\+/g, ' ');
    }
    return false;
}

function setHeaders( res ) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
    res.setHeader("Access-Control-Max-Age", "3600");
}

var open = require('open');
var Benchmark = require('benchmark');

http.createServer( function( req, res ) {
    req.body = "";
    req.on('data', function( chunk ) {
        req.body += chunk;
        console.log("Here am I");


        // na localhostu js se spuštěním testů

        // na lokalu test case v benchmarkjs nad určitejma URL

        // to otevřu v různých prohlížečích a až mi to doběhne tak na síti POST do souboru

        // pak po sobě uklidím

        open('localhost:3000/test1', 'firefox', function (err) {
          // získat obsah z prohlížeče
          console.log('The user closed the browser');
        });
    });
    req.on('end', function () {
        setHeaders( res );
        if( req.url.match( "^/messages$" ) ) {
    		if( req.method == "GET" ) {
                res.writeHead( 200, {'Content-Type': 'application/json'} );
                res.end( JSON.stringify( messages.getMessages() ) );
        	} else if( req.method == "POST" ) {
                var newMessage = mineFromParameters( req.body, 'newMessage', '&', '=' );
                var newUser = mineFromParameters( req.body, 'newUser', '&', '=' );
                messages.addMessage( newMessage, newUser );
                res.writeHead( 201, {'Content-Type': 'text/plain'} );
                res.end( 'Paradicka' );
            } else if( req.method == "OPTIONS" ) {
                res.writeHead( 200 );
            } else {
                res.writeHead( 405 );
        	}
        } else {
        	res.writeHead( 404 );
    	}
        res.end( '' );
    });

}).listen( 8080, function() {
    console.log( 'Server has started and is listening on port 8080' );
});