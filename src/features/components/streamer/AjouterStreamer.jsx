import { ethers } from 'ethers';
import { useEffect } from 'react';
import twitchAbi from '../../../utils/TwitchDailyEarn.json'

export default function AjouterStreamer() {
    const twitchAddress = "0xfa916839A18811ED40f884168ad8ca2CcF3Ba40B";
    const twitchContractAbi = twitchAbi.abi;
    let twitchContract;

    useEffect( () => {
        init();
    }, []);

    const init = async () => {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        twitchContract = new ethers.Contract(twitchAddress, twitchContractAbi, signer);
    }

    const ajouterStreamer = async () => {
       const addingNewTwitcher = await twitchContract.addTwitcher("baba_key");
       console.log("Mining -- ajouterStreamer. -- Mining");
       addingNewTwitcher.wait();
       console.log("Mined -- ajouterStreamer. -- Mined");
    }

    const getStreamer = async () => {
        const streamer = await twitchContract.getStreamerByKey("baba_key");
        console.log("streamer ", streamer);
     }

    return  (
        <div>
            <button className="waveButton" onClick={ajouterStreamer}>Ajouter un streamer</button><br></br>
            <button className="waveButton" onClick={getStreamer}>Infos streamer par clé</button>
        </div>

        
    )
}

