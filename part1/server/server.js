const net = require('net');

const colors = require('colors');

const cities = require('./zipCodeModule_v2');

// Keep track of client connections
const clients = [];

// define the result for return to client
let result = '';

const server = net.createServer((socket) => {

	console.log("Client connection...".red);

	socket.on('end', () => {
		console.log("Client disconnected...".red);
	});

	// HW Code - Write the following code to process data from client

	socket.on('data', (data) => {

		let input = data.toString();
		console.log(colors.blue('...Received %s'), input);

		// Fill in the rest
		// make sure the input matches the function and its params
		const params = input.split(',');
		// functionName = params[0], param = params[1+]
		if (params.length > 1) {
			const fName = params[0];
			// call the function by name
			switch (fName) {
				case 'lookupByZipCode':
					result = JSON.stringify(cities.lookupByZipCode(params[1]));
					break;
				case 'lookupByCityState':
					result = JSON.stringify(cities.lookupByCityState(params[1], params[2]));
					break;
				case 'getPopulationByState':
					result = JSON.stringify(cities.getPopulationByState(params[1]));
					break;
				default:
					break;
			}
		}

		// send the result back to client
		socket.write(result);
	});

});

// listen for client connections
server.listen(3000, () => {
	console.log("Listening for connections on port 3000");
});
