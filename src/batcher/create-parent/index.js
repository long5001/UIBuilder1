import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-button';
import '../board';
import '@servicenow/now-card'

const view = (state, {updateState}) => {
	//const {parentSetName} = state;
	const home_assistant_main = document.querySelector("x-165033-ui-builder-create-parent").shadowRoot;
	return (
		
		<div>
			
			<input value="" placeholder="Enter Batch Parent Name" id="parentSetName" on-input={e => updateState({parentSetName: e.target.value})}/>
			<now-button label="Create Parent" variant="primary" size="md" icon="" config-aria={{}} tooltip-content="" append-to-payload={{buttonId: 'createParentButton'}} on-click={() => {
			//alert(parentSetName);
			home_assistant_main.getElementById('boardDiv').style.display="block";
			}}></now-button>
			<div id="boardDiv" className="board-hidden"> 
			<x-165033-ui-builder-1-board 
		parentSetName={state.parentSetName}
		></x-165033-ui-builder-1-board>
		</div>
			</div>
	);
};

createCustomElement('x-165033-ui-builder-create-parent', {
	renderer: {type: snabbdom},
	initialState: {
parentSetName: {
default: 'default parent set name'
}
	},
	view,
	styles
});
