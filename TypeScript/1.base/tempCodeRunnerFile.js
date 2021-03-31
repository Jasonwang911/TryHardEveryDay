"use strict";
// 普通枚举
var Gender;
(function (Gender) {
    Gender[Gender["GIRL"] = 0] = "GIRL";
    Gender[Gender["BOY"] = 1] = "BOY";
})(Gender || (Gender = {}));
console.log(Gender.GIRL);
console.log(Gender.BOY);
var myColor = [0 /* RED */, 1 /* YELLOW */, 2 /* BLUE */];
console.log(myColor);
