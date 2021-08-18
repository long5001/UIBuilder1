import '../x-165033-ui-builder-1';
import '@servicenow/now-card';

export default state => {
	const {lanes, cards} = state;
	return (
		<div className="task-board">
			<now-card>{state.properties.parentSetName}</now-card>
			{lanes.map(lane => (
				<div className="lane-container">
					<x-165033-ui-builder-1
						key={lane.laneId}
						laneId={lane.laneId}
						title={lane.title}
						cards={cards.filter(card => card.lane === lane.laneId)}
					/>
				</div>
			))}
		</div>
		
	);
};
