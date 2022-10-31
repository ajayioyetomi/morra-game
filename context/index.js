import {useState,createContext,useEffect} from 'react';
import {
    loadStdlib,
    ALGO_MyAlgoConnect as MyAlgoConnect,
} from '@reach-sh/stdlib';
import * as backend from '../build/index.main.mjs';

const reach = loadStdlib('ALGO');

reach.setWalletFallback(
    reach.walletFallback({
        providerEnv:"TestNet",
        MyAlgoConnect,
    })
);

const intToOutcome = ['Deployer WINS','DRAW','Attacher WINS'];
const {stardardUnit} = reach;

const deadline = {ETH:10,ALGO:100,CFX:1000}[reach.connector];

export const AppContext = createContext();

const AppContextProvider = ({children}) =>{
    const [defaults,setDefaults] = useState({
        defaultFundAmt: 10,
        defaultWager:1,
        stardardUnit,
    });

    const [mode,setMode] = useState(null);

    const [views,setViews] = useState({view:"Welcome"});

    const [user,setUser] = useState({
        account:'',
        balance:'',
    });

    const [wager,setWager] = useState(defaults.defaultWager);
    const [outcome,setOutcome] = useState('');
    const [contract,setContract] = useState(null);
    const [playable,setPlayable] = useState(false);
    const [title,setTitle] = useState('Morra Game!');
    const [message,setMessage] = useState(`Welcome to the Morra game!. This is a game of Numbers, You put out numbers of Finger from 0 to 5 and guess the total numbers of finger amoung all the players. ${<br/>}
    This application restrict the numbers of players to TWO (2). My the best Player Wins;
    `)

    const [resolveHandP,setResolveHandP] = useState(null);
    const [resolveGuessNum,setResolveGuessNum] = useState(null);
    const [resolveAcceptW,setResolveAcceptW] = useState(null);
    const [hand,setHand] = useState(4);
    const [guessNum,setGuessNum] = useState(10);

    const connecAccount = async ()=> {
        const account = await reach.getDefaultAccount();
        const bal = await reach.balanceOf(account);
        const balance = reach.formatCurrency(bal,4);
        console.log('account',account,'balance',balance);
        setUser({account,balance});
        if(await reach.canFundFromFaucet()){
            setViews({view:"FundAccount"});
        }else{
            setViews({view:"DeployerOrAttacher"})
        }
    };

    const fundAccount = async (fundAmount) =>{
        const amt = reach.parseCurrency(fundAmount);
        await reach.fundFromFaucet(user.account,amt);
        setViews({view:"DeployerOrAttacher"});
    };

    const skipFundAccount = async ()=>{
        
        setViews({view:"DeployerOrAttacher"});
    }

    const selectAttacher = ()=>{
        setMode({name:"Attacher WINS"})
        setViews({view:"Attach",wrapper:"AttacherWrapper"});
    }

    const selectDeployer = ()=>{
        setMode({name:"Deployer WINS"})
        setViews({view:"Deploy",wrapper:"DeployerWrapper"})
    }

    const getHand = async () =>{
        const hand = await new Promise((resolveHandP)=>{
            setResolveHandP({resolveHandP});
            setPlayable(true);
            setViews({view:"GetHand"});
        });
        setHand(hand);
        setViews({view:"WaitGetNum"});
        setPlayable(false);
        return hand;
    }

    const getNum = async ()=>{
        const num = await new Promise((resolveGuessNum)=>{
            setResolveGuessNum({resolveGuessNum});
            setPlayable(true);
            setViews({view:"GetNum"});
        })
        setGuessNum(num);
        setViews({view:"WaitingForResults"});
        return num;
    }

    const seeOutcome = (i) =>{
        const winner = parseInt(i);
        setOutcome(intToOutcome[winner])
        setViews({view:"Done"});
    }

    const informTimeout = ()=>{
        setViews({view:"Timeout"});
    }

    const playHand = (hand) =>{
        resolveHandP.resolveHandP(hand);
    };

    const playNum = (guessNum) =>{
        resolveGuessNum.resolveGuessNum(guessNum);
    }

    const handleWager = ()=>{
        setWager(wager);
        setViews({view:"Deploy",wrapper:"DeployerWrapper"});
    }

    const playerInteract = {
        ...reach.hasRandom,
        getHand,
        getNum,
        seeOutcome,
        informTimeout,
    }

    const DeployerInteract = {
        ...playerInteract,
        wager: reach.parseCurrency(wager),
        deadline,
    }

    const deploy = async ()=>{
        const ctc = user.account.contract(backend);
        setViews({view:"Deploying"});
        ctc.p.Ade(DeployerInteract);
        const ctcInfoStr = JSON.stringify(await ctc.getInfo(),null,2);
        setContract({ctcInfoStr});
        setViews({view:"WaitingForAttacher",wrapper:"DeployerWrapper"});
    }

    const acceptWager = async(amt) =>{
        const wager = reach.formatCurrency(amt,4);
        return await new Promise((resolveAcceptW) => {
            setResolveAcceptW({resolveAcceptW});
            setWager(wager);
            setViews({view:"AcceptTerms",wrapper:"AttacherWrapper"});
        });
    };

    const AttacherInteract = {
        ...playerInteract,
        acceptWager,
    }


    const attach = async(ctcInfoStr) =>{
        try{
            const ctc = user.account.contract(backend,JSON.parse(ctcInfoStr));
            setViews({view:"Attaching",wrapper:"AttacherWrapper"});
            ctc.p.Ero(AttacherInteract)

        }catch(err){
            console.log(err)
        }
    }

    const termsAccepted = () =>{
        resolveAcceptW.resolveAcceptW();
        setViews({view:"WaitingForTurn"});
    }

    const AppContextValues = {
        ...defaults,
        contract,
        playHand,
        playNum,
        mode,
        setMode,

        user,
        setViews,
        views,
        title,
        setTitle,
        message,
        setMessage,
        wager,
        connecAccount,
        fundAccount,
        skipFundAccount,

        selectDeployer,
        selectAttacher,
        hand,
        guessNum, 
        resolveHandP,
        resolveGuessNum,
        playable,
        outcome,

        handleWager,
        setWager,
        deploy,

        attach,
        acceptWager,
        termsAccepted,
    
    }

    useEffect(()=>{
        setDefaults({
            defaultFundAmt: '5',
            defaultWager:'1',
            stardardUnit,
        });
        setViews({
            view:"Welcome",
        });
        setTitle('WELCOME TO MORRA GAME');
        setMessage(<>
            This is a game of Numbers. You put out a number of Fingers from 0 to 5, and guess the total numbers of fingers among's all the players participating.<br/> This application restrict the numbers of players to TWO (2). May the best Player Wins
        </>
        
    )
    },[])

    return(
        <AppContext.Provider value={AppContextValues}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;