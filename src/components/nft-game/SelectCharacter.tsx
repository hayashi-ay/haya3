import { useEffect } from "react";
import useMyEpicGameContract from "src/hooks/useMyEpicGameContract";

const SelectCharacter = () => {
	const {
		characterNFT,
		defaultCharacters,
		mintCharacterNFT,
		setListenerForNFTMinted,
		unsetListenerForNFTMinted,
	} = useMyEpicGameContract()

	const onCharacterMint = async (sender: any, tokenId: any, characterIndex: any) => {
		console.log(
			`CharacterNFTMinted - sender: ${sender} tokenId: ${tokenId.toNumber()} characterIndex: ${characterIndex.toNumber()}`
		);
	}

	useEffect(() => {
		setListenerForNFTMinted(onCharacterMint)
		// useEffectの帰り値はunmounted時に実行される
		return () => {
			console.log('unmount')
			unsetListenerForNFTMinted(onCharacterMint);
		}
	}, [])

	return (
		<div className="flex flex-col items-center">
			<h2 className="text-xl">Mint your character.</h2>
			<div className="m-4 flex flex-row">
				{defaultCharacters.map((character, index) => (
					<div className="m-8 relative" key={character.name}>
						<div className="absolute bg-gray-100 rounded-xl">
							<p className="px-4 py-2 text-xl font-bold">{character.name}</p>
						</div>
						<img className="w-64 h-64 z-10 object-cover" src={character.imageURI} alt={character.name}></img>
						<button onClick={mintCharacterNFT(index)} className="absolute z-20 bottom-0 w-full h-10 text-xl font-bold bg-gray-200 rounded-b-lg">{`Mint ${character.name}`}</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default SelectCharacter