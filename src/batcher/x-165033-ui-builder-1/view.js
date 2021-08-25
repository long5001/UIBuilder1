export default (state) => {
	const {
		properties: { title, cards },
	} = state;
	return (
		<div className="lane">
			<header>{title}</header>
			{cards.map((card) => (
				<x-165033-example-card
					key={card.cardId}
					card-id={card.cardId}
					title={card.title}
					lane={card.lane}
				/>
			))}
			<div>
				<now-button
					label="Create Batch"
					variant="primary"
					size="md"
					icon=""
					config-aria={{}}
					tooltip-content=""
					append-to-payload={{ buttonId: "createBatchButton" }}
				></now-button>
			</div>
		</div>
	);
};
