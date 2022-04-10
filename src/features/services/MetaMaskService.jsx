import React from "react"

export default function MetaMaskService() {

    
    const isClientMetaMaskInstalled = (window)  => {
        const ethereumService  = window.ethereum;
        if(ethereumService) {
            return ethereumService;
        }
        throw new Error("Please, download MetaMask.");
    }
    
    async function isConnectedToMetaMask(ethereumService) {
        const accountsConnected = await ethereumService.request({ method: "eth_accounts"});
        console.log("acounts ", accountsConnected)
        if (accountsConnected.length > 0) {
            return accountsConnected;
        } else {
            throw new Error("No MetaMask accounts connected");
        }
    }
    
    async function connectedToMetaMaskClient(ethereumService) {
        return await ethereumService.request({ method: "eth_requestAccounts" });
    }

}