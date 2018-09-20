
var isJSON = function(str) 
{
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

var isTypeValid = function(string,type) 
{
    var json = JSON.parse(string);
    if(type == "message") 
    {
        if(json.message) return true;
    }
    if(type == "states")
    {
        if(json.color) return true;
    }
    return false;
}

var decoderf = function(string, type) 
{
    var valid = true; 
    if(!isJSON(string)) valid = false;
    if(valid) {
        if(!isTypeValid(string,type)) valid = false;
    }
    
    var obj = { valid : valid, onValid : function(callback) {
        if(valid)
        {
            var json = JSON.parse(string);
            callback(json);
        }
    }};
    
    return obj;
}

export var decoder = decoderf;