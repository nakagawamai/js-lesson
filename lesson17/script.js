const slider = document.getElementById("js-slider");

const createElement = (obj) => {
    const element = document.createElement(obj.tagName);
    if(obj.id){
        element.id = obj.id;
    }
    element.className = obj.className;
    element.textContent = obj.text;
    element.src = obj.src;
    element.alt = obj.alt;
    return element;
}

const createErrorMessage = (error) => {
    const errMsg = createElement({tagName:"p",className:"error-msg",text:error})

    slider.appendChild(errMsg);
}

const showLoading = () => {
    const loadingImg = createElement({
        tagName:"img",
        id:"js-loading",
        className:"loading",
        src:"img/loading-circle.gif",
        alt:"ローディング"
    });
    slider.appendChild(loadingImg);
}

const removeLoading = () => document.getElementById("js-loading").remove();

const fetchData = async (URL) => {
    const response = await fetch(URL);
    if(!response.ok){
        console.error(`${response.status}:${response.statusText}`);
        createErrorMessage('現在、サーバーの通信が壊れています');
    }
    const json = await response.json();
    const data = json.data;
    return data;
}

const fetchSliderData = (ms) => new Promise(resolve => setTimeout(() => resolve(fetchData("https://myjson.dit.upm.es/api/bins/2bzx")),ms));

const init = async () => {
    showLoading();
    try{
        const sliderData = await fetchSliderData(3000);
        if (!sliderData) {
            return;
        }
        renderSliderItems(sliderData);
        getPageNumber(sliderData);
        
        renderButtons();
        isActiveFirstSliderItem();
        switchSliderItem();
    }catch(error){
        console.error(error);
        createErrorMessage(error);
    }finally{
        removeLoading();
    }
}

const renderSliderItems = (sliderData) => {
    const fragment = document.createDocumentFragment();
    for(const image of sliderData){
        const sliderItem = createElement({tagName:"div",className:"slider__item"});
        const slideImage = createElement({tagName:"img",className:"slide-image",src:image.img,alt:image.alt});
        
        fragment.appendChild(sliderItem).appendChild(slideImage);
    }
    slider.appendChild(fragment);
}

const renderButtons = () => {
    const prevBtn = createElement({tagName:"button",id:"js-prevBtn",className:"js-btn prev-btn slider-btn"});
    const nextBtn = createElement({tagName:"button",id:"js-nextBtn",className:"js-btn next-btn slider-btn"});
    prevBtn.disabled = "true";

    slider.appendChild(prevBtn).insertAdjacentElement("afterend",nextBtn);
}

const getPageNumber = (sliderData) => {
    const pageNumber    = createElement({tagName:"p",className:"page-number",text:`/${sliderData.length}`});
    const currentNumber = createElement({tagName:"span",id:"js-currentNumber",className:"current-number",text:"1"});

    slider.appendChild(pageNumber).insertAdjacentElement("afterbegin",currentNumber);
}

const isActiveFirstSliderItem = () => document.getElementsByClassName("slider__item")[0].classList.add("is-active");

const switchSliderItem = () => {
    const sliderButtons = document.getElementsByClassName("js-btn");
    const sliderItems   = document.getElementsByClassName("slider__item");
    let index = 0;
    for (const button of sliderButtons ){
        button.addEventListener("click",function(){  
            sliderItems[index].classList.remove("is-active");    

            button.id === "js-nextBtn" ? index++ : index--;
            sliderItems[index].classList.add("is-active");

            changeCurrentNumber(index);
            disabledButton(sliderItems,index);
        });
    }
}

const changeCurrentNumber = (index) => document.getElementById("js-currentNumber").textContent = `${index +1}`;

const disabledButton = (sliderItems,index) => {
    const nextBtn    = document.getElementById("js-nextBtn");
    const prevBtn    = document.getElementById("js-prevBtn");
    const firstIndex = 0;
    const lastIndex  = sliderItems.length -1;

    prevBtn.disabled = index === firstIndex;
    nextBtn.disabled = index === lastIndex;
}

init();
