module.exports = function(app)
{
	// ACTIVITIES
	app.get ('/controllers/activities/wishflowerPlayActivity.js', 
		function (req, res) {res.sendFile(__dirname + '/activities/wishflowerPlayActivity.js');});

	// FLOWS
	app.get ('/controllers/flows/playFlow.js', 
		function (req, res) {res.sendFile(__dirname + '/flows/playFlow.js');});

    // MAIN CONTROLLERS
	app.get ('/controllers/errorPageController.js', 
		function (req, res) {res.sendFile(__dirname + '/errorPageController.js');});

	app.get ('/controllers/wishflowerController.js', 
		function (req, res) {res.sendFile(__dirname + '/wishflowerController.js');});

	app.get ('/controllers/wishflowerContext.js', 
		function (req, res) {res.sendFile(__dirname + '/wishflowerContext.js');});

	// ENTITIES
	app.get ('/controllers/entities/playPanel.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/playPanel.js');});

	app.get ('/controllers/entities/piecesPanel.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/piecesPanel.js');});

	app.get ('/controllers/entities/desktop.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/desktop.js');});

	console.log("   controllers/index.js: OK");
}
