
exports.ChannelCollection = {
    // TODO : Check if this is the right declaration
    channels : [],
    getChannelById : function(id) {
	var result;
	for (var _i = 0, _a = this.channels; _i < _a.length; _i++) {
            var channel = _a[_i];
            if (channel.id === id) {
                result = channel;
            }
	}
	return result;
    },

    getChannelByName : function(name){
	for (var _i = 0, _a = this.channels; _i < _a.length; _i++) {
            var channel = _a[_i];
            if (channel.name === name) {
                result = channel;
            }
	}
	return result;
    }
}
