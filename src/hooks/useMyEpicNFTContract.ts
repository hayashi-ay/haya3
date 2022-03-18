import useContract from "./useContract"
import myEpicNFT from "../contracts/MyEpicNFT.json"
import { useState } from "react"

const useMyEpicNFTContract = () => {
	const address = process.env.NEXT_PUBLIC_MY_EPIC_NFT_CONTRACT_ADDRESS as string
	const contract = useContract(address, myEpicNFT.abi)

	const [tokenId, setTokenId] = useState<Number>();

	const makeAnEpicNFT = () => {
		return contract?.makeAnEpicNFT()
	}

	const setListenerForNFTMinted = () => {
		contract?.on("NewEpicNFTMinted", (from, tokenId) => {
			console.log(from, tokenId)
			setTokenId(tokenId)
		})
	}

	return {
		makeAnEpicNFT,
		setListenerForNFTMinted,
		tokenId,
		address,
	}
}

export default useMyEpicNFTContract