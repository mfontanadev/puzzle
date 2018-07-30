module.exports = function(app)
{
	// ACTIVITIES
	app.get ('/controllers/activities/puzzleMainActivity.js', 
		function (req, res) {res.sendFile(__dirname + '/activities/puzzleMainActivity.js');});

	app.get ('/controllers/activities/puzzleLevelsActivity.js', 
		function (req, res) {res.sendFile(__dirname + '/activities/puzzleLevelsActivity.js');});

	app.get ('/controllers/activities/puzzlePlayActivity.js', 
		function (req, res) {res.sendFile(__dirname + '/activities/puzzlePlayActivity.js');});

	// FLOWS
	app.get ('/controllers/flows/mainFlow.js', 
		function (req, res) {res.sendFile(__dirname + '/flows/mainFlow.js');});

	app.get ('/controllers/flows/levelsFlow.js', 
		function (req, res) {res.sendFile(__dirname + '/flows/levelsFlow.js');});

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

	app.get ('/controllers/entities/levelThumbail.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/levelThumbail.js');});

	app.get ('/controllers/entities/piece.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/piece.js');});

	app.get ('/controllers/entities/levelSelectorPanel.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/levelSelectorPanel.js');});

	app.get ('/controllers/entities/level.js', 
		function (req, res) {res.sendFile(__dirname + '/entities/level.js');});
}
