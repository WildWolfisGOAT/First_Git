let no1 = parseInt(prompt('Enter the first number'));
let no2 = parseInt(prompt('Enter the second number'));
let opr = prompt('Choose the operation(+,-,/,*): ');
let confrm = confirm(`Are you sure the op is ${no1} ${opr} ${no2}?`);
if(confrm){
    switch(opr){
        case '+' :
        alert(no1+no2);
        break;
        case '-' :
        alert(no1-no2);
        break;
        case '/' :
        alert(no1/no2);
        break;
        case '*' :
        alert(no1*no2);  
        break;
        default : 
        alert('You didnt choose the right operation');
    }
}
else{
        alert('Mission abort');
}

