/* global STANDALONE */

import "./basket";

console.log(STANDALONE);
if(STANDALONE === true)
    document.getElementById("root").innerHTML = `<basket-list />`;

function pippo() {
    console.log("Basket");
}