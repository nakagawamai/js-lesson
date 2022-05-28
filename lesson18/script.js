const slider = document.getElementById("js-slider");
const sliderStatus = {
    currentIndex: 0,
    autoPlay:""
}

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

const autoSwitchSlider = (sliderData) =>{
    sliderStatus.autoPlay = setInterval(() =>{
        sliderStatus.currentIndex ++;
        if(sliderStatus.currentIndex === sliderData.length){
            sliderStatus.currentIndex = 0;
        }
        switchSlider(sliderData);
    }, 3000);
}

const resetAutoPlay = (sliderData) => {
    clearInterval(sliderStatus.autoPlay);
    autoSwitchSlider(sliderData);
}

const renderSliderItems = (sliderData) => {
    const fragment = document.createDocumentFragment();
    for(const image of sliderData){
        const sliderItem = createAttributedElements({tag:"li",attrObj:{class:"js-slider__item slider__item"}});
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

    slider.appendChild(prevBtn).after(nextBtn);
    addClickEventForButton(sliderData);
}

const renderPagination = (sliderData) => {
    const paginationList = createAttributedElements({tag:"ul",attrObj:{id:"js-pagination",class:"pagination"}});

    const fragment = document.createDocumentFragment();
    const length   = sliderData.length;
    for(let i = 0; i < length; i++){
        const paginationItem = createAttributedElements({tag:"li",attrObj:{class:"js-pagination__item pagination__item"}});
        fragment.appendChild(paginationItem);
    }

    slider.appendChild(paginationList).appendChild(fragment);
    addClickEventForPagination(sliderData);
}

const addClickEventForButton = (sliderData) => {
    const sliderButtons = document.getElementsByClassName("js-btn");

    for (const button of sliderButtons ){
        button.addEventListener("click",function(){
            this.id === "js-nextBtn" ? sliderStatus.currentIndex++ : sliderStatus.currentIndex--;

            switchSlider(sliderData);
            resetAutoPlay(sliderData);
        });
    }
}

const addClickEventForPagination = (sliderData) => {
    const paginations      = document.getElementById("js-pagination");
    const arrayPaginations = [...document.getElementsByClassName("js-pagination__item")];
    
        paginations.addEventListener("click",function(e){
            sliderStatus.currentIndex = arrayPaginations.indexOf(e.target);

            switchSlider(sliderData);
            resetAutoPlay(sliderData);
        });
}

const isActiveFirstItem = () => {
    document.querySelector(".js-slider__item").classList.add("is-active");
    document.querySelector(".js-pagination__item").classList.add("is-active");
}

const switchSlider = (sliderData) => {
    changeCurrentNumber();
    switchSliderItems();
    switchPaginations();
    switchDisabledButton(sliderData);
}

const changeCurrentNumber = () => document.getElementById("js-currentNumber").textContent = `${sliderStatus.currentIndex +1}`;

const switchSliderItems = () => {
    const sliderItems = document.getElementsByClassName("js-slider__item");
    document.querySelector(".is-active").classList.remove("is-active");
    sliderItems[sliderStatus.currentIndex].classList.add("is-active");
}

const switchPaginations = () => {
    const paginations = document.getElementsByClassName("js-pagination__item");
    document.querySelector(".js-pagination__item.is-active").classList.remove("is-active");
    paginations[sliderStatus.currentIndex].classList.add("is-active");
}

const switchDisabledButton = (sliderData) => {
    const nextBtn    = document.getElementById("js-nextBtn");
    const prevBtn    = document.getElementById("js-prevBtn");
    const firstIndex = 0;
    const lastIndex  = sliderData.length -1;

    prevBtn.disabled = sliderStatus.currentIndex === firstIndex;
    nextBtn.disabled = sliderStatus.currentIndex === lastIndex;
}

init();
