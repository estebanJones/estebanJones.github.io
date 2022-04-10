import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import higherAbi from "./utils/HigherContract.json";
import messengerAbi from "./utils/MessengerContract.json"
import './App.css';

export default function App() {
  const [messagesRecus, setMessagesRecues] = useState([])
  const higherContractAddress = "0x1C39165359852C53c9e304c65e50CCf78271c71c";
  const higherContractABI = higherAbi.abi;
  let higherContract;
  
  const messengerContractAddress = "0x4EE8458748051a1922B962A3F2fF61AFa32cc019";
  const messengerContractAbi = messengerAbi.abi;
  let messengerContract;

  let id = 0;
  const init = async () => {
    const { ethereum } = window;
    if(ethereum) {
      console.log("Blockchain existante ", ethereum);
      comptesAutorises();
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      higherContract = new ethers.Contract(higherContractAddress, higherContractABI, signer);
      messengerContract = new ethers.Contract(messengerContractAddress, messengerContractAbi, signer);
    } else {
      console.log("Aucun wallet.");
    }
  }
  
  const connectWallet = async () => {
    const { ethereum } = window;
    if(!ethereum) {
      alert("Télécharger Metamask");
      return;
    }
    
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("Comptes Utilisateur connecté ", accounts);
  }

  const comptesAutorises = async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if(accounts.length !== 0) {
      return accounts;
    } else {
      throw new Error("Aucun compte autorisés.")
    }
  }
  
  const getTotalMembers = async () => {
    let count = await higherContract.getTotalMembers();
    console.log("Nombre de membres ", count.toNumber());
  }

  const ajouterMembre = async () => {
    const ajoutEnCours = await higherContract.members();
    console.log("Mining -- Ajout en cours -- Mining");
    ajoutEnCours.wait();
    console.log("Mined -- Ajout terminé -- Mined");
  }

  const envoyerMessage = async () => {
    const envoieMessage = await messengerContract.envoyerMessage(id + " - Salut de la blockchain !!");
    console.log("Mining -- Envoie du message en cours. -- Mining");
    envoieMessage.wait();
    console.log("Mined -- Envoie du message en cours. -- Mined");
    id++;
  }

  const listeMessages = async () => {
    const listeMessagesAfffiche = [];
    const liste = await messengerContract.getListeMessages();
    
    liste.forEach(message => {
      listeMessagesAfffiche.push({
        emetteur: message.emetteur,
        message: message.message,
        timestamp: new Date(message.timestamp * 1000)
      });
    });
    setMessagesRecues(listeMessagesAfffiche);
    console.log("listeMessages ", listeMessages);
  }

  useEffect(() => {
    init();
  }, [])
  
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Higher Corporation
        </div>

        <div className="bio">
        Mise en place de SmartContract pour la Higher Corporation
        </div>

        <button className="waveButton" onClick={connectWallet}>
          Connection wallet
        </button>
        <button className="waveButton" onClick={getTotalMembers}>
          Combien de membres Higher ?
        </button>
        <button className="waveButton" onClick={ajouterMembre}>
          Ajouter un membre chez Higher
        </button>
        <button className="waveButton" onClick={envoyerMessage}>
          Envoyer un message
        </button>
        <button className="waveButton" onClick={listeMessages}>
          Afficher les messages
        </button>

        {
          messagesRecus.map((message, index) => {
            return (
               <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
                <div>Address: {message.emetteur}</div>
                <div>Time: {message.timestamp.toString()}</div>
                <div>Message: {message.message}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
