module.exports = function(app)
{
	// ACTIVITIES
	app.get ('/controllers/activities/puzzlePlayActivity.js', 
		function (req, res) {res.sendFile(__dirname + '/activities/puzzlePlayActivity.js');});

	// FLOWS
	app.get ('/controllers/flows/playFlow.js', 
		function (req, res) {res.sendFile(__dirname + '/flows/playFlow.js');});

    // MAIN CONTROLLERS
	app.get ('/controllers/errorPageController.js', 
		function (req, res) {res.sendFile(__dirname + '/errorPageController.js');});

	app.get ('/controllers/puzzleController.js', 
		function (req, res) {res.sendFile(__dirname + '/puzzleController.js');});

	app.get ('/controllers/puzzleContext.js', 
		function (req, res) {res.sendFile(__dirname + '/puzzleContext.js');});

	// ENTITIES
	app.get ('/controllers/entities/playPanel.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/playPanel.js');});

	app.get ('/controllers/entities/piecesPanel.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/piecesPanel.js');});

	app.get ('/controllers/entities/desktop.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/desktop.js');});

	app.get ('/controllers/entities/piece.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/piece.js');});

	app.get ('/controllers/entities/levelSelector.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/levelSelector.js');});

	console.log("   controllers/index.js: OK");
}
