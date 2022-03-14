import useContract from "./useContract"
import myEpicNFT from "../contracts/MyEpicNFT.json"

const useMyEpicNFTContract = () => {
	const address = process.env.NEXT_PUBLIC_MY_EPIC_NFT_CONTRACT_ADDRESS as string
	const contract = useContract(address, myEpicNFT.abi)

	const makeAnEpicNFT = () => {
		return contract?.makeAnEpicNFT();
	}

	return {
		makeAnEpicNFT
	}
}

export default useMyEpicNFTContract;