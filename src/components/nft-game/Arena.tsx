import { useEffect, useState } from "react";
import useMyEpicGameContract from "src/hooks/useMyEpicGameContract";
import Loading from "../atoms/loading";

const Arena = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const {
		characterNFT,
		boss,
		attackBoss,
		setListenerForAttackBoss,
		unsetListenerForAttackBoss,
	} = useMyEpicGameContract()

	const attackToBoss = async () => {
		setIsLoading(true)
		await attackBoss()
		setIsLoading(false)
	}

	useEffect(() => {
		setListenerForAttackBoss()
		return () => {
			unsetListenerForAttackBoss()
		}
	}, [])

	return (
		<div className="flex flex-col justify-center items-center text-center w-full">
			{boss && (
				<div className="">
					<div className="relative p-4 rounded-lg bg-gray-200">
						<h2 className="font-bold text-3xl">{boss.name}</h2>
						<div>
							<img className="w-64 h-40 object-cover mb-2" src={boss.imageURI} alt={boss.name}></img>
							<div className="relative w-full h-6 bg-red-400 rounded-full dark:bg-gray-700">
								<div className="absolute h-6 bg-green-400 leading-none rounded-full" style={{ width: `${boss.hp / boss.maxHp * 100}%` }}></div>
								<div className="absolute w-full font-bold">{`${boss.hp} / ${boss.maxHp} HP`}</div>
							</div>
						</div>
					</div>
					<div>
						<button onClick={attackToBoss} disabled={isLoading} className="inline-flex items-center justify-center mt-4 w-9/12 h-10 text-xl font-bold bg-red-400 rounded-lg">
							{isLoading && (<Loading></Loading>)}
							{isLoading ? 'Attacking' : `Attack ${boss.name}`}
						</button>
					</div>
				</div>
			)
			}
			{
				characterNFT && (
					<div className="mt-12">
						<h2 className="font-bold text-2xl">Your Character</h2>
						<div className="relative mt-4 p-4 rounded-lg bg-gray-200">
							<h2 className="font-bold text-xl">{characterNFT.name}</h2>
							<div>
								<img className="w-40 h-40 object-cover mb-2" src={characterNFT.imageURI} alt={characterNFT.name}></img>
								<div className="relative w-full h-6 bg-red-400 rounded-full dark:bg-gray-700">
									<div className="absolute h-6 bg-green-400 leading-none rounded-full" style={{ width: `${characterNFT.hp / characterNFT.maxHp * 100}%` }}></div>
									<div className="absolute w-full font-bold">{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</div>
								</div>
								<div className="mt-4">
									<h4>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h4>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</div >
	)
}
export default Arena;
