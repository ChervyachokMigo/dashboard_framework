const change_element_text = ({selector, text}) => {
    $(selector).text(text);
}

const isJSON = (str) => {
    try {
        JSON.parse(str.toString());
    } catch (e) {
        return false;
    }
    return true;
}

const get_value_by_key = (object, value) => {
    if(Object.keys(object).find( key => key === value)){
        return object[value];
    } else {
        return null;
    }
}

const extname = (filepath) => {
    return filepath.substr(filepath.lastIndexOf('.'));
}