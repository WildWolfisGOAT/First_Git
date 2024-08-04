let Balance=0;
let trans_upi=[];
function balanceMoney(){
    alert(`Your Balance Amount is Rs.${Balance}`);
}
function depositMoney(){
    let mon= parseInt(prompt("Enter amount  to Deposit"));
    if(mon!==null){
        if(isNaN(mon)){
            alert("The Amount is not Numeric");
        }
        else{
            Balance+=mon;
            alert(`Rs.${mon} is deposited in your account`);
            trans_upi.push(`Rs.${mon} was deposited`);
        }
    }
}
function withdrawMoney(){
    let withdrawal = parseInt(prompt("Enter Amount to Withdraw"));
    if(withdrawal!==null){
        if(withdrawal>Balance){
            alert("You dont have enough money in your account.");
        }
        else{
            Balance-=withdrawal;
            alert(`Rs.${withdrawal} is withdrawn from your account`);
            trans_upi.push(`Rs.${withdrawal} was withdrawn.`)
        }
    }
}

function Upitransactions(){
    console.clear();
    for(let i in trans_upi){
        console.log(trans_upi[i]);
    }
}

let Upi={
    upi_balance: balanceMoney,
    upi_deposit: depositMoney,
    upi_withdraw: withdrawMoney,
    upi_transaction : Upitransactions
};








const Limit=50000;
let curBal=0;
let amount;
let trans_cc=[];
function check_Limit(){
    alert(`Your Credit Card Limit is Rs.${Limit}`);
}

function buy_amt(){
     amount=parseInt(prompt("Enter amount to buy"));
    if(amount!==null && !isNaN(amount)){
        if(amount>Limit){
            alert("The amount you are trying to buy is out of Limit");
        }
        else{
            curBal=Limit-amount;
            alert(`Rs.${amount} is bought`);
            trans_cc.push(`Rs.${amount} is bought from your account`);
        }
    }
}

function bill_amt(){
    // let billingAmt = parseInt(prompt("Enter amount to pay"));
    // if(billingAmt!==null && !isNaN(billingAmt)){
    //     if(billingAmt>curBal){
    //         alert(`The Amount is higher than your current balance`);
    //     }
    //     else{
    //         curBal-=billingAmt;
    //         alert(`Bill of Rs.${billingAmt} is paid`);
    //         trans_cc.push(`Bill of Rs.${billingAmt} is paid`);
    //     }
    // }
    alert(`Bill of Rs.${amount} is paid`);
    trans_cc.push(`Bill of Rs.${amount} is paid.`);
}

function curr_bal(){
    alert(`Your Current Balance is Rs.${curBal}`);
}

function check_transactions(){
    console.clear();
    trans_cc.forEach((trans)=>console.log(trans));  
}

let CreditCard={
    cc_limit : check_Limit,
    cc_buy : buy_amt,
    cc_paybill : bill_amt,
    cc_bal : curr_bal,
    cc_transactions : check_transactions
};
