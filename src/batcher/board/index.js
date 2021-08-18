import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import {LANES} from '../constants';
import taskBoardActions from './actions';
import '@servicenow/now-button';

createCustomElement('x-165033-ui-builder-1-board', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		lanes: LANES,
	},
	styles,
	...taskBoardActions
});
