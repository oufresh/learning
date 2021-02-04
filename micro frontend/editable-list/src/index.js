/* global STANDALONE */

import "./editable-list";

if(STANDALONE === true)
    document.getElementById("root").innerHTML = `<editable-list />`;