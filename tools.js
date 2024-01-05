module.exports = {
    isJSON: (str) => {
        try {
            JSON.parse(str.toString());
        } catch (e) {
            return false;
        }
        return true;
    }
}