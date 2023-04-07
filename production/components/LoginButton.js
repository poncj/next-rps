import { useState, useCallback, useEffect, useRef } from "react";
import Web3Modal from 'web3modal';
import * as ethers from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS, CHAIN_ID } from '@/constants/constants';

export default function LoginButton(props) {
    const Web3ModalRef = useRef();

    const [address, setAddress] = useState("");
    const [hidden, setHidden] = useState(false);
    
    // TODO: CHANGING ACCOUNT DOESN'T WORK;
    useEffect(() => {
        if (!props.children.walletConnected) {
            Web3ModalRef.current = new Web3Modal({
                network: 97,
                providerOptions: {},
                disableInjectedProvider: false
            });
        }
    }, [props.children.walletConnected]);

    const getProvider = async () => {
        try {
            const provider = await Web3ModalRef.current.connect();
            const web3Provider = new ethers.providers.Web3Provider(provider);
            const {chainId} = await web3Provider.getNetwork();
            if (chainId != CHAIN_ID) {
                window.alert("change network to chainId 97");
            }
            return web3Provider;
        } catch(err) {
            console.log(err);
            return false;
        }
    };

    const getContract = async (provider) => {
        try {
            const signer = await provider.getSigner();
            const contract = await new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            return contract;  
        } catch(err) {
            console.log(err);
            return false;
        }
    };

    const handleClick = useCallback(async () => {
        
        if (props.children.loadLock) {
            props.children.setLogMessage("Wait! Loading...");
            return;
        }
        
        setHidden(true);
        
        if (props.children.walletConnected) {
            props.children.setProvider(false);
            props.children.setContract(false);
            props.children.setWalletConnected(false);
            props.children.setShowMintButton(false);
            props.children.setContractBalance("0.0");
            props.children.setSignerBalance("0.0");
            props.children.setMinBet("");
            props.children.setLogMessage("Place a bet and choose an option!");
            props.children.setLogAmount("--");
            props.children.setHistory([]);
            setAddress("");
            setHidden(false);
            return false;
        }

        const provider = await getProvider();
        
        if (!provider) {
            setHidden(false);
            return false;
        }
        
        const contract = await getContract(provider);

        if (!contract) {
            setHidden(false);
            return false;
        }

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setAddress(address); 

        props.children.setProvider(provider);
        props.children.setContract(contract);

        const ContractBalance = ethers.utils.formatEther(await provider.getBalance(contract.address));
        const SignerBalance = ethers.utils.formatEther(await provider.getBalance(address));

        props.children.setContractBalance(ContractBalance);
        props.children.setSignerBalance(SignerBalance);
        
        const minBet = ethers.utils.formatEther(await contract.minBet());
        
        props.children.setMinBet(minBet);

        let filterFrom = contract.filters.GamePlayed(address);
        let historyData = await contract.queryFilter(filterFrom, -4950);

        if (historyData.length > 0) {
            let _historyArray = [];
            let count = 0;
            historyData.map((item)=>{
                let _history = {
                    id: count,
                    status: item.args[1],
                    bet: ethers.utils.formatEther(item.args[3]),
                    prize: ethers.utils.formatEther(item.args[4]),
                }
                _historyArray.unshift(_history);
                count++;
            });
            props.children.setHistory(_historyArray);
        }

        props.children.setWalletConnected(true);
        props.children.setShowMintButton(true);

        setHidden(false);
    });

    function renderSpinner() {
        // return (<div className="spinner-border text-primary" role="status"></div>)
        return (
            <>
                <button className="btn btn-primary" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span className="sr-only">Loading...</span>
                </button>
            </>
        )
    }

    return (
        <>
            {hidden ? renderSpinner() : <button title={address} style={{witdh: 70}} className='btn btn-primary' onClick={handleClick}>{props.children.showMintButton ? "Sign Out":  "Sign In"}</button>}
        </>
    )
}
