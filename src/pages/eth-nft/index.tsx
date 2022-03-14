import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import useMetaMask from "src/hooks/useMetaMask";

const EthNFT = () => {
	const {
		account,
		isMetaMaskInstalled,
		connectMetaMask,
	} = useMetaMask();

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
				{isMetaMaskInstalled ? "installed" : "not installed"}
			</div>
		</div>
	)
}

export default EthNFT;
