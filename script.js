const apiKey='<NEWS_API_KEY>'; 
let url = `https://newsapi.org/v2/everything?q=&pageSize=100&apiKey=${apiKey}`
const constUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=100&apiKey=${apiKey}`
const baseUrl='https://newsapi.org/v2/';
let userUrl;
const searchButton=document.getElementById('searchButton');
searchButton.addEventListener('click',()=>{
    const inputField=document.getElementById('inputField');
    if(inputField.value.length>0){
        userUrl=`https://newsapi.org/v2/everything?q=${inputField.value.toLowerCase()}&pageSize=100&apiKey=${apiKey}`;
        displayNews(userUrl);
    }

})
const input = document.getElementById('inputField');
input.addEventListener('keypress', (event)=> {
    if(event.key === "Enter"){
        userUrl=`https://newsapi.org/v2/everything?q=${inputField.value.toLowerCase()}&pageSize=100&apiKey=${apiKey}`;
        if(input.value.length){displayNews(userUrl);}
    }
})

async function fetchNews(apiurl){
    try{
        const response=await fetch(apiurl);
        const data=await response.json();
        return data.articles;
    }catch(error){
        console.error('Error fetching the news:', error);
    }
}
let i=0;
 async function displayNews(url){ 
    let articles= await fetchNews(url);
    const newsContainer1=document.getElementById('news-article1');
    newsContainer1.innerHTML='';
    const newsContainer2=document.getElementById('news-article2');
    console.log(newsContainer2)
    newsContainer2.innerHTML='';
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        // articleElement.classList.add('news-article');
        articleElement.innerHTML = `
         <a href="${article.url}" target="_blank" class="my-5 " style="color:black">
            <img src="${article.urlToImage}" class="col-12 pt-5 pb-3" alt="News Image">
            <p class="m-3 small font-italic">${new Date(article.publishedAt)}</p>
            <h3 class="pl-3" >${article.title}</h3>
            <p class="pl-3 mb-0">${article.description}
            <div class="bg-dark mx-3 mt-1 w-100" style="height: 2px;"></div>
            </p>
            <!-- <a href="${article.url}" target="_blank" >Read more</a>-->
        </a>
        `;
       if(article.urlToImage){
       if(i%2==0){
        newsContainer1.appendChild(articleElement);
        }
        else{
            newsContainer2.appendChild(articleElement);  
        }
  }
  i++;
    });

}
async function displayCategories() {
    const categoryContainer=document.getElementById('category-container');

    categoryContainer.innerHTML = '';

    let categoryArray = ['Finance', 'Politics', 'Entertainment', 'Sports', 'Crime', 'Business', 'technology', 'lifestyle', 'Health', 'Education']
    let categories = await fetchNews(constUrl);

    while (categoryArray.length > 0) {
        let indexNumber = Math.floor(Math.random() * categoryArray.length);
        let category = categoryArray[indexNumber];
        categoryArray.splice(indexNumber, 1);
        console.log(category);

        let categoryUrl = `https://newsapi.org/v2/everything?q=${category.toLowerCase()}&pageSize=1&apiKey=${apiKey}`;

        try {
            let categoryItems = await fetchNews(categoryUrl);
            categoryItems.forEach(item => {
                let itemUrl = item.url;
                let itemImg = item.urlToImage;
                let itemDate = new Date(item.publishedAt);
                let itemTitle = item.title;

                const categoryCard = document.createElement('div');
                categoryCard.setAttribute('id',`${category}`)
                categoryCard.classList.add('categoryCard', 'col-12', 'mx-0', 'my-2', 'bg-light','d-flex', 'rounded');
                categoryCard.innerHTML =
                    `<a href="#" class="row">
                    <img src="${itemImg}" class="categoryImg h-auto pr-2 rounded">
            <div class="categoryText ">
                <p class="m-1 text-danger font-weight-bold">${category}</p>
                <p class="m-1">${itemTitle}</p>
                <p class="m-1 small font-italic">${itemDate}</p>
            </div></a>`
                // `<h3>${category}</h3>`;
                categoryCard.addEventListener('click',()=>{
                    let newsUrl=`https://newsapi.org/v2/everything?q=${categoryCard.id}&pageSize=10&apiKey=${apiKey}`;
                    displayNews(newsUrl);
                })

                categoryContainer.appendChild(categoryCard);
            });
        }
        catch(error){
            console.error(error);
        }
    }

}
function displayTopicNews()
{
    let topic1 = document.getElementById('topic-1');
    topic1.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic1.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayNews(topicUrl);
    })
    let topic2 = document.getElementById("topic-2");
    topic2.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic2.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayNews(topicUrl);
    })
    let topic3 = document.getElementById("topic-3");
    topic3.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic3.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayNews(topicUrl);
    })
    let topic4 = document.getElementById("topic-4");
    topic4.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic4.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayNews(topicUrl);
    })
    let topic5 = document.getElementById("topic-5");
    topic5.addEventListener('click', ()=> {
        let topicUrl = `https://newsapi.org/v2/everything?q=${topic5.innerHTML.toLowerCase()}&pageSize=10&apiKey=${apiKey}`;
        displayNews(topicUrl);
    })
}


displayNews(constUrl);
displayCategories();
displayTopicNews();
