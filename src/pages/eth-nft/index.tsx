import React, { useEffect, useState } from "react";
import useMetaMask from "src/hooks/useMetaMask";
import useMyEpicNFTContract from "src/hooks/useMyEpicNFTContract";

const EthNFT = () => {
	const {
		account,
		connectMetaMask,
	} = useMetaMask()

	const {
		makeAnEpicNFT,
		setListenerForNFTMinted,
	} = useMyEpicNFTContract()

	const tryToMintNFT = async () => {
		if (typeof window === "undefined")
			return
		try {
			const txn = await makeAnEpicNFT();
			console.log("Mining. Please wait for a while.")
			await txn.wait()
			console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		connectMetaMask()
	}, [])

	useEffect(() => {
		if (account) {
			setListenerForNFTMinted();
		}
	}, [account]);

	return (
		<div className="p-8 min-h-screen">
			<div className="flex flex-col justify-center items-center">
				<p className="text-center text-5xl font-semibold">My NFT Collection</p>
				<p className="my-4 text-center text-2xl">Mint your own special NFT💫</p>

				{!account && (
					<button className="px-4 h-11 w-32 text-xl border-0 bg-gray-100 rounded-md" onClick={connectMetaMask}>
						Connect to Wallet
					</button>
				)}
				{account && (
					<button className="px-4 h-11 w-32 text-xl border-0 bg-gray-100 rounded-md" onClick={tryToMintNFT}>
						Mint NFT
					</button>
				)}
			</div>
		</div>
	)
}

export default EthNFT;
