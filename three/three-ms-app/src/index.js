/* global STANDALONE */

import "./three-ms-app";

console.log(STANDALONE);
if(STANDALONE === true)
    document.getElementById("root").innerHTML = `<three-ms-app />`;