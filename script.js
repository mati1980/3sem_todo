"use strict";

window.addEventListener("DOMContentLoaded", start);

//definerer tomt array
let myArr = [];

//start funktion når siden loader
function start() {
  console.log("ready");

  // Retrieving the string
  let retString = localStorage.getItem("myArr");

  if (retString !== null) {
    // Retrieved array
    myArr = JSON.parse(retString);
    displayList(myArr);
  }
}

//sætter eventlistener på plus ikonet
const knap = document.querySelector("#add");
knap.addEventListener("click", knapKlik);

//opretter konstanter for inputfelterne
const text = document.querySelector('[type="text"]');
const number = document.querySelector('[type="number"]');

//gør så man kan bruge enter keypress
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const task = document.querySelector("input").value;
    if (task.trim() === "") return;
    knapKlik(task);
  }
});

//knapKlik funktion kaldes når knappen bliver klikket på, eller når man trykker enter
function knapKlik() {
  console.log(text.value + number.value);

  //opretter tomt objekt
  const myObj = {};

  //opretter parametre for objektet med value fra inputfelterne samt et id
  myObj.indhold = text.value;
  myObj.number = number.value;
  myObj.id = myArr.length;

  //pusher myObj ind i myArr
  myArr.push(myObj);

  //kalder funktionen der viser arrayet
  displayList(myArr);
}

//displayList viser arrayet
function displayList(array) {
  /////
  //local storage
  let string = JSON.stringify(myArr);
  localStorage.setItem("myArr", string);
  /////

  // tømmer listen
  document.querySelector("#list").innerHTML = "";
  document.querySelector("#donelist").innerHTML = "";

  // bygger ny liste
  array.forEach((item) => {
    // opretter en klon
    const clone = document.querySelector("template#item").content.cloneNode(true);

    // laver klon data
    clone.querySelector("p").textContent = item.number + " " + item.indhold;
    clone.querySelector(".item").id = item.id;
    clone.querySelector("#done").addEventListener("click", doneListe);
    clone.querySelector("#ud").addEventListener("click", sletObjekt);
    clone.querySelector("#ud").id = item.id;

    //doneListe kaldes når man klikker gladsmiley
    function doneListe() {
      //fungerer som toggle
      item.done = !item.done;

      //kalder funktionen der viser arrayet
      displayList(myArr);
    }

    //sletObjekt kaldes når man klikker sursmiley
    function sletObjekt() {
      //sætter myArr til hvad der bliver returneret fra funktionen removeObj
      myArr = removeObj(myArr, item.id);

      //kalder funktionen der viser arrayet
      displayList(myArr);
    }

    // appender klonen i en if-sætning til enten todo- eller donelisten ud fra om done=true på objektet
    if (item.done === true) {
      document.querySelector("#donelist").appendChild(clone);
    } else {
      document.querySelector("#list").appendChild(clone);
    }
  });
}

function removeObj(arr, id) {
  //finder indexet for objektet med det givne id
  const indexObjId = arr.findIndex((obj) => obj.id === id);
  //bruger det fundne index til at fjerne objektet fra arrayet vha splice
  arr.splice(indexObjId, 1);
  //returnerer arrayet
  return arr;
}
