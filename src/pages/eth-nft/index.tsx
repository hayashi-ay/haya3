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

	return (
		<div className="p-4 min-h-screen">
			<div>
				<p>My NFT Collection</p>
				<p>Mint your own special NFT💫</p>

				{!account && (
					<button className="mt-4 p-2 border-0 bg-gray-100 rounded-md" onClick={connectMetaMask}>
						Connect to Wallet
					</button>
				)}
				{account && (
					<button className="mt-4 p-2 border-0 bg-gray-100 rounded-md" onClick={tryToMintNFT}>
						Mint NFT
					</button>
				)}
			</div>
		</div>
	)
}

export default EthNFT;
