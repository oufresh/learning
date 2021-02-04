/* global STANDALONE */

import "./basket";

console.log(STANDALONE);
if(STANDALONE === true)
    document.getElementById("root").innerHTML = `<basket />`;