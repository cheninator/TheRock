var request = require('superagent');
exports.DataManager = {
        retrieveChannels : function (token) {
            var baseUrl = "https://slack.com/api/channels.list";
            console.log('Token is : ' + token);
	    request.get(baseUrl).query(
		{
		   token : token 
		}).end(function(err,res){
		    console.log(res.body.channels);
		});

	    console.log("retrieveChannelsDone?");
            //return channelCollection;
        },
        retrieveUsers : function (token) {
            var baseUrl = "https://slack.com/api/users.list";
	    console.log('Token is : ' + token);
	    request.get(baseUrl).query(
		{
		    token : token 
		}).end(function(err,res){
		    console.log(res.body.members);
		});

	    console.log("retrieveUsersDone?");
        }
}
