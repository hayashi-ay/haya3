import Button from "@/components/atoms/button";
import { useEffect, useRef } from "react";
import useMetaMask from "src/hooks/useMetaMask";

const NFTGame = () => {
	const {
		account,
		chainId,
		connectMetaMask
	} = useMetaMask()

	useEffect(() => {
		connectMetaMask();
	}, [])

	useEffect(() => {
		if (chainId && chainId != 4) {
			alert("Make sure to connect Rinkeby Test Network")
		}
	}, [chainId])

	const SelectCharacter = () => {
		return (
			<div className="">
				<h2>⏬ Mint your character. ⏬</h2>
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
					SelectCharacter()
				)}
			</div>
		</div>
	)
}

export default NFTGame;