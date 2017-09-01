let axios=require('axios');

module.exports={

	fetchUserData: function (url) {
		return  axios.get(url)
		 .then(function(response) {
		 	return response;
		 });
	}

};



