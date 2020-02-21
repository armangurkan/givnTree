const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.post('/create', eventController.createEvent, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.delete('/:u_id',eventController.deleteEvent, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.get('/get/:filterElement?/:filterId?/:returnElements?', eventController.getEvents, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.post('/:id', eventController.updateEvent, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});
module.exports = router;
