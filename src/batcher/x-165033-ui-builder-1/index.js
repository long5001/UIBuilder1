import { createCustomElement } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import view from "./view";
import { dropBehavior } from "../behaviors/dragDropBehaviors";
import { CARD_DROPPED } from "../constants";
import "../card";

createCustomElement("x-165033-ui-builder-1", {
	renderer: {
		type: snabbdom,
	},
	view,
	properties: {
		laneId: {
			default: 1,
		},
		title: {
			default: "Default Lane Title",
		},
		cards: {
			default: [],
		},
		sysid: {
			default: "default lane sys_id",
		},
	},
	actionHandlers: {
		"NOW_BUTTON#CLICKED": ({
			action,
			properties: { cards, laneId, sysid },
			dispatch,
		}) => {
			if (action.payload.buttonId === "createBatchButton") {
				//alert(JSON.stringify(cards) + ' ' + laneId);
				var batch = cards.map((cards) => {
					if (cards.lane === laneId) {
						cards.parentSet = {
							sysid: sysid,
						};
						return cards;
					}
				});
			}
			dispatch("UPDATE_SETS", {
				data: batch,
			});
		},
		UPDATE_SETS: createHttpEffect(
			"/api/x_165033_uibuild_0/batch_update_sets/update_sets",
			{
				method: "PATCH",
				dataParam: "data",
				startActionType: "BATCHING_STARTED",
				successActionType: "SETS_UPDATED",
			}
		),
	},
	styles,
	behaviors: [
		{
			behavior: dropBehavior,
			options: {
				onDrop(card, { dispatch, properties: { laneId } }) {
					const nextCard = {
						...card,
						lane: laneId,
					};
					dispatch(CARD_DROPPED, nextCard);
				},
			},
		},
	],
});
