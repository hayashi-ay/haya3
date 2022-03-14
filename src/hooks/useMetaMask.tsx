import { useEffect, useState } from "react";

const useMetaMask = () => {
	const [account, setAccount] = useState<string>();
	const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>();

	useEffect(() => {
		const { ethereum } = window;
		if (ethereum) {
			setIsMetaMaskInstalled(true);
		} else {
			setIsMetaMaskInstalled(false);
		}
	}, []);

	const connectMetaMask = async () => {
		try {
			if (!isMetaMaskInstalled) {
				alert("Get Metamask");
				return;
			}
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
			setAccount(accounts[0])
		} catch (e) {
			console.log(e)
		}
	}

	return {
		account,
		isMetaMaskInstalled,
		connectMetaMask,
	}
}

export default useMetaMask;
