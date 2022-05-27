import { useEffect, useState } from "react";

const useMetaMask = () => {
	const [account, setAccount] = useState<string>();
	const [chainId, setChainId] = useState<number>();

	const connectMetaMask = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum)
				return;
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
			if (accounts.length > 0) {
				setAccount(accounts[0])
				setChainId(Number(ethereum.networkVersion))
			}
		} catch (e) {
			console.log(e)
		}
	}

	return {
		account,
		chainId,
		connectMetaMask,
	}
}

export default useMetaMask;
