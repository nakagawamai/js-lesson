
const showLoading = () => {
    const loadingArea     = document.createElement('div');
    const loadingImg      = document.createElement('img');
    loadingArea.id        = "js-loading";
    loadingArea.className = "loading-area";
    loadingImg.src        = "img/loading-circle.gif";
    loadingImg.alt        = "ローディング画像";

    document.body.insertAdjacentElement('afterbegin',loadingArea).appendChild(loadingImg);
}

const removeLoading = () => document.getElementById('js-loading').remove();

const createErrorMessage = (error) => {
    const errMsg       = document.createElement('li');
    errMsg.className   = "error-msg";
    errMsg.textContent = error;
    document.getElementById('js-topics-list').appendChild(errMsg);
    return errMsg;
}

const fetchData = async () => {
    const requestURL = "https://api.json-generator.com/templates/kuSXIyw7OJla/data?access_token=hu4bc7qh9znx2m8f53mn4mz2hryvdntkavwbw8j0";
    try{
        const response   = await fetch(requestURL);
        if(!response.ok){
            console.error(`${response.status}:${response.statusText}`);
            createErrorMessage('現在、サーバーの通信が壊れています');
        }
        const json = await response.json();
        return json;
    }catch(error){
        console.error(error);
    }
}

const init = async () => {
    showLoading();
    try{
        const result = await fetchData();
        if(!result){
            return;
        }
        showContentsArea();
        renderTopics(result);
        renderArticles(result);
        renderImages(result);
        switchTabTopics(result);
    }catch(error){
        console.error(error);
    }finally{
        removeLoading();
    }
}

const showContentsArea = () =>{
    const contentsArea      = document.createElement('section');
    contentsArea.id         = "js-contents-area";
    contentsArea.className  = "contents-area";

    document.getElementById('js-topics-list')
    .insertAdjacentElement('afterend',contentsArea);
}

const renderTopics = (result) => {
    const topicsArea     = document.getElementById('js-topics-list');
    const fragmentTopics = document.createDocumentFragment();
    for (const topics of result){
        const category     = document.createElement('li');
        const categroyLink = document.createElement('a');
        category.classList.add('topics-list__item');
        categroyLink.textContent = topics.categories;
        fragmentTopics.appendChild(category).appendChild(categroyLink);
    }
    topicsArea.appendChild(fragmentTopics);
}

const renderImages = (result) => {
    const contentsArea  = document.getElementById('js-contents-area');
    const imageArea     = document.createElement('div');
    imageArea.className = "contents-item topics-img";

    const fragmentTopicImg = document.createDocumentFragment();
    for (const topics of result){
        const topicsImg = document.createElement('img');
        topicsImg.id    = `${topics.categories + '-img' }`;
        topicsImg.src   = topics.picture;
        topicsImg.classList.add('topics-img__item');
        fragmentTopicImg.appendChild(topicsImg);
    }
    contentsArea.appendChild(imageArea).appendChild(fragmentTopicImg);
}

const showNewIcon = () => {
    const newIcon       = document.createElement('span');
    newIcon.className   = "new-icon";
    newIcon.textContent = "New";
    return newIcon;
}

const showCommentIcon = () => {
    const commentIcon     = document.createElement('img');
    commentIcon.src       = "img/comment-dots-solid.svg";
    commentIcon.className = "comment-icon";
    return commentIcon;
}

const showCommentNumber = (commentLength) => {
    const commentNumber       = document.createElement('span');
    commentNumber.textContent = commentLength;
    commentNumber.className   = "comment-number";
    return commentNumber;
}

const renderArticles = (result) => {
    const contentsArea    = document.getElementById('js-contents-area');
    const articleArea     = document.createElement('div');
    articleArea.className = "contents-item articles";

    const fragmentAritcle = document.createDocumentFragment(); 
    for (const topics of result){
        const articleList = document.createElement('ul');
        articleList.id    = `${topics.categories + "-articles"}`;
        articleList.classList.add('article-list');

        const articles = topics.articles;
        for( article of articles ){
            const articleItem   = document.createElement('li');
            const articleLink   = document.createElement('a'); 
            articleItem.classList.add('article-list__item');
            articleLink.textContent  = article.title;

            const commentLength = article.comment.length; 
            const articleDateMs = new Date(article.date).getTime();
            const periodDayMs   = new Date().getTime() - (7*24*60*60*1000);


            if(periodDayMs < articleDateMs){
                articleLink.appendChild(showNewIcon());
            }
            
            if(commentLength > 0){
                articleLink.appendChild(showCommentIcon());
                articleLink.appendChild(showCommentNumber(commentLength));
            }

            fragmentAritcle.appendChild(articleList).appendChild(articleItem).appendChild(articleLink);
        };
    }
    contentsArea.appendChild(articleArea).appendChild(fragmentAritcle);    
}

const switchTabTopics = (result) => {
    const tabTopics   = document.getElementsByClassName('topics-list__item');
    const topicsImg   = document.getElementsByClassName('topics-img__item');
    const articleList = document.getElementsByClassName('article-list');
    
    /*初期表示*/
    const index = result.findIndex(value => value.isActive == true);
    if(index){
        tabTopics[index].classList.add('is-active');
        topicsImg[index].classList.add('is-active');
        articleList[index].classList.add('is-active');
    }

    for (topic of tabTopics ){
        topic.addEventListener('click',function (){
        const tabTopicsIsShow = document.getElementsByClassName('topics-list__item is-active');
        const topicsImgIsShow = document.getElementsByClassName('topics-img__item is-active');
        const articleIsShow   = document.getElementsByClassName('article-list is-active');

        const arrayTabs = Array.prototype.slice.call(tabTopics);
        const index = arrayTabs.indexOf(this);

        tabTopicsIsShow[0].classList.remove('is-active');
        this.classList.add('is-active');

        topicsImgIsShow[0].classList.remove('is-active');
        topicsImg[index].classList.add('is-active');

        articleIsShow[0].classList.remove('is-active');
        articleList[index].classList.add('is-active');
        });
    }
}

init();
