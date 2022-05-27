import useContract from "./useContract"
import myEpicGame from "../contracts/MyEpicGame.json"
import { useEffect, useState } from "react"
import { CharacterData } from "src/types/nft-game"
import useMetaMask from "./useMetaMask"

type nftMintedCallbackFunc = (sender: any, tokenId: any, characterIndex: any) => void

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
	const [boss, setBoss] = useState<CharacterData | null>(null)

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

	const fetchBoss = async () => {
		const txn = await contract?.getBigBoss()
		console.log(txn)
		setBoss(toCharacterData(txn))
	}

	const attackBoss = async () => {
		const txn = await contract?.attackBoss()
		console.log(txn)
	}

	const mintCharacterNFT = (characterId: any) => async (characterId: any) => {
		const txn = await contract?.mintCharacterNFT(characterId)
		console.log(txn)
	}

	const setListenerForNFTMinted = (func: nftMintedCallbackFunc) => {
		contract?.on("CharacterNFTMinted", func);
	}

	const unsetListenerForNFTMinted = (func: nftMintedCallbackFunc) => {
		contract?.off("CharacterNFTMinted", func);
	}

	useEffect(() => {
		fetchNFTMetadata()
		getDefaultCharacters()
	}, [account])

	useEffect(() => {
		// 負荷軽減のためにNFTを所有しているときだけ取得する
		if (characterNFT !== null) {
			fetchBoss()
		}
	}, [characterNFT])

	return {
		characterNFT,
		defaultCharacters,
		boss,
		address,
		attackBoss,
		mintCharacterNFT,
		setListenerForNFTMinted,
		unsetListenerForNFTMinted,
	}
}

export default useMyEpicGameContract