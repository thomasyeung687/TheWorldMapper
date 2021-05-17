const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of map objects on success, and an empty array on failure
		**/
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			console.log("getAllMaps:",req.userId)
			console.log("in getallmaps resolver!");
			if(!_id) { 
				console.log("getAllMaps uid is null!");
				return([]);
			};
			const maps = await Region.find({owner: _id, parentRegion: null}); //maps are regions with a null parent
			if(maps) return (maps);
		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({_id: objectId});
			if(region){
				// const subregionIds = region.subregions;
				// console.log(subregionIds);
				// const subregionsObjArr = []

				// const getData = async () => {
				// 	return Promise.all(
				// 		subregionIds.map(async (_rid) => {
				// 		const maps = await Region.findOne({_id: _rid});
				// 		console.log("a Map",maps);
				// 		const newMap = new Region({
				// 			_id: maps._id,
				// 			// id: id,
				// 			name: maps.name,
				// 			owner: maps.owner,
				// 			capital: maps.capital,
				// 			leader: maps.leader,
				// 			parentRegion: maps.parentRegion,
				// 			subregions: maps.subregions,
				// 			landmarks: maps.landmarks
				// 		});
				// 		subregionsObjArr.push(newMap)
				// 	}))
				// }
				// await getData();
				// console.log("subregionsObjArr",subregionsObjArr)
				// region["subregions"] = subregionsObjArr;
				// region["parentRegion"] = "";
				console.log("region", region)
				return region;
			}else return ({});
		},
		getAllChildren: async (_, args) => {
			const { subregionIds } = args;
			let subregionArr = [];
			console.log(subregionIds);
			subregionIds.map( async (id) => {
				console.log("in map",id);
				const objectID = new ObjectId(id)
				const region = await Region.findOne({_id: objectID});
				console.log(region);
				subregionArr = subregionArr.concat(region);
			})
			console.log(subregionArr);
			return subregionArr;
		}
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addMap: async (_, args) => {
			console.log("map-resolver");
			const { map } = args;
			const objectId = new ObjectId();
			const { name, owner, subregions, capital, leader, landmarks } = map;
			const newMap = new Region({
				_id: objectId,
				// id: id,
				name: name,
				owner: owner,
				capital: capital,
				leader: leader,
				parentRegion: null,
				subregions: subregions,
				landmarks: landmarks
			});
			const updated = await newMap.save();
			if(updated) return "newMap";
			else return ("");
		},
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		updateMapName: async (_, args) => {
			const { _id, value } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {name: value});
			if(updated) return value;
			else return "";
		},



		addRegion: async (_, args) => {
			console.log("addRegion-resolver");
			const { region, index} = args;
			const { name, owner, subregions, capital, leader, landmarks, parentRegion, _id} = region;
			
			let objectId = _id;
			if(objectId == ""){
				objectId = new ObjectId();
			}

			const newRegion = new Region({
				_id: objectId,
				// id: id,
				name: name,
				owner: owner,
				capital: capital,
				leader: leader,
				parentRegion: parentRegion,
				subregions: subregions,
				landmarks: landmarks
			});
			const created = await newRegion.save();
			if(created){
				const parent =  await Region.findOne({_id: parentRegion})
				if(parent){
					console.log("found parent", parent)
					console.log("Obj id", objectId)
					let subregions = parent.subregions;//adding subregionid to parent region in db
					console.log(subregions);
					
					//for deleting to put the region back to where it was.
					if(index < 0) subregions.push(objectId);
   					else subregions.splice(index, 0, objectId);

					console.log(subregions);
					const updated = await Region.updateOne({_id: parentRegion}, {subregions: subregions});
					const parentreFetched =  await Region.findOne({_id: parentRegion})
					if(updated){
						console.log("Sucessfully updated parent in backend")
						return created;
					}else{
						console.log("Coundn't update parent Deleting region created")
						const deleted = Region.deleteOne({_id: objectId})
						return (null)
					}
				}else{
					console.log("Coundn't find parent Deleting region created")
					const deleted = Region.deleteOne({_id: objectId})
					return (null)
				}
			}else return (null);
		},
		deleteRegion: async (_, args) => {
			console.log("hello");
			const { _id, childID} = args;
			const parentId = new ObjectId(_id);
			let childId1 = new ObjectId(childID);

			const parentRegion = await Region.findOne({_id: parentId});
			console.log(parentRegion)
			let pSubregions = parentRegion.subregions;
			pSubregions = pSubregions.filter(_id =>_id !== childID);
			console.log(pSubregions)
			const updated = await Region.updateOne({_id: parentId}, {subregions: pSubregions}); //update parent with new subregions array
			if(updated){
				console.log("updated parent region")
			}else{
				console.log("failed update parent region")
			}
			const deletedRegion = await Region.findOne({_id: childId1});
			const deleted = await Region.deleteOne({_id: childId1});

			if(deleted) return deletedRegion;
			else return null;
		},
		updateRegionField: async (_, args) => {
			console.log("editRegionField");
			const { _id, field, value} = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id:objectId}, {[field]: value});
			if(updated) return true;
			else return false;
		},

	}
}
