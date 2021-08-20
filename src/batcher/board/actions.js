import { CARD_DROPPED } from "../constants";
import { actionTypes } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";

export default {
	actionHandlers: {
		[CARD_DROPPED]: {
			stopPropagation: true,
			effect: ({ state, updateState, action }) => {
				updateState({
					cards: state.cards.map((card) => {
						console.log(
							"action.payload.cardId " +
								action.payload.cardId +
								" lane " +
								action.payload.lane
						);
						if (card.cardId === action.payload.cardId)
							return {
								...card,
								lane: action.payload.lane,
							};

						return card;
					}),
				});
			},
		},
		[actionTypes.COMPONENT_PROPERTY_CHANGED]: ({
			state,
			action,
			updateState,
		}) => {
			var lanes = state.lanes;
			var propertyChanged = action.payload.name;
			var newPropertyValue = action.payload.value;
			var laneTitle, laneSysId;

			console.log(
				">>>DEBUG: on " +
					propertyChanged +
					" change lanes are - " +
					JSON.stringify(lanes)
			);

			if (propertyChanged === "parentSetName") {
				console.log(
					propertyChanged +
						" changed to " +
						"'" +
						newPropertyValue +
						+"'" +
						" -- >>PAYLOAD>> " +
						JSON.stringify(action)
				);
				laneTitle = newPropertyValue;
				lanes[1].title = laneTitle;
			} else if (propertyChanged === "parentSetId") {
				console.log(
					propertyChanged +
						" changed to " +
						newPropertyValue +
						" -- >>PAYLOAD>> " +
						JSON.stringify(action)
				);
				laneSysId = newPropertyValue;
				lanes[1].sysid = laneSysId;
			}

			console.log(">>>DEBUG: after update, lanes are " + JSON.stringify(lanes));
			updateState({
				lanes: lanes,
			});
		},

		[actionTypes.COMPONENT_CONNECTED]: ({ dispatch }) => {
			dispatch("UPDATE_SETS_REQUESTED", {
				table: "sys_update_set",
				sysparm_query:
					"state=in progress^application.scope=x_165033_uibuild_0^parentISEMPTY^ORDERBYsys_created_on",
			});
		},
		UPDATE_SETS_REQUESTED: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			queryParams: ["sysparm_query"],
			startActionType: "SET_SEARCH_STARTED",
			successActionType: "SET_SEARCH_FINISHED",
		}),
		SET_SEARCH_STARTED: () => {},
		SET_SEARCH_FINISHED: ({ action, updateState }) => {
			var sets = action.payload.result;
			var setObjArray = [];
			for (var i = 0; i < sets.length; i++) {
				setObjArray.push({
					title: sets[i].name,
					cardId: i,
					lane: 0,
					setSysId: sets[i].sys_id
				});
			}
			updateState({
				cards: setObjArray,
			});
			//console.log('>>>populateCards outputting set array -- ' + JSON.stringify(setObjArray));
		},
	},
};
