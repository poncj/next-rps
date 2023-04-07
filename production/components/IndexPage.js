import LoginButton from '@/components/LoginButton';

import { useState, useCallback, useEffect, useRef } from "react";
import Web3Modal from 'web3modal';
import * as ethers from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS, CHAIN_ID } from '@/constants/constants';
import ContractBalanceComponent from '@/components/ContractBalanceComponent';
import SignerBalanceComponent from '@/components/SignerBalanceComponent';
import MinBetComponent from '@/components/MinBetComponent';
import GameLog from '@/components/GameLog';
import GameChoises from '@/components/GameChoises';
import InputBet from '@/components/InputBet';
import GameHistory from '@/components/GameHistory';
import Danger from '@/components/Danger';
            
export default function IndexPage() {

    const [logMessage, setLogMessage] = useState("Place a bet and choose an option!");
    const [logAmount, setLogAmount] = useState("--");
    
    const [showMintButton, setShowMintButton] = useState(false);
    const [walletConnected, setWalletConnected] = useState(false);
    const [contract, setContract] = useState(false);
    const [provider, setProvider] = useState(false);

    const [ContractBalance, setContractBalance] = useState("0.0");
    const [SignerBalance, setSignerBalance] = useState("0.0");

    const [minBet, setMinBet] = useState(false);
    const [Bet, setBet] = useState(0);

    const [loadLock, setLoadLock] = useState(false);
    
    const [lastHistoryBlock, setLastHistoryBlock] = useState(0);
    
    const [history, setHistory] = useState([]);



    return (
        <>
        <div className="container cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">      
            <div className="row g-0 mb-3">
                <div className="col-12 shadow">
                    <div className="text-center fs-4 p-3 rounded header-div">
                        <h1>Welcome! Let's play rock, paper, scissors! </h1>
                        {/* <p className="mb-0">
                            Rock, paper, scissors is a fun and easy hand game that anyone can play and enjoy.
                        </p> */}
                        <small><i>Next.js</i></small>
                    </div>
                </div>
            </div>

            <div className="row g-0 justify-content-between">
                <div className="col-12 col-md-8 theme-fourth-bg-color rounded shadow">
                    <div className="container p-0">
                        <div className="row g-0" >
                            <div className="col-12">
                                <div className="row g-0">
                                    <div className="col-12 col-md-7">
                                        <div className="input_block px-4 py-3">
                                            <div className="mb-3">
                                                <LoginButton>
                                                {
                                                    {
                                                        walletConnected:walletConnected,
                                                        setWalletConnected:setWalletConnected,
                                                        showMintButton:showMintButton,
                                                        setShowMintButton:setShowMintButton,
                                                        contract:contract,
                                                        setContract:setContract,
                                                        provider:provider,
                                                        setProvider:setProvider,
                                                        logMessage:logMessage,
                                                        setLogMessage:setLogMessage,
                                                        logAmount:logAmount,
                                                        setLogAmount:setLogAmount,
                                                        ContractBalance:ContractBalance,
                                                        setContractBalance:setContractBalance,
                                                        SignerBalance:SignerBalance,
                                                        setSignerBalance:setSignerBalance,
                                                        minBet,
                                                        setMinBet,
                                                        loadLock,
                                                        setLoadLock,
                                                        setHistory:setHistory,
                                                    }
                                                }
                                                </LoginButton>
                                            </div>

                                            <div className="mb-3">
                                                <ContractBalanceComponent balance={ContractBalance} />
                                            </div>
                                                
                                            <div className="mb-3">
                                                <SignerBalanceComponent balance={SignerBalance} />
                                            </div>

                                            <div className="mb-3 ">
                                                <InputBet>
                                                    {
                                                        {
                                                            loadLock:loadLock,
                                                            Bet:Bet,
                                                            setBet:setBet,
                                                        }
                                                    }
                                                </InputBet>
                                                <MinBetComponent minBet={minBet} />
                                            </div>
                                            
                                        </div>  
                                    </div>
                                    <div className="col-12 col-md-5">
                                        <div className="status_log ps-3 ps-md-1 pt-4 pe-3 rounded">
                                            <GameLog>
                                                {
                                                    {
                                                        logMessage:logMessage,
                                                        setLogMessage:setLogMessage,
                                                        logAmount:logAmount,
                                                        setLogAmount:setLogAmount,
                                                    }
                                                }
                                            </GameLog>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mb-3"/>
                            <div className="col-12">
                                <GameChoises>          
                                    {
                                        {
                                            walletConnected:walletConnected,
                                            setWalletConnected:setWalletConnected,
                                            showMintButton:showMintButton,
                                            setShowMintButton:setShowMintButton,
                                            contract:contract,
                                            setContract:setContract,
                                            provider:provider,
                                            setProvider:setProvider,
                                            logMessage:logMessage,
                                            setLogMessage:setLogMessage,
                                            ContractBalance:ContractBalance,
                                            setContractBalance:setContractBalance,
                                            SignerBalance:SignerBalance,
                                            setSignerBalance:setSignerBalance,
                                            minBet,
                                            setMinBet,
                                            Bet:Bet,
                                            loadLock:loadLock,
                                            setLoadLock:setLoadLock,
                                            lastHistoryBlock:lastHistoryBlock,
                                            setLastHistoryBlock:setLastHistoryBlock,
                                            history:history,
                                            setHistory:setHistory,
                                        }
                                    }
                                </GameChoises>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md mt-3 mt-md-0 ms-md-3 theme-fourth-bg-color rounded shadow">
                    <div className="history_block rounded m-3">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Status</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody id="history_block_tbody">
                                <GameHistory>
                                    {
                                        {
                                            lastHistoryBlock:lastHistoryBlock,
                                            setLastHistoryBlock:setLastHistoryBlock,
                                            history:history,
                                        }
                                    }
                                </GameHistory>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
