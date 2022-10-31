import {loadStdlib,ask} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100);

const isAde = await ask.ask(
    `Are you Ade: y or n`,
    ask.yesno
);

const who = isAde?'Ade':'Ero';

console.log(`Starting Morra game as ${who}`);

//connect or create an account

let acc = null;
const creatAcc = await ask.ask(
    `Would you like to create an Account (Only possible on Devnet) : y or n`,
    ask.yesno
);

if(creatAcc){
    acc = await stdlib.newTestAccount(startingBalance);
}else{
    const secret = await ask.ask(
        `What is your account secret (Paste you account create here)`,
        (x => x)
    );
    acc = await newAccountFromSecret(secret);
}

//deploy or attact to contract

let ctc = null;
if(isAde){
    ctc = acc.contract(backend);
    ctc.getInfo().then(info => 
        console.log(`The contract is deployed as ${JSON.stringify(info)}`)
    )
}else{
    const info = await ask.ask(
        `Please paste conttact deploy information`,
        JSON.parse
    )
    ctc = acc.contract(backend,info)
}

const fmt = (x) => stdlib.formatCurrency(x,4);
const getBalance = async() => fmt(await stdlib.balanceOf(acc));

const before = await getBalance();

console.log(`Starting balance is ${before}`);

const interact = {...stdlib.hasRandom};

interact.informtimeout = ()=>{
    console.log(`There was a timeout`);
    Process.exit(1);
}

if(isAde){
    const amount = await ask.ask(
        `How much are do you want to wager`,
        stdlib.parseCurrency
    );
    interact.wager = amount;
    interact.deadline = {ETH:100,ALGO:100,CFX:1000}[stdlib.connector];
}else{
    interact.acceptWager = async(amt)=>{
        const accepted = await ask.ask(
            `Do you accept to wager ${fmt(amt)}`,
            ask.yesno
        );
        if(!accepted) process.exit(0);
    }

}

interact.getHand = async ()=>{
    const hand = await ask.ask(
        'How many fingers are you putting out between 0 and 5',
        (x)=>{
            if(Number(x) < 0 || Number(x) > 5){
                throw Error ('Not a valid hand');
            }
            return x
        }
    );
    console.log(`You put ${hand} finger(s)`);
    return Number(hand);
};

interact.getNum = async ()=>{
    const num = await ask.ask(
        'Guess the other players Hand between 0 and 5',
        (x)=>{
            if(Number(x) < 0 || Number(x) > 5){
                throw Error ('Not a valid guess');
            }
            return x
        }
    )
    console.log(`You guessed the other Player Players ${num}`);
    return Number(num);
}

const OUTCOME = ['ADE WINS','DRAW','ERO WINS']

interact.seeOutcome = (outcome) =>{
    console.log(`I see the outcome: ${OUTCOME[outcome]}`)
}

const part = isAde ? ctc.p.Ade: ctc.p.Ero;
await part(interact);

const after = await getBalance();

console.log(`Balance after game is ${after}`);

ask.done();
