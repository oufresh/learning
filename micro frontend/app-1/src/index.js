/* global STANDALONE */

import "./microApp";

if(STANDALONE === true)
    document.getElementById("root").innerHTML = `<editable-list />`;