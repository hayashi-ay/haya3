import Loading from "@/components/atoms/loading";
import React, { useEffect, useState } from "react";
import useMetaMask from "src/hooks/useMetaMask";
import useMyEpicNFTContract from "src/hooks/useMyEpicNFTContract";

const EthNFT = () => {
	const [isMinting, setIsMinting] = useState<boolean>(false);

	const {
		account,
		connectMetaMask,
	} = useMetaMask()

	const {
		makeAnEpicNFT,
		setListenerForNFTMinted,
		tokenId,
		address,
	} = useMyEpicNFTContract()

	const tryToMintNFT = async () => {
		if (typeof window === "undefined")
			return
		try {
			const txn = await makeAnEpicNFT();
			setIsMinting(true);
			console.log("Mining. Please wait for a while.")
			await txn.wait()
			setIsMinting(false);
			console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`)
		} catch (e) {
			setIsMinting(false);
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

				{!account && !tokenId && (
					<button className="px-4 h-11 w-auto text-xl border-0 bg-gray-100 rounded-md" onClick={connectMetaMask}>
						Connect to Wallet
					</button>
				)}
				{account && !tokenId && (
					<button disabled={isMinting} className="px-4 inline-flex items-center justify-center h-11 w-36 text-xl border-0 bg-gray-100 rounded-md" onClick={tryToMintNFT}>
						{isMinting && (<Loading></Loading>)}
						{isMinting ? "Minting..." : "Mint NFT"}
					</button>
				)}
				{tokenId && (
					<div className="text-xl text-center">
						<span>Thanks for minting.<br />You can see your NFT&nbsp;</span>
						<a href={`https://testnets.opensea.io/assets/${address}/${tokenId}`} target="_blank" rel="noreferrer" className="underline text-blue-300">
							here
						</a>
					</div>
				)}
			</div>
		</div>
	)
}

export default EthNFT;
