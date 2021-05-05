export const isValidControl = (value, rule, ruleVal) => {
    switch(rule){
        case 'email':
            return value.includes('@');
        case 'minlength':
            return value.trim().length >= ruleVal;
        case 'require':
        default:
            return value.trim() !== '';
    }
}

export const checkValidity = (obj) => {
    if(!obj.validation) return;
    let isValid = true;
    obj.error = {};
    for(let key in obj.validation){
        const checkOutput = isValidControl(obj.elementConfig.value, key, obj.validation[key]);
        if(isValid) isValid = checkOutput;
        if(!checkOutput) obj.error[key] = true;
    }
    return obj.valid = isValid;
}

export const isValidForm = (formName, formVal, setState) => {
    let isValid = true;
    const copiedForm = {...formVal};
    for(let key in formVal){
        const copiedElement = {...copiedForm[key]};
        const output = checkValidity(copiedElement);
        copiedForm[key] = copiedElement;
        if(isValid) isValid = output;
    }
    const obj = {};
    obj[formName] = copiedForm;
    setState(obj);
    return isValid;
}