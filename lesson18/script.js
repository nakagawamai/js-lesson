const slider = document.getElementById("js-slider");

const createAttributedElements = ({tag,attrObj,str}) =>{
    const element = document.createElement(tag);
    Object.keys(attrObj).forEach((attribute) => {
        element.setAttribute(attribute, attrObj[attribute]);
    });
    if(str !== undefined) element.textContent = str;
    return element;
}

const createErrorMessage = (error) => {
    const errMsg = createAttributedElements({tag:"p",attrObj:{class:"error-msg"},str:error});
    
    slider.appendChild(errMsg);
}

const showLoading = () => {
    const loadingPlace = createAttributedElements({tag:"div",attrObj:{id:"js-loading",class:"loading"}});
    const loadingImage = createAttributedElements({tag:"img",attrObj:{src:"img/loading-circle.gif",alt:"ローディング"}});
    
    slider.appendChild(loadingPlace).appendChild(loadingImage);
}

const removeLoading = () => document.getElementById("js-loading").remove();

const fetchData = async (URL) => {
    const response = await fetch(URL);
    if(!response.ok){
        console.error(`${response.status}:${response.statusText}`);
        createErrorMessage('現在、サーバーの通信が壊れています');
    }
    const json = await response.json();
    return json.data;
}

const fetchSliderData = (ms) => new Promise(resolve => setTimeout(() => resolve(fetchData("https://myjson.dit.upm.es/api/bins/2bzx")),ms));

const init = async () => {
    showLoading();
    try{
        const sliderData = await fetchSliderData(3000);
        if (!sliderData) {
            return;
        }
        renderSliderElements(sliderData);
        autoSwitchSlider(sliderData);
    }catch(error){
        console.error(error);
        createErrorMessage(error);
    }finally{
        removeLoading();
    }
}

const renderSliderElements = (sliderData) => {
    renderSliderItems(sliderData);
    getPageNumber(sliderData);
    renderButtons(sliderData);
    renderPagination(sliderData);
    isActiveFirstItem();
}

let autoPlay;
const autoSwitchSlider = (sliderData) =>{
    autoPlay = setInterval(() =>{
        currentIndex ++;
        if(currentIndex >= sliderData.length){
            currentIndex = 0;
        }
        switchSlider(sliderData,currentIndex);
    }, 3000);
}

const resetAutoPlay = (sliderData) => {
    clearInterval(autoPlay);
    autoSwitchSlider(sliderData);
}

const renderSliderItems = (sliderData) => {
    const fragment = document.createDocumentFragment();
    for(const image of sliderData){
        const sliderItem = createAttributedElements({tag:"div",attrObj:{class:"slider__item"}});
        const slideImage = createAttributedElements({tag:"img",attrObj:{class:"slide-image",src:image.img,alt:image.alt}});
        
        fragment.appendChild(sliderItem).appendChild(slideImage);
    }

    slider.appendChild(fragment);
}

const getPageNumber = (sliderData) => {
    const pageNumber    = createAttributedElements({tag:"p",attrObj:{class:"page-number"},str:`/${sliderData.length}`});
    const currentNumber = createAttributedElements({tag:"span",attrObj:{id:"js-currentNumber",class:"current-number"},str:"1"});

    slider.appendChild(pageNumber).insertAdjacentElement("afterbegin",currentNumber);
}

const renderButtons = (sliderData) => {
    const prevBtn = createAttributedElements({tag:"button",attrObj:{id:"js-prevBtn",class:"js-btn prev-btn slider-btn",disabled:true}});
    const nextBtn = createAttributedElements({tag:"button",attrObj:{id:"js-nextBtn",class:"js-btn next-btn slider-btn"}});

    slider.appendChild(prevBtn).insertAdjacentElement("afterend",nextBtn);
    addClickEventForButton(sliderData);
}

const renderPagination = (sliderData) => {
    const paginationList = createAttributedElements({tag:"ul",attrObj:{id:"js-pagination",class:"pagination"}});

    const fragment = document.createDocumentFragment();
    const length   = sliderData.length;
    for(let i = 0; i < length; i++){
        const paginationItem = createAttributedElements({tag:"li",attrObj:{class:"pagination__item"}});
        fragment.appendChild(paginationItem);
    }

    slider.appendChild(paginationList).appendChild(fragment);
    addClickEventForPagination(sliderData);
}

let currentIndex = 0;
const addClickEventForButton = (sliderData) => {
    const sliderButtons = document.getElementsByClassName("js-btn");

    for (const button of sliderButtons ){
        button.addEventListener("click",function(){
            this.id === "js-nextBtn" ? currentIndex++ : currentIndex--;

            switchSlider(sliderData,currentIndex);
            resetAutoPlay(sliderData);
        });
    }
}

const addClickEventForPagination = (sliderData) => {
    const paginetions   = document.getElementsByClassName("pagination__item");
    const arrayPaginations = [...paginetions];
    
    for(const pagination of paginetions ){
        pagination.addEventListener("click",function(){
            currentIndex = arrayPaginations.indexOf(this);

            switchSlider(sliderData,currentIndex);
            resetAutoPlay(sliderData);
        });
    }
}

const isActiveFirstItem = () => {
    document.getElementsByClassName("slider__item")[0].classList.add("is-active");
    document.getElementsByClassName("pagination__item")[0].classList.add("is-active");
}

const switchSlider = (sliderData,currentIndex) => {
    changeCurrentNumber(currentIndex);
    switchSliderItems(currentIndex);
    switchPaginations(currentIndex);
    switchDisabledButton(sliderData);
}

const changeCurrentNumber = (currentIndex) => document.getElementById("js-currentNumber").textContent = `${currentIndex +1}`;

const switchSliderItems = (currentIndex) => {
    const sliderItems = document.getElementsByClassName("slider__item");
    document.querySelector(".is-active").classList.remove("is-active");
    sliderItems[currentIndex].classList.add("is-active");
}

const switchPaginations = (currentIndex) => {
    const paginations = document.getElementsByClassName("pagination__item");
    document.querySelector(".pagination__item.is-active").classList.remove("is-active");
    paginations[currentIndex].classList.add("is-active");
}

const switchDisabledButton = (sliderData) => {
    const nextBtn    = document.getElementById("js-nextBtn");
    const prevBtn    = document.getElementById("js-prevBtn");
    const firstIndex = 0;
    const lastIndex  = sliderData.length -1;

    prevBtn.disabled = currentIndex === firstIndex;
    nextBtn.disabled = currentIndex === lastIndex;
}

init();
