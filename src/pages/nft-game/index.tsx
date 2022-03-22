import Button from "@/components/atoms/button";
import { useEffect, useState } from "react";
import useMetaMask from "src/hooks/useMetaMask";
import useMyEpicGameContract from "src/hooks/useMyEpicGameContract";

const NFTGame = () => {
	const {
		account,
		chainId,
		connectMetaMask
	} = useMetaMask()

	const {
		characterNFT,
		defaultCharacters,
	} = useMyEpicGameContract()

	useEffect(() => {
		connectMetaMask();
	}, [])

	useEffect(() => {
		if (chainId && chainId != 4) {
			alert("Make sure to connect Rinkeby Test Network")
		}
	}, [chainId])

	const renderSelectCharacter = () => {
		return (
			<div className="flex flex-col items-center">
				<h2 className="text-xl">Mint your character.</h2>
				<div className="m-4 flex flex-row">
					{defaultCharacters.map((char, index) => (
						<div className="m-8 relative">
							<div className="absolute bg-gray-100 rounded-xl">
								<p className="px-4 py-2 text-xl font-bold">{char.name}</p>
							</div>
							<img className="w-64 h-64 z-10 object-cover" src={char.imageURI} alt={char.name}></img>
							<button className="absolute z-20 bottom-0 w-full h-10 text-xl font-bold bg-gray-200 rounded-b-lg">{`Mint ${char.name}`}</button>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="p-8 min-h-screen">
			<div className="flex flex-col justify-center items-center">
				<p className="text-center text-5xl font-semibold">⚡️ METAVERSE GAME ⚡️</p>
				<p className="my-4 text-center text-2xl">Team up to beat the Boss</p>
				{!account && (
					<Button btnTxt="Connect wallet to get started" onClick={connectMetaMask}></Button>
				)}
				{account && (
					renderSelectCharacter()
				)}
			</div>
		</div>
	)
}

export default NFTGame;