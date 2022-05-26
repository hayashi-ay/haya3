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

	const mintCharacterNFT = (characterId: any) => async (characterId: any) => {
		console.log("here")
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

	//index.js
	//// イベントを受信したときに起動するコールバックメソッド onCharacterMint を追加します。
	//const onCharacterMint = async (sender, tokenId, characterIndex) => {
	//  console.log(
	//    `CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
	//  );
	//  // NFT キャラクターが Mint されたら、コントラクトからメタデータを受け取り、アリーナ（ボスとのバトルフィールド）に移動するための状態に設定します。
	//  if (gameContract) {
	//    const characterNFT = await gameContract.checkIfUserHasNFT();
	//    console.log("CharacterNFT: ", characterNFT);
	//    setCharacterNFT(transformCharacterData(characterNFT));
	//  }
	//};

	return {
		characterNFT,
		defaultCharacters,
		address,
		mintCharacterNFT,
		setListenerForNFTMinted,
		unsetListenerForNFTMinted,
	}
}

export default useMyEpicGameContract