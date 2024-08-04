alert(`Hello Welcome to Jai\'s Mini Bank`);
let sui = confirm('DO u want to add?');
let FinalBalance = 0;

function depositFunc()
{
    let depositMoney = parseInt(prompt('Kitna Paisa Deposit Krna bolo Seth'));
    FinalBalance+=depositMoney;
    alert(`Rs.${depositMoney} is deposited to your account\n Tere account me Rs.${FinalBalance} bacha hai`);
}

function withdrawFunc()
{
    let withdrawal = parseInt(prompt('Paisa Nikalre OHO, Kitna Nikalna?'));
    if(withdrawal<FinalBalance){
        FinalBalance-=withdrawal;
        alert(`Tere Account mese Rs.${withdrawal} nikala\n  Rs.${FinalBalance} bacha hai`)
    }
    else{
        alert('Account me utna paisa nahi jitna tu nikalra Shaane');
    }
    
}

function mainrun(opt)
{

    switch(opt)
    {
                case '1' : 
                alert(`Your final Balance is Rs.${FinalBalance}`);
                break;
                case '2' :
                depositFunc();
                break;
                case '3' : 
                withdrawFunc();
                break;
                // default : 
                // alert('Invalid Opt')
        }
}


if (sui) 
{
    let opt;
    do 
    {
        opt = prompt('What do you want to do? \n 1) Show Balance \n 2) Deposit Amount \n 3) Withdraw Amount \n 4) Stop');
        mainrun(opt);
    } while (opt !== '4');
    alert('Thank You Bank se Sampark krne ke liye');
} 
else 
{
    alert('Thank You Bank se Sampark krne ke liye');
}
