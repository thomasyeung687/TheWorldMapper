const { model, Schema, ObjectId } = require('mongoose');

const mapSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		subregions: [String],
	},
	{ timestamps: true }
);

const Map = model('Map', mapSchema);
module.exports = Map;