exports.UserCollection = {
    // TODO : Check if this is the right declaration
    users : [],
    getUserById : function(id) {
	var result;
	for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.id === id) {
                result = user;
            }
	}
	return result;
    },

    getuserByName : function(name){
	for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.name === name) {
                result = user;
            }
	}
	return result;
    }
}
