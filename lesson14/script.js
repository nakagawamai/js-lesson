const showLoadingImg = () => {
    const div        = document.createElement('div');
    const loadingImg = document.createElement('img');
    div.id           = "js-loading";
    loadingImg.src   = "img/loading-circle.gif";
    loadingImg.alt   = "ローディング画像";
    document.body.insertAdjacentElement('afterbegin',div).appendChild(loadingImg);
}

const removeLoadingImg = () => {
    document.getElementById('js-loading').remove();
}

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

const fetchdata = async () => {
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

const init = async (number) => {
    showLoadingImg();
    try{
        console.log(number);
        const result = await fetchdata();
        if(!result){
            return
        }
        renderList(result);
    }catch(error){
        document.getElementById('js-list').textContent = error;
        console.error(error);
    }finally{
        removeLoadingImg();
    }
}

const getInputNumber = () => {
    const inputNumber = document.getElementById('js-input-number');
    return inputNumber.value;
}

const modal      = document.getElementById('js-modal');
const openBtn    = document.getElementById('js-open-btn');
const closeBtn   = document.getElementById('js-close-btn');
const requestBtn = document.getElementById('js-request-btn');

const closeModal     = () => modal.classList.remove('is-show');
const openModal      = () => modal.classList.add('is-show');
const hideOpenBtn    = () => openBtn.classList.add('is-hide');
const showOpenBtn    = () => openBtn.classList.remove('is-hide');

openBtn.addEventListener('click',() => {
    openModal();
    hideOpenBtn();
}, false);

closeBtn.addEventListener('click',() => {
    closeModal();
    showOpenBtn();
}, false);

requestBtn.addEventListener('click',() => {
    const number = getInputNumber();
    if(!number){
        alert('数字を入力してください');
        return;
    }
    init(number);
    closeModal();
}, false);
