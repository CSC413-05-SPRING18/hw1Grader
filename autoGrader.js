const axios = require('axios');
const async = require('async');
const data = require('./data.json');
const url = 'http://localhost:1299';

const buildResponse = (data) => {
	return {
		status : 'OK',
		data : data,
		entries: data.length,
	}
}

const testEndpoint = (endpoint, expected) => {
	return new Promise((resolve, reject) => {
		axios.get(endpoint)
		.then(function(response) {	
			if(JSON.stringify(response.data) === JSON.stringify(expected)){
				resolve();
			}else{
				reject();
			}
			resolve();
		}).catch((err) =>{
			console.log(err);
			reject();
		})
	});
}

const tests = [];
tests.push({
	endpoint : url + '/user',
	expected: buildResponse(data.users),
});

data.users.forEach(user => {
	tests.push({
		endpoint : url + '/user?userid=' + user.userid,
		expected: buildResponse([user]),
	});
});

data.posts.forEach(post => {
	tests.push({
		endpoint : url + '/post?postid=' + post.postid,
		expected: buildResponse([post]),
	});
});

data.posts.forEach(post => {
	tests.push({
		endpoint : url + '/post?userid=' + post.userid,
		expected: buildResponse([post]),
	});
});

let correct = 0;
let incorrect = 0;
tests.forEach((test) =>{
	testEndpoint(test.endpoint, test.expected).then(() =>{
		console.log(test.endpoint + ' Passed! ********');
	}).catch((err) =>{
		console.log(test.endpoint + ' failed ********');
		console.log('Expected :');
		console.log(test.expected);
	});
});
