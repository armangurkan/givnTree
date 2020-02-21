const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');

router.post('/create', slotController.createSlot, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.delete('/:u_id',slotController.deleteSlot, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.get('/get/:filterElement?/:filterId?/:returnElements?', slotController.getSlots, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.post('/:u_id', slotController.updateSlot, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});
module.exports = router;
