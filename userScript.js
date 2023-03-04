// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://speechling.com/dictation
// @icon         https://www.google.com/s2/favicons?sz=64&domain=speechling.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  // curl -X POST -H "Content-Type: application/json" -d '{"inputs":"お願いします"}' https://fast-wildwood-88937.herokuapp.com/get_kunrei
  async function get_romaji(text) {
    let response = await fetch(
      "https://lamonkey-learn-jap.herokuapp.com/get_kunrei",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
        }),
      }
    );
    let json = await response.json();
    return json;
  }
  // Your code here...
  document.addEventListener("click", async function (event) {
    if (event.target.id === "giveup" || event.target.id === "check") {
      let answer_node = document.getElementById('truth');
      let romaji = await get_romaji(answer_node.innerText);

      //add to view
      if(document.getElementById('romaji')){
       document.getElementById('romaji').innerText = romaji.data; 
      }
      else{
          let romaji_container = document.createElement('p')
          romaji_container.id = 'romaji'
          romaji_container.innerText = romaji.data
          answer_node.insertAdjacentElement("afterend", romaji_container)
      }
    }
  });
})();
