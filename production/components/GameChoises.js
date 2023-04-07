import { BASE_GAS_LIMIT } from '@/constants/constants';
import * as ethers from 'ethers';

export default function GameChoises(props) {

    const handleChoiceRock = async () => {
        playGame(0);
    }

    const handleChoicePaper = async () => {
        playGame(1);
    }
    
    const handleChoiceScissors = async () => {
        playGame(2);
    }
    

    async function playGame(id) {
        
        
        if (!props.children.walletConnected) {
            props.children.setLogMessage("Sign In first");
            return;
        }
        if (props.children.loadLock) {
            props.children.setLogMessage("Wait! Loading...");
            return;
        }

        let Bet = parseFloat(props.children.Bet);
        let minBet = parseFloat(props.children.minBet);
        let ContractBalance = parseFloat(props.children.ContractBalance);
        let SignerBalance = parseFloat(props.children.SignerBalance);

        if (
            Bet < minBet || 
            Bet > ContractBalance ||
            Bet > SignerBalance || 
            isNaN(Bet)
        ) { 
            props.children.setLogMessage("Error! Wrong input value");
            return;
        }

        props.children.setLoadLock(true);
        props.children.setLogMessage("Loading...");
        
        try {
            
            const options = {
                value: ethers.utils.parseUnits(Bet.toString()),
                gasLimit: BASE_GAS_LIMIT,
            }

            let response = "";
            switch(id) {
                case 0:
                    response = await props.children.contract.Rock(options);
                    break;
                case 1:
                    response = await props.children.contract.Paper(options);
                    break;
                case 2:
                    response = await props.children.contract.Scissors(options);
                    break;
            }
            
            let result = await response.wait();
            let [GamePlayed] = result.events;

            props.children.setLogMessage(GamePlayed.args[2]);
            
            const ContractBalance = ethers.utils.formatEther(await props.children.provider.getBalance(props.children.contract.address));
            const signer = await props.children.provider.getSigner();
            const SignerBalance = ethers.utils.formatEther(await props.children.provider.getBalance(await signer.getAddress()));

            props.children.setContractBalance(ContractBalance);
            props.children.setSignerBalance(SignerBalance);

            const historyData = {
                id: props.children.history.length,
                status: GamePlayed.args[1],
                bet: ethers.utils.formatEther(GamePlayed.args[3]),
                prize: ethers.utils.formatEther(GamePlayed.args[4]),
            }

            let _history = props.children.history;
            _history.unshift(historyData);

            props.children.setHistory(_history);
        
        } catch(err) {
            props.children.setLogMessage("Error! See console for details");
            console.log(err);
        }

        props.children.setLoadLock(false);
    }

    return (
        <>
            <h4 className="text-center mb-3">Click on your choise!</h4>
            <div className="option_block pt-1 pb-3">
                <img onClick={handleChoiceRock} id="rock" className="choice rounded" src="/img/rock.png" alt=""/>
                <img onClick={handleChoicePaper} id="paper" className="choice rounded" src="/img/paper.png" alt=""/>
                <img onClick={handleChoiceScissors} id="scissors" className="choice rounded" src="/img/scissors.png" alt=""/>
            </div> 
        </>
    )
  }
  