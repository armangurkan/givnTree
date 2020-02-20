const db = require('../models/dbIndex');

const subsController = {};

	subsController.createSub = async (req, res, next) => {
	try{
		console.log('IM HERE');
		//todo: const queryText = 'INSERT INTO subscriptions VALUES(DEFAULT, $1, $2, $3, DEFAULT) RETURNING u_id';
		//todo :const { name, password, email } = req.body;
		//todo: console.log(name, password, email);
		const { rows } = await db.query(queryText, [name, password, email]);
		//todo: this should return the u_id of the created user OK
		res.locals.data = rows[0];
		return next();
	} catch (error) {
		await db.query( 'ROLLBACK' );
		return next(error);
	}
};
subsController.updateSub = async (req, res, next) => {
	// try{
	// 	const
	//
	// }
	// catch(e){
	// 	await db.query('ROLLBACK');
	// 	return next(e)
	// }
}
subsController.deleteSub = async (req, res, next) => {
	try{
		const {u_id} = req.params;
		const queryText = 'DELETE FROM subscriptions WHERE u_id = $1';
		const { rows } = await db.query(queryText, [u_id]);
		console.log(rows[0]);
		res.locals.data = rows[0];
		return next();
	}
	catch(error){
		await db.query( 'ROLLBACK' );
		return next(error);
	}
};

//

subsController.getSubs = async (req, res, next) => {
	try{
		const {filterElement, filterId, returnElements} = req.params;
		console.log(filterElement, filterId, returnElements);
		if (filterElement && filterId) {
			console.log('filtered get route');
			const queryText = `SELECT * FROM subscriptions where `.concat(String(filterElement), ' = $1', );
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
			console.log('i am about to run the aaaaaaa for getting Subteers with', queryText);
			const response = await db.query(query);
			console.log('these are the rows', response);
			res.locals.data = response.rows[0];
			return next();
		}
		console.log('plain get route');
		const queryText = 'SELECT * FROM subscriptions ORDER BY name;';
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

module.exports = subsController;
