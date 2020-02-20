const express = require('express');
const router = express.Router();
const orgsController = require('../controllers/orgsController');
const authController = require('../controllers/authController');

router.post('/create', orgsController.createOrg, authController.addCookie, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.delete('/:u_id',orgsController.deleteOrg, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.get('/get/:filterElement?/:filterId?/:returnElements?', orgsController.getOrgs, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});

router.post('/:id', orgsController.updateOrg, (req, res) => {
	return res.status(200).send(JSON.stringify(res.locals.data));
});
module.exports = router;
