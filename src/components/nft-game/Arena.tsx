import useMyEpicGameContract from "src/hooks/useMyEpicGameContract";

const Arena = () => {
	const {
		characterNFT,
		boss,
	} = useMyEpicGameContract()

	const attackToBoss = async () => { }

	return (
		<div className="text-center">
			{boss && (
				<div className="">
					<div className="relative">
						<h2>{boss.name}</h2>
						<div>
							<img className="w-64 h-64 object-cover" src={boss.imageURI} alt={boss.name}></img>
							<div className="relative w-full h-6 bg-red-400 rounded-full dark:bg-gray-700">
								<div className="absolute h-6 bg-green-400 text-base font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: '45%' }}></div>
								<div className="absolute w-full font-bold">{`${boss.hp} / ${boss.maxHp} HP`}</div>
							</div>
						</div>
					</div>
					<div>
						<button onClick={attackToBoss} className="mt-12 w-full h-10 text-xl font-bold bg-gray-200 rounded-b-lg">
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
