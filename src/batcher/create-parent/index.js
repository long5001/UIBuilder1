import { createCustomElement } from "@servicenow/ui-core";
import { createHttpEffect } from "@servicenow/ui-effect-http";
import snabbdom from "@servicenow/ui-renderer-snabbdom";
import styles from "./styles.scss";
import "@servicenow/now-button";
import "../board";
import "@servicenow/now-card";

const view = (state, { updateState }) => {
	const shadowRoot = document.querySelector(
		"x-165033-ui-builder-create-parent"
	).shadowRoot;
	return (
		<div>
			<div id="createParentButtonDiv">
				<input
					value=""
					placeholder="Enter Batch Parent Name"
					id="parentSetName"
					on-input={(e) => updateState({ parentSetName: e.target.value })}
				/>
				<now-button
					label="Create Parent"
					variant="primary"
					size="md"
					icon=""
					config-aria={{}}
					tooltip-content=""
					append-to-payload={{ buttonId: "createParentButton" }}
					on-click={() => {
						shadowRoot.getElementById("boardDiv").style.display = "block";
						shadowRoot.getElementById("createParentButtonDiv").style.display =
							"none";
					}}
				></now-button>
			</div>
			<div id="boardDiv" className="board-hidden">
				<x-165033-ui-builder-1-board
					parentSetName={state.parentSetName}
					parentSetId={state.parentSetId}
				></x-165033-ui-builder-1-board>
			</div>
		</div>
	);
};

createCustomElement("x-165033-ui-builder-create-parent", {
	renderer: { type: snabbdom },
	initialState: {
		parentSetName: {
			default: "default parent set name",
		},
		parentSetId: {
			default: 1231432424,
		},
	},
	actionHandlers: {
		"NOW_BUTTON#CLICKED": ({ action, state: { parentSetName }, dispatch }) => {
			const buttonId = action.payload.buttonId;

			if (buttonId === "createParentButton") {
				dispatch("CREATE_PARENT_UPDATE_SET", {
					requestData: {
						name: parentSetName,
					},
				});
			}
		},
		CREATE_PARENT_UPDATE_SET: createHttpEffect(
			"/api/now/table/sys_update_set",
			{
				method: "POST",
				dataParam: "requestData",
			}
		),
		NEW_SET_CREATED: ({ action, updateState }) => {
			updateState({
				parentSetId: action.payload.result.sys_id,
			});
		},
	},
	view,
	styles,
});
