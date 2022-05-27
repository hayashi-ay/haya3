import useMyEpicGameContract from "src/hooks/useMyEpicGameContract";

const Arena = () => {
	const {
		characterNFT,
		boss,
	} = useMyEpicGameContract()

	const attackToBoss = async () => {
		console.log('attack to boss')
	}

	return (
		<div className="text-center">
			{boss && (
				<div className="">
					<div className="relative">
						<h2 className="font-bold text-3xl">{boss.name}</h2>
						<div>
							<img className="w-64 h-40 object-cover" src={boss.imageURI} alt={boss.name}></img>
							<div className="relative w-full h-6 bg-red-400 rounded-full dark:bg-gray-700">
								<div className="absolute h-6 bg-green-400 text-base font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${boss.hp / boss.maxHp * 100}%` }}></div>
								<div className="absolute w-full font-bold">{`${boss.hp} / ${boss.maxHp} HP`}</div>
							</div>
						</div>
					</div>
					<div>
						<button onClick={attackToBoss} className="mt-4 w-9/12 h-10 text-xl font-bold bg-gray-200 rounded-lg">
							{`Attack ${boss.name}`}
						</button>
					</div>
				</div>
			)
			}
		</div >
	)
}
export default Arena;
