import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Footer from '@/organism/footer'

const EthNFT = () => {
	return (
		<div className="p-4">
			<div className="min-h-screen">
				<div>
					<p>My NFT Collection</p>
					<p>Mint your own special NFT💫</p>
					<button className="mt-4 p-2 border-0 bg-gray-100 rounded-md">
						Connect to Wallet
					</button>
				</div>
			</div>
			<Footer></Footer>
		</div>
	)
}

export default EthNFT;
