const db = require('../models/dbIndex');

const orgsController = {};

orgsController.createOrg = async (req, res, next) => {
	try{
		console.log('IM HERE')
		const queryText = 'INSERT INTO organizations VALUES(DEFAULT, $1, $2, $3, $4, DEFAULT) RETURNING u_id';
		const { name, description, email, password} = req.body;
		const { rows } = await db.query(queryText, [name, description, password, email]);
		console.log(rows[0]);
		//todo: this should return the u_id of the created user
		res.locals.data = rows[0];
		return next();
	} catch (error) {
		await db.query( 'ROLLBACK' );
		return next(error);
	}
};
orgsController.updateOrg = async (req, res, next) => {
	// try{
	// 	const
	//
	// }
	// catch(e){
	// 	await db.query('ROLLBACK');
	// 	return next(e)
	// }
}
orgsController.deleteOrg = async (req, res, next) => {
	const {id} = req.body;
	const query = 'DELETE FROM organizations WHERE _id = $1';
	const arr = [id];
	
	db.query(query, arr, err => {
		if (err) {
			return next(err)
		} else {
			return next();
		}
	})
};

//

orgsController.getOrgs = async (req, res, next) => {
	try{
		const {filterElement, filterId, returnElements} = req.params;
		console.log(filterElement, filterId, returnElements);
		if (filterElement && filterId) {
			console.log('filtered get route');
			const queryText = `SELECT * FROM organizations where `.concat(String(filterElement), ' = $1', );
			if (returnElements) {
				console.log('also return modified get route');
				const queryTextAdd = returnElements.split('&').join(', ');
				queryText.replace('*', queryTextAdd);
			}
			const query = {
				text: queryText,
				values: [String(filterId)],
				rowMode: 'array',
			}
			console.log('i am about to run the aaaaaaa for getting Orgteers with', queryText);
			const response = await db.query(query);
			console.log('these are the rows', response);
			res.locals.data = response.rows[0];
			return next();
		}
		console.log('plain get route');
		const queryText = 'SELECT * FROM organizations;';
		const { rows } = await db.query(queryText, []);
		console.log(rows);
		res.locals.data = [...rows];
		return next();
	}
	catch(error){
		await db.query( 'ROLLBACK' );
		return next(error);
	}
}

module.exports = orgsController;
