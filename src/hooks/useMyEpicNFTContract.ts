import useContract from "./useContract"
import myEpicNFT from "../contracts/MyEpicNFT.json"

const useMyEpicNFTContract = () => {
	const address = process.env.NEXT_PUBLIC_MY_EPIC_NFT_CONTRACT_ADDRESS as string
	const contract = useContract(address, myEpicNFT.abi)

	const makeAnEpicNFT = () => {
		return contract?.makeAnEpicNFT()
	}

	const setListenerForNFTMinted = () => {
		contract?.on("NewEpicNFTMinted", (from, tokenId) => {
			console.log(from, tokenId)
			alert(
				`https://testnets.opensea.io/assets/${address}/${tokenId.toNumber()}`
			)
		})
	}

	return {
		makeAnEpicNFT,
		setListenerForNFTMinted
	}
}

export default useMyEpicNFTContract