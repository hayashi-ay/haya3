import { useEffect, useState } from "react";
import useMyEpicGameContract from "src/hooks/useMyEpicGameContract";
import Loading from "../atoms/loading";

const SelectCharacter = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const {
		defaultCharacters,
		mintCharacterNFT,
		fetchNFTMetadata,
		setListenerForNFTMinted,
		unsetListenerForNFTMinted,
	} = useMyEpicGameContract()

	const mintCharacterNFTAction = (characterId: any) => async () => {
		setIsLoading(true)
		await mintCharacterNFT(characterId)
		setIsLoading(false)
	}

	const onCharacterMint = async (sender: any, tokenId: any, characterIndex: any) => {
		console.log(
			`CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
		);
		await fetchNFTMetadata()
	}

	useEffect(() => {
		setListenerForNFTMinted(onCharacterMint)
		// useEffectの返り値はunmounted時に実行される
		return () => {
			console.log('unmount')
			unsetListenerForNFTMinted(onCharacterMint);
		}
	}, [])

	return (
		<div className="flex flex-col items-center">
			<div className="inline-flex items-center justify-center">
				{isLoading && (<Loading></Loading>)}
				<h2 className="text-xl">{isLoading ? "Minting your character." : "Mint your character."}</h2>
			</div>
			< div className="m-4 flex flex-row">
				{defaultCharacters.map((character, index) => (
					<div className="m-8 relative" key={character.name}>
						<div className="absolute bg-gray-100 rounded-xl">
							<p className="px-4 py-2 text-xl font-bold">{character.name}</p>
						</div>
						<img className="w-64 h-64 z-10 object-cover" src={character.imageURI} alt={character.name}></img>
						<button onClick={mintCharacterNFTAction(index)} disabled={isLoading} className="absolute z-20 bottom-0 w-full h-10 text-xl font-bold bg-gray-200 rounded-b-lg">{`Mint ${character.name}`}</button>
					</div>
				))}
			</div>
		</div >
	);
}

export default SelectCharacter