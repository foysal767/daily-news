const loadData = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}
const displayCategory = (categories) =>{
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category =>{
        // console.log(category.category_id)
        const categoryLi = document.createElement('li');
        categoryLi.innerHTML = `
            <p onclick="displayNews('${category.category_id}')">${category.category_name}</p>
        `;
        categoriesContainer.appendChild(categoryLi);
    })

}
const displayNews = async categoryId =>{
    // console.log(categoryId)
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllNews(data.data);
}
const displayAllNews = allNews =>{
    // console.log(allNews)
    const allNewsContainer = document.getElementById('all-news-container');
    allNewsContainer.innerHTML = '';
    allNews.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.innerHTML = `
            <div data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn row row-cols-1 row-cols-md-1 g-0 align-middle">
                <div class="d-flex">
                    <div class="col-4">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-4" alt="..." />
                    </div>
                    <div class="col-8 my-auto">
                        <div class="card-body align-middle">
                            <h4 class="card-title">${news.title ? news.title:'Title not found'}</h2>
                            <p class="card-text">${news.details ? news.details.slice(0, 150):'Description not found'}...</p>
                            <div class="card-text d-flex justify-content-between pt-3">
                                <h6> Author Name: ${news.author.name ? news.author.name:'Author name not found'}</h6>
                                <p>View: ${news.total_view ? news.total_view:'View qty. not found'}</p>
                                <button class="btn bg-info text-white">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        allNewsContainer.appendChild(newsDiv);
    })
}

loadData()