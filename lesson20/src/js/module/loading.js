import { createAttributedElements } from "../utils/createAttributedElements";

const showLoading = (parent) => {
    const loadingPlace = createAttributedElements({
        tag:"div",
        valuesByAttributes:{
            id:`${parent.id}-loading`,
            class:"flex justify-center items-center"
        }
    })
    const loadingImage = createAttributedElements({
        tag:"div",
        valuesByAttributes:{
            class:"animate-ping h-5 w-5 bg-gray-600 rounded-full m-20"
        }
    });
    parent.appendChild(loadingPlace).appendChild(loadingImage);
}

const removeLoading = (parent) => document.getElementById(`${parent.id}-loading`).remove();

export { showLoading,removeLoading};
