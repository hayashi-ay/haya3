import Button from "@/components/atoms/button";

const NFTGame = () => {

	return (
		<div className="p-8 min-h-screen">
			<div className="flex flex-col justify-center items-center">
				<p className="text-center text-5xl font-semibold">NFT GAME</p>
				<p className="my-4 text-center text-2xl">Defeat boss</p>
				<Button btnTxt="Connect to wallet" onClick={() => console.log("hello")}></Button>
			</div>
		</div>
	)
}

export default NFTGame;