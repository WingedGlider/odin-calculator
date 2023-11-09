let vals = ["", "", "", false, false]; 
document.querySelectorAll('.buttons button').forEach(button =>{
    if (button.classList.contains('oper')) button.disabled = true;
    button.addEventListener('click', ()=>{
        if (button.textContent == " = ") vals[3] = true;
        if (button.textContent == ".") button.disabled = true;
        calculator(button.textContent);
    });
})

function calculator(grab){
    if (!vals[3]){
        if (vals[4] && /[0-9]/.test(grab)){
            vals[0] = "";
            vals[4] = false;
        }
        if (grab == "→" ) {
            vals[0] = vals[0].slice(0, -1);
            document.querySelector('h2').textContent = vals[2] + vals[1] + vals[0];
            if (vals[0] == "") document.querySelectorAll('.oper').forEach(oper => oper.disabled = true);
            return;
        }
        if (grab == "+/-" ){ 
            vals[0] = swapSign(vals[0]);
            document.querySelector('h2').textContent = vals[2] + vals[1] + vals[0];
            return;
        }
        if (grab == "AC"){
            vals = ["", "", "", false];
            grab = "";
            document.querySelector('.dot').disabled = false;
            document.querySelector('h3').textContent = "";
            document.querySelectorAll('.oper').forEach(oper => oper.disabled = true);
        }
        if (grab.includes('x') || grab.includes('+')|| grab.includes('-')|| grab.includes('÷')){
            vals[1] = grab;
            vals[2] = vals[0];
            vals[0] = "";
            grab = "";
            document.querySelector('.dot').disabled = false;
            document.querySelectorAll('.oper').forEach(oper => oper.disabled = true);
        }
        if (vals[0].length >= 16) return;
        vals[0] = vals[0]+ '' +grab;
    }
    if(vals[3]){
        document.querySelector('h3').textContent = vals[2] + vals[1] + vals[0] + " = ";
        if(vals[2] != ""){
            vals[0] = operate(vals[2], vals[0], vals[1]);
        }
        document.querySelector('h2').textContent = vals[2] + vals[1] + vals[0];
        vals[3] = false;
        vals[2] = "";
        vals[1] = "";
        document.querySelector('.dot').disabled = false;
        document.querySelectorAll('.oper').forEach(oper => oper.disabled = true);
        vals[4] = true;
    }
    if (vals[0] != "" && vals[1] == ""){
        document.querySelectorAll('.oper').forEach(oper => oper.disabled = false);
    }
    document.querySelector('h2').textContent = vals[2] + vals[1] + vals[0];
}
function swapSign(x){
    if (x > 0) return x-(x*2) + "";
    if(x < 0) return (x*-1) + "";
}

function add (x, y){
    return (+x)+(+y);
}

function subtract(x, y){
    return x-y;
}

function multiply(x, y){
    return x*y;
}

function divide(x, y){
    if(y == '0') return 'OH NO AAAUUUGH';
    return x/y;
}

function operate(x, y, sign){
    if (sign == " + ") return add(x, y);
    else if(sign == " x ") return multiply(x, y);
    else if(sign == " - ") return subtract(x, y);
    else return divide(x, y);
}