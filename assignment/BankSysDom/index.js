document.addEventListener('DOMContentLoaded', () => {
    let login_info = document.querySelector('#login_inp');
    let password = document.querySelector('#password_inp');
    let logError = document.querySelector('#login').querySelector('.error');
    let pError=document.querySelector('#password').querySelector('.error');
   
    login_info.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            checkCredentials();
        }
    });
    password.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            checkCredentials();
        }
    });
    function checkCredentials() {
        if (login_info.value === 'admin' && password.value === '123') {
            localStorage.setItem('Username', login_info.value);
            localStorage.setItem('Password', password.value);
            document.querySelector('.main_container').classList.add('hide');
            document.querySelector('.container').classList.remove('hide');
        } else {
            if(login_info.value!=='admin'){
                logError.style.display='block';
            }
            else{
                logError.style.display='none';
            }
            if(password.value!=='123'){
                pError.style.display='block';
            }
            else{
                pError.style.display='none';
            }

        }
    }
    if (localStorage.getItem('Username') && localStorage.getItem('Password')) {
        document.querySelector('.main_container').classList.add('hide');
        document.querySelector('.container').classList.remove('hide');
    };









   
    let ShowBal = parseFloat(localStorage.getItem('ShowBal')) || 0.0000;
    var upi_trans = JSON.parse(localStorage.getItem('Upi_history')) || [];
    let Bal = document.querySelector('#bal_amt');
    Bal.innerText = `Rs. ${ShowBal.toFixed(4)}`;

    let dep_but = document.querySelector('#but1');
    dep_but.addEventListener('click', () => {
        let dep_input = document.querySelector('#depo');
        let dep_amt = parseFloat(dep_input.value);
        if (!isNaN(dep_amt)) {
            ShowBal += dep_amt;
            Bal.innerText = `Rs. ${ShowBal.toFixed(4)}`;
            dep_input.value = '';
            let transaction = `Rs.${dep_amt.toFixed(4)} is deposited in your UPI account.`;
            upi_trans.push(transaction);
            localStorage.setItem('Upi_history', JSON.stringify(upi_trans));
            localStorage.setItem('ShowBal',ShowBal.toFixed(4));
        } else {
            alert("Improper Number Format");
        }
    });

    let wit_but = document.querySelector('#but2');
    wit_but.addEventListener('click', () => {
        let with_input = document.querySelector('#with');
        let with_amt = parseFloat(with_input.value);
        if (!isNaN(with_amt) && ShowBal >= with_amt) {
            ShowBal -= with_amt;
            Bal.innerText = `Rs. ${ShowBal.toFixed(4)}`;
            with_input.value = '';
            let transaction = `Rs.${with_amt.toFixed(4)} is withdrawn from your UPI account.`;
            upi_trans.push(transaction);
            localStorage.setItem('Upi_history', JSON.stringify(upi_trans));
            localStorage.setItem('ShowBal', ShowBal.toFixed(4));
        } else {
            alert("Improper Number Format or Insufficient Balance");
        }
    });

    let upi_trans_but = document.querySelector('#trans_but1');
    upi_trans_but.addEventListener('click', () => {
        let u = document.querySelector('#upi_trans_history');
        u.innerHTML = upi_trans.map(trans => `<div class='data'>${trans}</div>`).join('');
    });




    let Limit=50000.0000;
    let curBal_amt=parseFloat(localStorage.getItem('CurrentBalance'))||50000.0000;
    let buy_money=0.0000;
    let cc_trans=JSON.parse(localStorage.getItem('CreditCard_history'))||[];
    let lim_amount = document.querySelector('#lim_amt');

    function cc_trans_display(){
        let c =document.querySelector('#cc_trans_history');
        c.innerHTML=cc_trans.map(trans2=>`<div class=data>${trans2}</div>`).join('');
    };

  

    lim_amount.innerText=`Rs.${Limit.toFixed(4)}`;
    let curBal_amount = document.querySelector('#curBal_amt');
    curBal_amount.innerText=`Rs.${curBal_amt.toFixed(4)}`;
    let buy_button = document.querySelector('#but3').addEventListener('click',()=>{
        let buy_input = document.querySelector('#buy');
        buy_money=parseFloat(buy_input.value);
        if(!isNaN(buy_money)){
            curBal_amt-=buy_money;
            cc_trans.push(`Rs.${buy_money} was brought.`);
            curBal_amount.innerText=`Rs.${curBal_amt.toFixed(4)}`;
            buy_input.value='';
            localStorage.setItem('CreditCard_history',JSON.stringify(cc_trans));
            localStorage.setItem('CurrentBalance',curBal_amt.toFixed(4));
        }
        else{
            alert("Improper Format");
            buy_input.value='';
        }
    });
    let pay_but = document.querySelector('#but4').addEventListener('click',()=>{
        let pay_amt=buy_money;
        if(pay_amt!==0){
            cc_trans.push(`Bill of Rs.${pay_amt} was paid.`);
            buy_money=0;
        }
        else{
            alert("Please buy amount first.")
        }
        localStorage.setItem('Paid Amount',JSON.stringify(cc_trans));
    });
    let cc_trans_but=document.querySelector('#trans_but2');
    cc_trans_but.addEventListener('click',()=>{
        cc_trans_display();
    });
    
    
});


























/*document.addEventListener('DOMContentLoaded', () => {
    let userName = document.querySelector('#username');
    let passWord = document.querySelector('#password');
    let enterButton = document.querySelector('#Enter_button');
    let loginPage = document.querySelector('.login');

    if (localStorage.getItem('Username') === 'admin' && localStorage.getItem('Password') === '123') {
        loginPage.style.display = 'none';
    }

    enterButton.addEventListener('click', () => {
        if (userName.value === 'admin' && passWord.value === '123') {
            localStorage.setItem('Username', userName.value);
            localStorage.setItem('Password', passWord.value);
            if (localStorage.getItem('Username') === 'admin' && localStorage.getItem('Password') === '123') {
                loginPage.style.display = 'none';
            }
        }
    });
}); */