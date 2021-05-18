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
			console.log("getAllChildren",subregionIds);
			for( const id of subregionIds){
				console.log("in map",id);
				const objectID = new ObjectId(id)
				const region = await Region.findOne({_id: objectID});
				console.log(region);
				subregionArr = subregionArr.concat(region);
			}
			console.log(subregionArr);
			return subregionArr;
		},
		getAllRegionAbove: async (_, args) =>{
			const {_id } = args;
			console.log("getting regions above")
			let regionsAbove = [];
			let id = new ObjectId(_id);
			let region = await Region.findOne({_id: id})
			let parentId = new ObjectId(region.parentRegion);
			let parentRegion = await Region.findOne({_id: parentId})

			while(parentRegion.parentRegion != null){
				let p_id = new ObjectId(parentRegion.parentRegion);
				let fetchedRegion = await Region.findOne({_id: p_id});
				let parentSubregions = fetchedRegion.subregions;
				console.log(parentSubregions)
				for( const id of parentSubregions){
					const objectID = new ObjectId(id)
					const region = await Region.findOne({_id: objectID});
					regionsAbove.push(region);
				}
				let parentIdL = new ObjectId(parentRegion.parentRegion);
				parentRegion = await Region.findOne({_id: parentIdL})
			}
			console.log("getting regions above", regionsAbove)
			return regionsAbove;
		},
		getAllLandmarks: async(_, args) => {
			const {_id} = args;
			const thisregionId = new ObjectId(_id);
			const thisregion = await Region.findOne({_id: thisregionId});
			let landmarks = thisregion.landmarks;
			let allLandmarks = []
			allLandmarks = allLandmarks.concat(landmarks);
			console.log(allLandmarks);
			let nodes = [];
			nodes = nodes.concat(thisregion.subregions);
			while(nodes.length !== 0){
				const OID = new ObjectId(nodes.pop());
				const regionNode = await Region.findOne({_id: OID});
				if(regionNode){
					for(let i = 0; i < regionNode.landmarks.length; i++){
						allLandmarks.push(regionNode.landmarks[i]+"-"+regionNode.name);
					}
					nodes = nodes.concat(regionNode.subregions);
				}
			}
			console.log("done")
			return allLandmarks;
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
		updateSubregionArray: async (_, args) => {
			const {_id, subregionsArr} = args;
			console.log(_id, subregionsArr);
			const objID = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objID}, {subregions: subregionsArr});
			if(updated){
				const newRegion = await Region.findOne({_id: objID});
				console.log(newRegion);
				return newRegion;
			}else{
				return null;
			}
		},
		updateRegionLandmarks: async (_, args) => {
			const {_id, landmark, opcode, newLandmark} = args;
			const objectID = new ObjectId(_id);
			const region = await Region.findOne({_id: objectID});
			let landmarks = region.landmarks;
			console.log("updateRegionLandmarks",landmarks);
			// opcodes: 0 - delete, 1 - add , 2 - edit
			if(opcode === "1"){//add landmark
				console.log("adding updateRegionLandmarks", _id, landmark, opcode);
				landmarks.push(landmark);
				console.log("lmArr",landmarks);
				let updated = await Region.updateOne({_id: objectID}, {landmarks: landmarks});
				if(updated){
					console.log("successfully added")
					return true;
				}else{
					console.log("unsuccessfully added")
					return false;
				}
			}else if(opcode === "0"){ //delete landmark
				console.log("deleting updateRegionLandmarks", _id, landmark, opcode);
				landmarks = landmarks.filter(lm => lm !== landmark);
				console.log("lmArr",landmarks);

				let updated = await Region.updateOne({_id: objectID}, {landmarks: landmarks});
				if(updated){
					console.log("successfully deleted")
					return true;
				}else{
					console.log("unsuccessfully deleted")
					return false;
				}
			}else{//edit landmark.
				console.log("editing updateRegionLandmarks", _id, landmark, opcode, newLandmark);
				for( let i = 0 ; i < landmarks.length; i++){
					if(landmarks[i] === landmark){
						landmarks[i] = newLandmark;
					}
				}
				console.log(landmarks);

				let updated = await Region.updateOne({_id: objectID}, {landmarks: landmarks});
				if(updated){
					console.log("successfully edited")
					return true;
				}else{
					console.log("unsuccessfully edited")
					return false;
				}
			}
		},
		updateRegionParent: async (_, args)=>{
			const {_id, parentId} = args;
			const id = new ObjectId(_id);
			const newParentId = new ObjectId(parentId);

			const region 			= await Region.findOne({_id: id});
			const ParentId 			= new ObjectId(region.parentRegion);

			const parentRegion 		= await Region.findOne({_id: ParentId});
			const newParentRegion  	= await Region.findOne({_id: newParentId});
			
			const parentRegionSubregions = parentRegion.subregions.filter((id)=> id !== _id); //removing region from oldParentSubregions
			const newParentRegionSubregions = newParentRegion.subregions.concat([region._id]);//adding to the subregions of the new parent.

			console.log(newParentRegionSubregions, parentRegionSubregions);
			
			const updateRegion = await Region.updateOne({_id: id}, {parentRegion: newParentId})
			const updateoldParentRegion = await Region.updateOne({_id: ParentId}, {subregions: parentRegionSubregions})
			const updateNewParentRegon = await Region.updateOne({_id: newParentId}, {subregions: newParentRegionSubregions})

			if(updateRegion && updateoldParentRegion && updateNewParentRegon){
				return true;
			}
			return false;
		}

	}
}
