const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		isMap:{
			type: Boolean,
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
		parentRegion: String,
		subregions: [String],
		landmarks: [String]
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;