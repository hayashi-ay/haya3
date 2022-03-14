import { useEffect, useState } from "react";

const useMetaMask = () => {
	const [account, setAccount] = useState<string>();

	const connectMetaMask = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum)
				return;
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
			setAccount(accounts[0])
		} catch (e) {
			console.log(e)
		}
	}

	return {
		account,
		connectMetaMask,
	}
}

export default useMetaMask;
