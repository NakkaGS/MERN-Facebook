function generateCode(length){
    var code = ""
    var schema = "0123456789"

    for(let i=0; i < length; i++) {
        code += schema.charAt(Math.floor(Math.random() * schema.length))
    }

    return code
}

module.exports = generateCode;