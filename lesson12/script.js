function showLoadingImg(){
    const loadingImg = document.createElement('img');
    loadingImg.src = "loading-circle.gif";
    loadingImg.alt = "ローディング画像";
    document.getElementById('js-loading').appendChild(loadingImg);
}

function removeLoadingImg(){
    document.getElementById('js-loading').remove();
}



async function getData(){
    showLoadingImg();
    try{
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
    }catch(e){
        document.getElementById('js-list').textContent = e;
        console.error(e);
    }finally{
        removeLoadingImg();
    }
}

async function  renderList(){
    const result = await getData();
    //resultがtrueではないとき
    if (!result) {
        return;
    }
    //resultがtrueのとき
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

const btn = document.getElementById('js-button');
btn.addEventListener('click',function(){
    renderList();
    btn.remove();
},false);
