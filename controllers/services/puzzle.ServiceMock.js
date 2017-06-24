//var req_db_wish_mock_schema = null;
var req_db_wish_mock = null;

if (typeof require != 'undefined')
{
	req_db_wish_mock = require(__basePath + "/models/db_wish_mock.js");
}

function PuzzleService() 
{ 
	this.m_db_wish = new req_db_wish_mock();
}

PuzzleService.prototype.init = function (_dbclient) 
{
	this.m_db_wish.initOnce(_dbclient);
}

PuzzleService.prototype.wishflowerGetAll = function (_callback) 
{
	this.m_db_wish.wishflowerGetAll(_callback);
}

PuzzleService.prototype.wishflowerGetById = function (_id, _callback)
{
	this.m_db_wish.wishflowerGetById(_id, _callback);
}

PuzzleService.prototype.wishflowerGetByKeyPath = function (_keyPath, _callback)
{
    this.m_db_wish.wishflowerGetByKeyPath(_keyPath, _callback);
}

PuzzleService.prototype.wishflowerGetByWish = function (_wish, _callback)
{
    this.m_db_wish.wishflowerGetByWish(_wish, _callback);
}

PuzzleService.prototype.wishflowerAddWish = function (_wish, _callback)
{
    this.m_db_wish.wishflowerAddWish(_wish, _callback);
}

PuzzleService.prototype.wishflowerAddById = function (_id, _wish, _callback)
{
	this.m_db_wish.wishflowerAddById(_id, _wish, _callback);
}

PuzzleService.prototype.wishflowerAddByKeyPath = function (_keyPath, _wish, _callback)
{
    this.m_db_wish.wishflowerAddByKeyPath(_keyPath, _wish, _callback);
}

PuzzleService.prototype.wishflowerClearTree = function (_callback)
{
    this.m_db_wish.wishflowerClearTree(_callback);
}

PuzzleService.prototype.dump = function ()
{
}

module.exports = PuzzleService;

