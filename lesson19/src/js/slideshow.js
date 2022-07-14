import { createAttributedElements } from "./utils/createAttributedElements";

const sliderList = document.getElementById("js-slider-list");
const sliderListItems = document.getElementsByClassName("js-slider-list__item");

const counter = {
    count: 0,
    up(){
        this.count++
    },
    down(){
        this.count--;
    },
    reset(){
        this.count = 0;
    }
}

const autoPlayById = {
    id:"",
    start() {
        this.id = setInterval(() => {
            counter.up();
            if(counter.count === sliderListItems.length){
                counter.reset();
            }
            playSlideShow();
        }, 3000);
    },
    reset(){
        clearInterval(this.id);
        this.start();
    }
}


const activateFirstItem = (className) => document.querySelector(`.${className}`).classList.add("is-active");

const renderSliderItems = (sliderData) => {
    const fragment = document.createDocumentFragment();
    for(const image of sliderData){
        const sliderItems = createAttributedElements({
            tag:"li",
            valuesByAttributes:{class:"js-slider-list__item slider-list__item"}
        });

        const images = createAttributedElements({
            tag:"img",
            valuesByAttributes:{class:"image",src:image.img,alt:image.alt}
        });
        
        fragment.appendChild(sliderItems).appendChild(images);
    }

    sliderList.appendChild(fragment);
    activateFirstItem("js-slider-list__item");
}

const renderPaginations = () => {
    const paginationList = createAttributedElements({
        tag:"ul",
        valuesByAttributes:{id:"js-pagination-list", class:"pagination-list"}});

    const fragment = document.createDocumentFragment();
    for(let i = 0; i < sliderListItems.length; i++){
        const paginationListItems = createAttributedElements({
            tag:"li",
            valuesByAttributes:{class:"js-pagination-list__item pagination-list__item"}
        });
        fragment.appendChild(paginationList).appendChild(paginationListItems);
    }

    sliderList.appendChild(fragment);
    addClickEventForPaginations();
    activateFirstItem("js-pagination-list__item");
}

const addClickEventForPaginations = () => {
    const paginations = [...document.getElementsByClassName("js-pagination-list__item")];

    document.getElementById("js-pagination-list").addEventListener("click",function(e){
        if(e.currentTarget === e.target){
            return;
        }
        counter.count = paginations.indexOf(e.target);

        playSlideShow();
        autoPlayById.reset();
    });
}

const getTotalPageNumber = () => {
    const totalNumber = createAttributedElements({
        tag:"p",
        valuesByAttributes:{id:"total-number"},
        str: `/${sliderListItems.length}`
    });

    const currentNumber = createAttributedElements({
        tag:"span",
        valuesByAttributes:{id:"js-current-number",class:"current-number"},
        str: "1"
    });
    
    sliderList.appendChild(totalNumber).insertAdjacentElement("afterbegin",currentNumber);
}

const changeCurrentPageNumber = () => document.getElementById("js-current-number").textContent = `${counter.count + 1}`;

const buttons = {
    prevId:"js-prevBtn",
    nextId:"js-nextBtn",
    class:"js-btn"
}

const renderButtons = () => {
    const prevButton = createAttributedElements({
        tag:"button",
        valuesByAttributes:{id:buttons.prevId,class:`${buttons.class} slider-btn prev-btn`,disabled:true}
    });

    const nextButton = createAttributedElements({
        tag:"button",
        valuesByAttributes:{id:buttons.nextId,class:`${buttons.class} slider-btn next-btn`}
    });

    sliderList.appendChild(prevButton).after(nextButton);
    addClickEventForButtons();
}

const addClickEventForButtons = () =>{
    const arrowButtons = document.getElementsByClassName(buttons.class);

    for (const button of arrowButtons ){
        button.addEventListener("click",() => {
            button.id === buttons.nextId ? counter.up() : counter.down();
            playSlideShow();
            autoPlayById.reset();
        });
    }
}

const changeDisableStateButtons = () => {
    const first = 0;
    const last  = sliderListItems.length -1;
    document.getElementById(buttons.prevId).disabled = counter.count === first;
    document.getElementById(buttons.nextId).disabled = counter.count === last;
}

const changeActiveItem  = () => {
    const sliderItems = [ "js-slider-list__item", "js-pagination-list__item" ]
    
    sliderItems.forEach((item) => {
        const index = counter.count;
        document.getElementsByClassName(`${item} is-active`)[0].classList.remove("is-active");
        document.getElementsByClassName(item)[index].classList.add("is-active");
    });
}

const playSlideShow = () => {
    changeCurrentPageNumber();
    changeActiveItem();
    changeDisableStateButtons();
}

const renderSliderElements = (sliderData) => {
    renderSliderItems(sliderData);
    renderPaginations();
    renderButtons();
    getTotalPageNumber();
}

export{sliderList,autoPlayById,renderSliderElements};
