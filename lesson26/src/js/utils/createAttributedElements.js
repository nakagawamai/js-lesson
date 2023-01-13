export const createAttributedElements = ({tag,valuesByAttributes,str=""}) =>{
    const element = document.createElement(tag);
    Object.keys(valuesByAttributes).forEach((attribute) => {
        element.setAttribute(attribute, valuesByAttributes[attribute]);
    });
    element.textContent = str;
    return element;
}
