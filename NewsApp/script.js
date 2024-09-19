const url = "https://newsdata.io/api/1/news?apikey=pub_2501573d5a66fa29132ca8fa301fb38bbf7cc&q=";

window.addEventListener('load',() => fetchNews("online"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    const res = await fetch(`${url}${query}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    if (!articles || !Array.isArray(articles)) return; 

    articles.forEach(articles => {
        if(!articles.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, articles);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, articles){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    newsImg.src = articles.image_url;
    newsTitle.innerHTML = articles.title;   
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.pubDate).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${articles.source_id} : ${date}`;

    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(articles.link, "_blank");
    });
}

let cursorSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    cursorSelectedNav?.classList.remove('active');
    cursorSelectedNav = navItem;
    cursorSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    cursorSelectedNav?.classList.remove('active')
    cursorSelectedNav = null;
})