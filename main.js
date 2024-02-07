

Price95 = (Math.random() * (3.34 - 2.48) + 2.48).toFixed(3);
Price98 = (Math.random() * (3.34 - 2.48) + 2.48).toFixed(3);
PriceDiesel = (Math.random() * (3.34 - 2.48) + 2.48).toFixed(3);
PriceMehu = 0.89;
Selected = 0;
crscan = "null";
bonus = "false";
syncprice = 0;
pumpingprocess = "0";
secret = "1234";
pinin = "";

document.getElementById("95").innerHTML = Price95;
document.getElementById("98").innerHTML = Price98;
document.getElementById("Diesel").innerHTML = PriceDiesel;
document.getElementById("Mehu").innerHTML = PriceMehu;

function select() {
  if (sel == "Sel95") {
    SelPrice = Price95;
  } else if (sel == "Sel98") {
    SelPrice = Price98;
  } else if (sel == "SelDiesel") {
    SelPrice = PriceDiesel;
  } else {
    SelPrice = PriceMehu;
  }
  document.getElementById("Sel95").style.borderRadius = "10px";
  document.getElementById("Sel98").style.borderRadius = "10px";
  document.getElementById("SelDiesel").style.borderRadius = "10px";
  document.getElementById("SelMehu").style.borderRadius = "10px";
  document.getElementById(sel).style.borderRadius = "30px";
  screen3();
}

function insert() {
  if (pumpingprocess == "1") {
    pumpingprocess = "2";
    document.getElementById("Pump").style.color = "#fcfbdc";
  }
}

let pumped = 0.0;
function pump() {
  if (pumpingprocess == "2") {
    pumped += 0.0192;
    document.getElementById("PumpInfo2").innerHTML = pumped.toFixed(3);
    if (sel == "Sel95") {
      document.getElementById("PumpInfo4").innerHTML = (
        pumped * Price95
      ).toFixed(2);
    } else if (sel == "Sel98") {
      document.getElementById("PumpInfo4").innerHTML = (
        pumped * Price98
      ).toFixed(2);
    } else if (sel == "SelDiesel") {
      document.getElementById("PumpInfo4").innerHTML = (
        pumped * PriceDiesel
      ).toFixed(2);
    } else {
      document.getElementById("PumpInfo4").innerHTML = (
        pumped * PriceMehu
      ).toFixed(2);
    }
  }
  if (pumped * SelPrice >= finalAmoutWanted) {
    document.getElementById("Finish").style.color = "#fcfbdc";
    pumpingprocess = "3";
    document.getElementById("PumpInfo4").innerHTML = (finalAmoutWanted).toFixed(2)
  }
}

const pumpElement = document.getElementById("Pump");

pumpElement.addEventListener("mousedown", () => {
  const intervalId = setInterval(() => {
    pump();
  }, 3);

  pumpElement.addEventListener("mouseup", () => {
    clearInterval(intervalId);
  });
});

function finish() {
  if(pumpingprocess=="3"){
  alert("You succesfully gassed up your car!");
  location.reload();
}
}

function updateTime() {
  const d = new Date();
  document.getElementById("header1").innerHTML =
    d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  document.getElementById("header2").innerHTML =
    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
updateTime();
setInterval(updateTime, 1000);

// screen1
document.getElementById("lansel").innerHTML = `Please select a lanuage
<br><br>
<img src="gallery/uk.webp" onclick="screen2()" class="lan"></img>
<img src="gallery/us.webp" onclick="screen2()" class="lan"></img>
<img src="gallery/au.webp" onclick="screen2()" class="lan"></img>`;

function screen2() {
  gasselectable = "true";
  document.getElementById(
    "lansel"
  ).innerHTML = `Please select a fule type using the buttons to the right`;
}

function screen3() {
  gasselectable = "false";
  syncprice = 1;
  setInterval(syncInnerHTML, 100);
  document.getElementById(
    "lansel"
  ).innerHTML = `For how much would you like to buy gas?<br>
    <input type="number" id="amoutwanted"> €
    <br><input value="" id="Literswanted" type="text"> L
    <br><button onclick="screen4();">Enter</button>
    `;
}

function screen4() {
  syncprice = 0;
  finalAmoutWanted = document.getElementById("amoutwanted").value;
  document.getElementById(
    "lansel"
  ).innerHTML = `Please choose a payment method <br>
    <button onclick="credit()" class="buttons">Credit</button>
    <button onclick="debit()" class="buttons">Debit</button>
    `;
}

function pinput() {
  if (input == "OK") {
    if (pinin == secret) {
      pinok();
    }
  } else if (input == "back") {
    pinin = pinin.slice(0, -1);
    innerhtml = document.getElementById("pinput").innerHTML;
    document.getElementById("pinput").innerHTML = innerhtml.slice(0, -1);
  } else {
    pinin += input;
    document.getElementById("pinput").innerHTML += "*";
  }
}

function pinok() {
  document.getElementById("lansel").innerHTML = `
    Purchase authorised, please take out your card
    `;
  crscan = "done";
}

function credit() {
  paymentMethod = "credit";
  document.getElementById("lansel").innerHTML = `
    Apply bonus? <br>
    <button class="buttons" onclick="debitbonus()">Yes</button><button class="buttons" onclick="nobonuscredit()">No</button>
    `;
}

function debit() {
  paymentMethod = "debit";
  document.getElementById("lansel").innerHTML = `
    Apply bonus? <br>
    <button class="buttons" onclick="creditbonus()">Yes</button><button class="buttons" onclick="nobonus()">No</button>
    `;
}

function debitbonus() {
  document.getElementById("lansel").innerHTML = `
    Please insert your ts1 bonus card into the card reader
    <br><button class="buttons" onclick="debit()">No bonus card?</button>
    `;
  crscan = "debitbonus";
}

function creditbonus() {
  document.getElementById("lansel").innerHTML = `
    Please insert your ts1 bonus card into the card reader
    <br><button class="buttons" onclick="debit()">No bonus card?</button>
    `;
  crscan = "creditbonus";
}

function nobonus() {
  bonusmessage = "-0.00";
  totalwithbonus = finalAmoutWanted;
  debitpay();
}

function nobonuscredit() {
  bonusmessage = "-0.00";
  totalwithbonus = finalAmoutWanted;
  creditpay();
}

function debitpay() {
  document.getElementById("lansel").innerHTML = `
    please insert your debit card <br> into the card reader<br><br>
    price: ${finalAmoutWanted}€ <br>
    Bonus: ${bonusmessage}€ <br>
    Total: ${totalwithbonus}€
    `;
  crscan = "debitpay";
}

function creditpay() {
  document.getElementById("lansel").innerHTML = `
    please insert your credit card <br> into the card reader<br><br>
    price: ${finalAmoutWanted}€ <br>
    Bonus: ${bonusmessage}€ <br>
    Total: ${totalwithbonus}€
    `;
  crscan = "creditpay";
}

function cardreader() {
  if (crscan == "null") {
    document.getElementById("cr").style.backgroundImage =
      "url(gallery/CRE.png)";
  } else if (crscan == "debitbonus") {
    document.getElementById("cr").style.backgroundImage = "url(gallery/CR.png)";
    document.getElementById("lansel").innerHTML = `
    Bonus applied, please take out your card`;
    bonus = "true";
    bonusmessage = "-" + (finalAmoutWanted * 0.035).toFixed(2);
    totalwithbonus = (finalAmoutWanted - finalAmoutWanted * 0.035).toFixed(2);
    crscan = "bonusok";
  } else if (crscan == "bonusok") {
    document.getElementById("cr").style.backgroundImage =
      "url(gallery/CRE.png)";
    if (paymentMethod == "debit") {
      debitpay();
    } else {
      creditpay();
    }
  } else if (crscan == "debitpay") {
    document.getElementById("cr").style.backgroundImage = "url(gallery/CR.png)";
    document.getElementById("lansel").innerHTML = `
    Purchase authorized, please take out your card
    `;
    crscan = "done";
  } else if (crscan == "done") {
    document.getElementById("cr").style.backgroundImage =
      "url(gallery/CRE.png)";
    document.getElementById("lansel").innerHTML = `Purchase complete`;
    document.getElementById("Insert").style.color = "#fcfbdc";
    pumpingprocess = "1";
  } else if (crscan == "creditpay") {
    document.getElementById("cr").style.backgroundImage = "url(gallery/CR.png)";
    document.getElementById("lansel").innerHTML = `
    <div class="pinput" id="pinput"></div>
                 <button class="pinputbuttons" onclick="pinput(input='1')">1</button><button class="pinputbuttons" onclick="pinput(input='2')">2</button><button class="pinputbuttons" onclick="pinput(input='3')">3</button><br>
                 <button class="pinputbuttons" onclick="pinput(input='4')">4</button><button class="pinputbuttons" onclick="pinput(input='5')">5</button><button class="pinputbuttons" onclick="pinput(input='6')">6</button><br>
                 <button class="pinputbuttons" onclick="pinput(input='7')">7</button><button class="pinputbuttons" onclick="pinput(input='8')">8</button><button class="pinputbuttons" onclick="pinput(input='9')">9</button><br>
                 <button class="pinputbuttons" onclick="pinput(input='back')">⌫</button><button class="pinputbuttons" onclick="pinput(input='0')">0</button><button class="pinputbuttons" onclick="pinput(input='OK')">OK</button>
            
    `;
  } else if (crscan == "creditbonus") {
    document.getElementById("cr").style.backgroundImage = "url(gallery/CR.png)";
    document.getElementById("lansel").innerHTML = `
    Bonus applied, please take out your card`;
    bonus = "true";
    bonusmessage = "-" + (finalAmoutWanted * 0.035).toFixed(2);
    totalwithbonus = finalAmoutWanted - finalAmoutWanted * 0.035;
    crscan = "bonusok";
  }
}

function syncInnerHTML() {
  if ((syncprice = 1)) {
    let amoutWanted = document.getElementById("amoutwanted");
    let litersWanted = document.getElementById("Literswanted");
    litersWanted.value = (amoutWanted.value / SelPrice).toFixed(3);
  }
}
