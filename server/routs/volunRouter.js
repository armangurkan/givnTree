const express = require('express');
const router = express.Router();
const volunController = require('../controllers/volunController');


router.post('/create', volunController.createVolun, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.delete('/:u_id',volunController.deleteVolun, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.get('/get/:filterElement?/:filterId?/:returnElements?', volunController.getVoluns, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.post('/:id', volunController.updateVolun, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});
module.exports = router;
