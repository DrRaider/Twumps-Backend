const upperFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const upperFirstLowerOthers = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

module.exports = {
    upperFirstLetter, upperFirstLowerOthers
};
