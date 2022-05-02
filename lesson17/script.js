const slider = document.getElementById("js-slider");

const createElement = ({tagName,id,className,text}) => {
    const element = document.createElement(tagName);
    if(id){
        element.id = id;
    }
    element.className = className;
    element.textContent = text;
    return element;
}

const createImage = ({id,className,src,alt}) => {
    const image     = document.createElement("img");
    if(id){
        image.id = id;
    }
    image.className = className;
    image.src = src;
    image.alt = alt;
    return image;
}

const createButton = ({id,className}) => {
    const button = document.createElement("button");
    button.id = id;
    button.className = className;
    return button;
}

const createErrorMessage = (error) => {
    const errMsg  = createElement({tagName:"p",className:"error-msg",text:error})

    slider.appendChild(errMsg);
    return errMsg;
}

const showLoading = () => {
    const loadingImg = createImage({
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
        renderPagenation(sliderData);
        
        renderButtons();
        isActiveFirstSliderItem();
        SwitchSliderItem();
    }catch(error){
        console.error(error);
        createErrorMessage(error);
    }finally{
        removeLoading();
    }
}

const renderSliderItems = (sliderData) => {
    const fragment = document.createDocumentFragment();
    for(const [index,image] of sliderData.entries()){
        const sliderItem = createElement({tagName:"div",className:"slider__item"});
        const slideImage = createImage({className:"slide-image", src:image.img, alt:image.alt});
        sliderItem.style.zIndex = `${sliderData.length -+ index}`;
        
        fragment.appendChild(sliderItem).appendChild(slideImage);
    }
    slider.appendChild(fragment);
}

const renderButtons = () => {
    const prevBtn = createButton({id:"js-prevBtn",className:"js-btn prev-btn slider-btn"});
    const nextBtn = createButton({id:"js-nextBtn",className:"js-btn next-btn slider-btn"});
    prevBtn.disabled = "true";

    slider.appendChild(prevBtn).insertAdjacentElement("afterend",nextBtn);
}

const renderPagenation = (sliderData) => {
    const pagenation    = createElement({tagName:"p",className:"pagenation",text:`/${sliderData.length}`});
    const currentNumber = createElement({tagName:"span",id:"js-currentNumber",className:"current-number",text:"1"});

    slider.appendChild(pagenation).insertAdjacentElement("afterbegin",currentNumber);
    return pagenation;
}

const isActiveFirstSliderItem = () => document.getElementsByClassName("slider__item")[0].classList.add("is-active");

const SwitchSliderItem = () => {
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

    return lastIndex;
}

init();
