let base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let dropdowns = document.querySelectorAll("select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let finalMsg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateExchageRate = async () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = "1";
        amount.value = "1";
    }

    let URL = `${base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmount = (amtVal * rate);
    finalMsg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchageRate();
})

window.addEventListener("load", () =>{
    updateExchageRate();
})