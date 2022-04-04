const showLoading = () => {
    const loadingPlace = document.createElement('div');
    const loadingImg   = document.createElement('img');
    loadingPlace.id        = "js-loading";
    loadingPlace.className = "loading";
    loadingImg.src = "img/loading-circle.gif";
    loadingImg.alt = "ローディング画像";
    document.body.insertAdjacentElement('afterbegin',loadingPlace).appendChild(loadingImg);
}

const removeLoading = () => document.getElementById('js-loading').remove();

const renderList = (result) => {
    const fragment = document.createDocumentFragment();
    for(const list of result){
        const li  = document.createElement('li');
        const a   = document.createElement('a');
        const img = document.createElement('img');
        li.className  = "list-item";
        a.href        = `/${list.a}`;
        a.textContent = list.text;
        img.src       = list.img;
        img.alt       = list.alt;
        fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin',img);
    } 
    document.getElementById('js-list').appendChild(fragment);
}

const fetchData = async () => {
    try{ 
    const endpoint = "https://api.json-generator.com/templates/szdgGQcOLXuk/data?access_token=hu4bc7qh9znx2m8f53mn4mz2hryvdntkavwbw8j0";
    const response = await fetch(endpoint);
    if(!response.ok){
        console.error(`${response.status}:${response.statusText}`)
    }
    const json = await response.json();
    const data = await json.data;
    return data;
    }catch(error){
        console.error(error);
    }
}

const init = async (number,name) => {
    showLoading();
    try{
        console.log(number,name);
        const result = await fetchData();
        if(!result){
            return;
        }
        renderList(result);
    }catch(error){
        console.error(error);
    }finally{
        removeLoading();
    }
}

const modal     = document.getElementById('js-modal');
const openBtn   = document.getElementById('js-open-btn');
const closeBtn  = document.getElementById('js-close-btn');
const submitBtn = document.getElementById('js-submit-btn');

const closeModal  = () => modal.classList.remove('is-show');
const openModal   = () => modal.classList.add('is-show');
const hideOpenBtn = () => openBtn.classList.add('is-hide');
const showOpenBtn = () => openBtn.classList.remove('is-hide');

openBtn.addEventListener('click',() => {
    openModal();
    hideOpenBtn();
}, false);

closeBtn.addEventListener('click',() => {
    closeModal();
    showOpenBtn();
}, false);

submitBtn.addEventListener('click',(event) => {
    event.preventDefault();

    const number  = document.getElementById('js-input-number').value;
    const name    = document.getElementById('js-input-name').value;
    const errMsg  = document.getElementById('js-error-msg');

    /*バリデーション*/
    const errItem = [];
    if(!number.trim()){ 
        errItem.push('数字');
    }
    if(!name.trim()){
        errItem.push('名前');
    }
    if(errItem.length){
        errMsg.className   = "error-msg";
        errMsg.textContent = `${errItem}を入力してください`;
        return;
    }

    init(number,name);
    closeModal();
}, false)
