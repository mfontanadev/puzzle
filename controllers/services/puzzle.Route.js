function PuzzleServiceRouete(app) 
{ 
	objPuzzleService = null;
	reqPuzzleService = null;

	if (__mockDB === true)
	{
		reqPuzzleService = require(__basePath + "/controllers/services/puzzle.ServiceMock.js");
	}
	else
	{
		reqPuzzleService = require(__basePath + "/controllers/services/puzzle.Service.js");
	}
	objPuzzleService = new reqPuzzleService();

	app.get ('/services/wishflowerGetAll', function (req, res) 
		{
			objPuzzleService.wishflowerGetAll
			(
				function(result) {res.send(result);}
			);
		});

    app.post ('/services/wishflowerAddWish', function (req, res)
    {
        var wish = req.query.wish;

        objPuzzleService.wishflowerAddWish
        (
            wish,
            function(result) {res.send(result);}
        );
    });

	PuzzleServiceRouete.prototype.getInstance = function () 
	{
		return objPuzzleService;
	}
}

module.exports = PuzzleServiceRouete;


