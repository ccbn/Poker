import {decoder} from "./decoder.js";

var d = new decoder('{ "message" : "HEJ!"}',"message");

d.onValid(function(string) 
{
    console.log(string);
});