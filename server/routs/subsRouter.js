const express = require('express');
const router = express.Router();
const subsController = require('../controllers/subsController');


router.post('/create', subsController.createSub, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.delete('/:u_id',subsController.deleteSub, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.get('/get/:filterElement?/:filterId?/:returnElements?', subsController.getSubs, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.post('/:id', subsController.updateSub, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});
module.exports = router;
