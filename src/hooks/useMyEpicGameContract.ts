import useContract from "./useContract"
import myEpicGame from "../contracts/MyEpicGame.json"
import { useEffect, useState } from "react"
import { CharacterData } from "src/types/nft-game"
import useMetaMask from "./useMetaMask"

const toCharacterData = (data: any) => {
	return {
		name: data.name,
		imageURI: data.imageURI,
		hp: data.hp.toNumber(),
		maxHp: data.maxHp.toNumber(),
		attackDamage: data.attackDamage.toNumber()
	}
}

const useMyEpicGameContract = () => {
	const address = process.env.NEXT_PUBLIC_MY_EPIC_GAME_CONTRACT_ADDRESS as string
	const contract = useContract(address, myEpicGame.abi)

	const [characterNFT, setCharacterNFT] = useState<CharacterData | null>(null)
	const [defaultCharacters, setDefaultCharacters] = useState<CharacterData[]>([])

	const { account } = useMetaMask()

	const fetchNFTMetadata = async () => {
		const txn = await contract?.checkIfUserHasNFT()
		console.log(txn)
		if (txn.name) {
			setCharacterNFT(toCharacterData(txn))
		} else {
			setCharacterNFT(null)
		}
	}

	const getDefaultCharacters = async () => {
		const txn = await contract?.getDefaultCharacters()
		console.log(txn)
		const characters = txn.map((data: any) => toCharacterData(data))
		setDefaultCharacters(characters)
	}

	const mintCharacterNFT = (characterId: any) => async () => {
		console.log("here")
		const txn = await contract?.mintCharacterNFT(characterId)
		console.log(txn)
	}

	useEffect(() => {
		fetchNFTMetadata()
		getDefaultCharacters()
	}, [account])

	//const setListenerForNFTMinted = () => {
	//	contract?.on("NewEpicNFTMinted", (from, tokenId) => {
	//		console.log(from, tokenId)
	//		setTokenId(tokenId)
	//	})
	//}

	return {
		characterNFT,
		defaultCharacters,
		address,
		mintCharacterNFT,
	}
}

export default useMyEpicGameContract