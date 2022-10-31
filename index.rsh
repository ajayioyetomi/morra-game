'reach 0.1';
'use strict';

const [isOutcome,ADE_WINS,DRAW,ERO_WINS] = makeEnum(3);
const [isHand,ZERO,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,TEN] = makeEnum(11);

const winner = (adeHand,adeNum,eroHand,eroNum) => adeHand+eroHand == adeNum && adeHand+eroHand != eroNum ?0:adeHand+eroHand == eroNum && adeHand+eroHand != adeNum?2:1;


assert(winner(ONE,TWO,ONE,FIVE) == ADE_WINS);
assert(winner(ONE,FIVE,TWO,THREE) == ERO_WINS);
assert(winner(TWO,FIVE,THREE,ONE) == ADE_WINS);
assert(winner(FIVE,FIVE,ZERO,THREE) == ADE_WINS);

forall(UInt, adeHand =>
    forall(UInt,adeNum =>
        forall(UInt,eroHand =>
            forall(UInt,eroNum =>
                assert(isOutcome(winner(adeHand,adeNum,eroHand,eroNum)))))));

forall(UInt,hand =>
    assert(winner(hand,hand,hand,hand) == DRAW));

forall(UInt,hand =>
    forall(UInt, num => 
        assert(winner(hand,num,hand,num) == DRAW)));
        

const Player = {
    ...hasRandom,
    getHand: Fun([],UInt),
    getNum: Fun([],UInt),
    seeOutcome: Fun([UInt],Null),
    informTimeout:Fun([],Null),
}

export const main = Reach.App(()=>{
    const Ade = Participant('Ade',{
        ...Player,
        wager: UInt,
        deadline:UInt,
    });
    const Ero = Participant('Ero',{
        ...Player,
        acceptWager: Fun([UInt],Null),
    });
    init();

    Ade.only(()=>{
        const wager = declassify(interact.wager);
        const deadline = declassify(interact.deadline);
  
    });

    Ade.publish(wager,deadline).pay(wager);
    commit();

    const informTimeout = ()=>{
        each([Ade,Ero],()=> interact.informTimeout());
    }

    Ero.only(()=>{
        interact.acceptWager(wager);
    });

    Ero.pay(wager).timeout(relativeTime(deadline),()=> closeTo(Ade,informTimeout));

    var outcome = DRAW;
    invariant(balance() == 2 * wager && isOutcome(outcome));

    while(outcome == DRAW){
        commit();  
        Ade.only(()=>{
            const _adeHand = interact.getHand();
            const [_commitAdeHand,_saltAdeHand] = makeCommitment(interact,_adeHand);
            const commitAdeHand = declassify(_commitAdeHand);
            const _adeNum = interact.getNum();
            const [_commitAdeNum,_saltAdeNum] = makeCommitment(interact,_adeNum);
            const commitAdeNum = declassify(_commitAdeNum);
        })
        Ade.publish(commitAdeHand,commitAdeNum)
        .timeout(relativeTime(deadline),()=> closeTo(Ero,informTimeout));
        commit();

        unknowable(Ero,Ade(_adeHand,_adeNum,_saltAdeHand,_saltAdeNum));
        Ero.only(()=>{
            const eroHand = declassify(interact.getHand());
            const eroNum = declassify(interact.getNum());
        });
        Ero.publish(eroHand,eroNum)
        .timeout(relativeTime(deadline),()=> closeTo(Ade,informTimeout))
        commit();

        Ade.only(()=>{
            const adeHand = declassify(_adeHand);
            const saltAdeHand = declassify(_saltAdeHand);
            const adeNum = declassify(_adeNum);
            const saltAdeNum = declassify(_saltAdeNum);
        });
        Ade.publish(adeHand,saltAdeHand,adeNum,saltAdeNum);
    
        checkCommitment(commitAdeHand,saltAdeHand,adeHand);
        checkCommitment(commitAdeNum,saltAdeNum,adeNum);
    
        outcome = winner(adeHand,adeNum,eroHand,eroNum);
        continue;

    }

    const [forAde,forEro] = outcome == ADE_WINS?[2,0]:[0,2];
    assert(isOutcome(outcome) && outcome != DRAW);

    transfer(forAde * wager).to(Ade);
    transfer(forEro * wager).to(Ero);
    commit()

    each([Ade,Ero],()=>
        interact.seeOutcome(outcome)
    )

    // exit();


})