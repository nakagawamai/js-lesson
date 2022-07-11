import { createAttributedElements } from "../utils/createAttributedElements";

const showLoading = (parent) => {
    const loadingPlace = createAttributedElements({
        tag:"div",
        valuesByAttributes:{
            id:`${parent.id}-loading`,
            class:"loading-area"
        }
    })
    const loadingImage = createAttributedElements({
        tag:"div",
        valuesByAttributes:{
            class:"loading-image"
        }
    });
    parent.appendChild(loadingPlace).appendChild(loadingImage);
}

const removeLoading = (parent) => document.getElementById(`${parent.id}-loading`).remove();

export { showLoading,removeLoading};
