import { createAttributedElements } from "./utils/createAttributedElements";
import * as loading from "./module/loading";
import * as slide from "./contents/slideshow";
import * as tab from "./contents/tab";

const logout = () =>  {
    if(localStorage.getItem('token')){
        localStorage.removeItem('token');
        location.href = "./login.html";
    }
}

document.querySelector('[data-id="logout-button"]').addEventListener("click", logout);

const endPointURL = {
    sliderData : "https://api.json-generator.com/templates/szdgGQcOLXuk/data?access_token=hu4bc7qh9znx2m8f53mn4mz2hryvdntkavwbw8j0",
    newsData   : "https://api.json-generator.com/templates/kuSXIyw7OJla/data?access_token=hu4bc7qh9znx2m8f53mn4mz2hryvdntkavwbw8j0"
}

const createErrorMessage = (error,element) => {
    const errorMessage = createAttributedElements({tag:"p",valuesByAttributes:{class:"error-message"},str:error});
    element.appendChild(errorMessage);
}

const fetchData = async (endpointURL,element) => {
    const response = await fetch(endpointURL);
    if(!response.ok){
        console.error(`${response.status}:${response.statusText}`);
        createErrorMessage("Communication with the server is broken.",element);
        return;
    }
    const json = await response.json();
    return json.data;
}

const fetchContentsData = (endPointURL,element,ms) => new Promise(resolve => setTimeout(() => resolve(fetchData(endPointURL,element)),ms));

const initSlider = async () => {
    const slider = slide.sliderList;
    loading.showLoading(slider);
    try{
        const sliderData = await fetchContentsData(endPointURL.sliderData,slider,3000);
        if (!sliderData.length) {
            createErrorMessage("Sorry, we have no image.",slider);
            return;
        }
        slide.renderSliderElements(sliderData);
        slide.autoPlayById.start(sliderData.length);
    }catch(error){
        console.error(error);
    }finally{
       loading.removeLoading(slider);
    }
}

const initTab = async () => {
    const topics = tab.topicsList;
    loading.showLoading(topics);
    try{
        const newsData = await fetchContentsData(endPointURL.newsData,topics,);
        if(!newsData.length){
            createErrorMessage("Sorry, we have no news.",topics);
            return;
        }
        tab.renderTabContents(newsData);
        tab.changeTabContents(newsData);
    }catch(error){
        console.error(error);
    }finally{
        loading.removeLoading(topics);
    }
}

initSlider();
initTab();
