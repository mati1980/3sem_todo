"use strict";

window.addEventListener("DOMContentLoaded", start);

let myArr = [];

function start() {
  console.log("ready");

  // Retrieving the string
  let retString = localStorage.getItem("myArr");

  // Retrieved array
  myArr = JSON.parse(retString);

  displayList(myArr);
}

const knap = document.querySelector("#add");

knap.addEventListener("click", knapKlik);

const text = document.querySelector('[type="text"]');
const number = document.querySelector('[type="number"]');

function knapKlik() {
  console.log(text.value + number.value);
  const myObj = {};
  myObj.indhold = text.value;
  myObj.number = number.value;
  myObj.id = myArr.length;

  myArr.push(myObj);

  displayList(myArr);
}

//enter keypress
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const task = document.querySelector("input").value;
    if (task.trim() === "") return;
    knapKlik(task);
  }
});

function displayList(array) {
  /////
  //local storage
  let string = JSON.stringify(myArr);
  localStorage.setItem("myArr", string);
  /////
  // clear the list
  document.querySelector("#list").innerHTML = "";
  document.querySelector("#donelist").innerHTML = "";

  // build a new list
  array.forEach((item) => {
    // create clone
    const clone = document.querySelector("template#item").content.cloneNode(true);

    // set clone data
    clone.querySelector("p").textContent = item.number + " " + item.indhold;
    clone.querySelector(".item").id = item.id;
    clone.querySelector("#done").addEventListener("click", doneListe);
    clone.querySelector("#ud").addEventListener("click", sletListe);
    clone.querySelector("#ud").id = item.id;
    function doneListe() {
      console.log("noget er gjort");
      item.done = !item.done;

      displayList(myArr);
      console.log("array", myArr);
    }

    function sletListe() {
      console.log("noget skal slettes");
      myArr = removeObj(myArr, item.id);
      displayList(myArr);
    }

    // append clone to list

    //HJÆLP MIG

    console.log("filtrer nu");
    if (item.done === true) {
      document.querySelector("#donelist").appendChild(clone);
    } else {
      document.querySelector("#list").appendChild(clone);
    }
  });
}

function removeObj(arr, id) {
  const indexObjId = arr.findIndex((obj) => obj.id === id);
  arr.splice(indexObjId, 1);
  return arr;
}
