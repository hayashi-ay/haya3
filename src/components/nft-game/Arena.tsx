import useMyEpicGameContract from "src/hooks/useMyEpicGameContract";

const Arena = () => {
	const {
		characterNFT,
		boss,
	} = useMyEpicGameContract()

	const attackToBoss = async () => { }

	return (
		<div>
			{boss && (
				<div>
					<h2>{boss.name}</h2>
					<img className="w-64 h-64 z-10 object-cover" src={boss.imageURI} alt={boss.name}></img>
					<div>
						<progress value={boss.hp} max={boss.maxHp} />
						<p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
					</div>
					<div>
						<button onClick={attackToBoss} className="bottom-0 w-full h-10 text-xl font-bold bg-gray-200 rounded-b-lg">
							{`Attack ${boss.name}`}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
export default Arena;
