import React, { useEffect, useState } from "react";
import twitchAbi from "../utils/HigherContract.json";
import '../App.css';
import PanneauRecompenses from "./components/PanneauRecompenses";
import AjouterStreamer from "./components/streamer/AjouterStreamer";

export default function Main() {
    const [ accountConnected, setAccountConnected ] = useState([]);

    const twitchAddress = "0xfa916839A18811ED40f884168ad8ca2CcF3Ba40B";
    const twitchContract = twitchAbi.abi;
    let ethereumService = null;

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        isClientMetaMaskInstalled();
        try {
            const accounts = await isConnectedToMetaMask();
            setAccountConnected(accounts);
        } catch (error) {
            const accounts = await connectedToMetaMaskClient();
            setAccountConnected(accounts);
        }
    }

    const connectedToMetaMaskClient = async () => {
        return await ethereumService.request({ method: "eth_requestAccounts" });
    }

    const isClientMetaMaskInstalled = () => {
        ethereumService  = window.ethereum;
        if(ethereumService) {
            return true;
        }
        throw new Error("Please, download MetaMask.");
    }

    const isConnectedToMetaMask = async () => {
        const accountsConnected = await ethereumService.request({ method: "eth_accounts"});
         console.log("acounts ", accountsConnected)
        if (accountsConnected.length > 0) {
            return accountsConnected;
        } else {
            throw new Error("No MetaMask accounts connected");
        }
    }

    const renderConnectedTemplate = () => {
        if(accountConnected.length > 0) {
            return (
                <div className="bio">
                    <AjouterStreamer></AjouterStreamer>
                    <PanneauRecompenses></PanneauRecompenses>
                </div>
            )
        }
    }
   return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">
                👋 Higher Corporation
                </div>
                {renderConnectedTemplate()}
            </div>
        </div>
    );
}