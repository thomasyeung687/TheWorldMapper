const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital:{
			type: String,
			required: true
		},
		leader:{
			type: String,
			required: true
		},
		subregions: [ObjectId],
		landmarks: [String]
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;