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
