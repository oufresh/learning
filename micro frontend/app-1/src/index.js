/* global STANDALONE */

import "./microApp";

console.log(STANDALONE);
if(STANDALONE === true)
    document.getElementById("root").innerHTML = `<editable-list />`;