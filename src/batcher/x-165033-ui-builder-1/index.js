import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import {dropBehavior} from '../behaviors/dragDropBehaviors';
import {CARD_DROPPED} from '../constants';
import '../card';

createCustomElement('x-165033-ui-builder-1', {
	renderer: {type: snabbdom},
	view,
	properties: {
		laneId: {
			default: 1
		},
		title: {
			default: 'Default Lane Title'
		},
		cards: {
			default: []
		}
	},
	actionHandlers: {
		'NOW_BUTTON#CLICKED': ({ action, updateState }) => {
			//TODO: get list of cards in this lane
			alert(JSON.stringify(action.payload.buttonId));
			
		}
	},
	styles,
	behaviors: [{
		behavior: dropBehavior,
		options: {
			onDrop(card, {dispatch, properties: {laneId}}) {
				const nextCard = {...card, lane: laneId};
				dispatch(CARD_DROPPED, nextCard);
			}
		}
	}]
});
