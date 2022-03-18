import { ethers } from "ethers";

const useContract = (address: string, abi: any) => {
	if (typeof window === "undefined")
		return null
	if (typeof window.ethereum === "undefined")
		return null
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(address, abi, signer);
	return contract;
}

export default useContract;
