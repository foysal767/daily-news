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
            <p class="pe-auto" onclick="displayNews('${category.category_id}')"><a href='#' class='text-decoration-none text-black fw-semibold'>${category.category_name}</a></p>
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
        // console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.innerHTML = `
            <div onclick="newsModalId('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn row row-cols-1 row-cols-md-1 g-0">
                <div class="d-flex">
                    <div class="col-4">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-4" alt="..." />
                    </div>
                    <div class="col-8 my-auto">
                        <div class="card-body text-start">
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

const newsModalId = async newsId =>{
    // console.log(newsId)
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsModal(data.data[0])
    
}
const displayNewsModal = modalsId =>{
    console.log(modalsId)
    const newsTitleModal = document.getElementById('newsTitleModal');
    newsTitleModal.innerHTML = '';
    // newsTitleModal.innerText = `${modalsId.title}`;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = '';
    const modalDiv = document.createElement('div');
    modalBody.classList.add('card');
    modalDiv.innerHTML = `
        <img src="${modalsId.image_url ? modalsId.image_url : 'News image not found'}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${modalsId.title ? modalsId.title : 'News title not found'}</h5>
            <p class="card-text">${modalsId.details ? modalsId.details : 'News details not found'}</p>
            <p class="card-text">Author name: ${modalsId.author.name ? modalsId.author.name : 'Author name not found'}</p>
            <p class="card-text">
                <small class="text-muted">Updated ${modalsId.author.published_date ? modalsId.author.published_date:'Last updated not found'}</small>
            </p>
            <p class="card-text">
                <small class="text-muted">Rating: ${modalsId.rating.number ? modalsId.rating.number:'No rating found'}</small>
            </p>
        </div>
    `;
    modalBody.appendChild(modalDiv);
}

loadData('')