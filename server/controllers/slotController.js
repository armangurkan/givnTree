const db = require('../models/dbIndex');

const slotController = {};


slotController.createSlot = async (req, res, next) => {
	console.log(req);
	try{
		console.log('IM HERE')
		const queryText = 'INSERT INTO slots VALUES(DEFAULT, $1, $2, $3, $4,  DEFAULT) RETURNING u_id';
		const { event, organization, start_time, end_time} = req.body;
		const { rows } = await db.query(queryText, [event, organization, start_time, end_time]);
		console.log(rows[0]);
		//todo: this should return the u_id of the created user
		res.locals.data = rows[0];
		return next();
	} catch (error) {
		await db.query( 'ROLLBACK' );
		return next(error);
	}
}

slotController.updateSlot = async (req, res, next) => {
  try {
    const {u_id, ...rest} = req.body;
    const queryText = `UPDATE slots SET `;
    for (const key in rest) {
      queryText += `${key} = ${rest[key]} ,`
    }
    queryText = queryText.slice(0, queryText.length - 1);
	  queryText +=  ` WHERE u_id = $1`;
	  const query = {
		  text: queryText,
		  values: [String(u_id)],
		  rowMode: 'array',
	  }
	  const response = await db.query(query);
	  console.log('these are the rows', response);
	  res.locals.data = response.rows[0];
	  return next();
  } catch(error){
  	return next(error);
  }
}

slotController.deleteSlot = (req, res, next) => {
	const {id} = req.body;
	const query = 'DELETE FROM "Slots" WHERE _id = $1';
	const arr = [id];
	
	db.query(query, arr, err => {
		if (err) {
			return next(err)
		} else {
			return next();
		}
	})
}

slotController.getSlots = async (req, res, next) => {
	try{
		const {filterElement, filterId, returnElements} = req.params;
		console.log(filterElement, filterId, returnElements);
		if (filterElement && filterId) {
			console.log('filtered get route');
			const queryText = `SELECT * FROM slots where `.concat(String(filterElement), ' = $1', );
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
		const queryText = 'SELECT * FROM slots;';
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

module.exports = slotController;
