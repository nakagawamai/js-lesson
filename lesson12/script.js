function showLoadingImg(){
    const div = document.createElement('div');
    const loadingImg = document.createElement('img');
    div.id = "js-loading";
    loadingImg.src = "loading-circle.gif";
    loadingImg.alt = "ローディング画像";
    
    document.body.insertAdjacentElement('afterbegin',div).appendChild(loadingImg);
}

function removeLoadingImg(){
    document.getElementById('js-loading').remove();
}

async function fetchdata(){
    const endpoint = "https://api.json-generator.com/templates/szdgGQcOLXuk/data?access_token=hu4bc7qh9znx2m8f53mn4mz2hryvdntkavwbw8j0";
    const response = await fetch(endpoint);
    //responseがokではないとき
    if(!response.ok){
    throw new Error(`${response.status}:${response.text}`);
    }
    //responseがokのとき
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
        //resultがtrueではないとき
        if (!result) {
            return;
        }
        //resultがtrueのとき
        renderList(result);
    }catch(e){
        document.getElementById('js-list').textContent = e;
        console.error(e);
    }finally{
        removeLoadingImg();
    }
}

const btn = document.getElementById('js-button');
btn.addEventListener('click',function(){
    btn.remove();
    init();
},false);
