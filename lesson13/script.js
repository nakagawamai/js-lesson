function showLoadingImg(){
    const div = document.createElement('div');
    const loadingImg = document.createElement('img');
    div.id = "js-loading";
    loadingImg.src = "img/loading-circle.gif";
    loadingImg.alt = "ローディング画像";
    document.body.insertAdjacentElement('afterbegin',div).appendChild(loadingImg);
}

function removeLoadingImg(){
    document.getElementById('js-loading').remove();
}

async function fetchdata(){
    const endpoint = "https://api.json-generator.com/templates/szdgGQcOLXuk/data?access_token=hu4bc7qh9znx2m8f53mn4mz2hryvdntkavwbw8j0";
    const response = await fetch(endpoint);
    if(!response.ok){
    throw new Error(`${response.status}:${response.text}`);
    }
    const json = await response.json();
    const data = await json.data;
    return data;
}

function renderList(result) {
    const fragment = document.createDocumentFragment();
    const ul = document.getElementById('js-list');
        for(const list of result){
            const li = document.createElement('li');
            const a = document.createElement('a');
            const img = document.createElement('img');
            a.textContent = list.text;
            a.href = `/${list.a}`;
            img.src = list.img;
            img.alt = list.alt;
            fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin',img);
        }
    ul.appendChild(fragment);
}

async function init(){
    showLoadingImg();
    try{
        const result = await fetchdata();
        if (!result) {
            return;
        }
        renderList(result);
    }catch(error){
        document.getElementById('js-list').textContent = error;
        console.error(error);
    }finally{
        removeLoadingImg();
    }
}

function modalWindow(){
    const modal = document.getElementById('js-modal');
    const openButton = document.getElementById('js-open-btn');
    const closeButton = document.getElementById('js-close-btn');
    const requestButton = document.getElementById('js-request-btn');
    
    openButton.addEventListener('click',function(){
        modal.classList.add('is-show');
        openButton.classList.add('is-deactive');
    },false);

    closeButton.addEventListener('click',function(){
        modal.classList.remove('is-show');
        openButton.classList.remove('is-deactive');
    },false);

    requestButton.addEventListener('click', function(){
        modal.classList.remove('is-show');
        init();
    },false);
}

modalWindow();
