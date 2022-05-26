import Button from "@/components/atoms/button";
import Arena from "@/components/nft-game/Arena";
import SelectCharacter from "@/components/nft-game/SelectCharacter";
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
		mintCharacterNFT,
	} = useMyEpicGameContract()

	useEffect(() => {
		connectMetaMask();
	}, [])

	useEffect(() => {
		if (chainId && chainId != 4) {
			alert("Make sure to connect Rinkeby Test Network")
		}
	}, [chainId])

	const renderContent = () => {
		if (!account) {
			return (
				<Button btnTxt="Connect wallet to get started" onClick={connectMetaMask}></Button>
			)
		} else if (characterNFT === null) {
			return (<SelectCharacter></SelectCharacter>)
		} else {
			return (<Arena></Arena>)
		}
	}

	return (
		<div className="p-8 min-h-screen">
			<div className="flex flex-col justify-center items-center">
				<p className="text-center text-5xl font-semibold">⚡️ METAVERSE GAME ⚡️</p>
				<p className="my-4 text-center text-2xl">Team up to beat the Boss</p>
				{renderContent()}
			</div>
		</div>
	)
}

export default NFTGame;