const loadData = () =>{
    toggleSpinner(true);
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
    .catch(error => console.log(error))
}
const displayCategory = (categories) =>{
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category =>{
        const categoryLi = document.createElement('li');
        categoryLi.classList.add('nav-item');
        categoryLi.classList.add('mx-3');
        categoryLi.innerHTML = `
            <p class="btn btn-primary px-2 py-2 my-auto" onclick="displayNews('${category.category_id}')"><a href='#' class='text-white text-decoration-none text-black fw-semibold'>${category.category_name}</a></p>
        `;
        categoriesContainer.appendChild(categoryLi);
    })
    toggleSpinner(false);
}
const displayNews = async categoryId =>{
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const sortNews = data.data;
        sortNews.sort((a, b) => {
            return b.total_view - a.total_view
        })
        displayAllNews(sortNews);
    }
    catch (error) {
        console.log(error)
    }
}
const displayAllNews = allNews =>{
    const itemsNumber = document.getElementById('items-number');
    itemsNumber.innerText = `${allNews.length ? allNews.length: 'No'} News Items Found`;
    const noData = document.getElementById('no-data');
    if(allNews.length === 0){
        noData.classList.add('d-block');
    } else {
        noData.classList.add('d-none');
    }
    const allNewsContainer = document.getElementById('all-news-container');
    allNewsContainer.innerHTML = '';
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.classList.add('mb-3');
        newsDiv.innerHTML = `
            <div onclick="newsModalId('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn row row-cols-1 row-cols-md-1 g-0">
                <div class="d-md-flex">
                    <div class="col-md-4">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-4" alt="..." />
                    </div>
                    <div class="col-md-8 my-auto">
                        <div class="card-body text-start">
                            <h4 class="card-title">${news.title ? news.title:'Title not found'}</h2>
                            <p class="card-text">${news.details ? news.details.slice(0, 150):'Description not found'}...</p>
                            <div class="card-text d-flex justify-content-between pt-3 my-auto">
                                <div class="d-inline-flex my-auto" style="width: 30%">
                                    <img class="d-none d-sm-block img-thumbnail img-fluid rounded-circle me-2" style="width: 20%; height:20%" src="${news.author.img}">
                                    <h6 class="my-auto">${news.author.name ? news.author.name:'Author name not found'}</h6>
                                </div>
                                <p class="my-auto">View: ${news.total_view ? news.total_view:'View quantity not found'}</p>
                                <button class="btn bg-info text-white">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        allNewsContainer.appendChild(newsDiv);
    })
    toggleSpinner(false);
}

const newsModalId = async newsId =>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsModal(data.data[0])
    }
    catch (error) {
        console.log(error)
    }
    
}
const displayNewsModal = modalsId =>{
    const newsTitleModal = document.getElementById('newsTitleModal');
    newsTitleModal.innerHTML = '';
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = '';
    const modalDiv = document.createElement('div');
    modalBody.classList.add('card');
    modalDiv.innerHTML = `
        <img src="${modalsId.image_url ? modalsId.image_url : 'News image not found'}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${modalsId.title ? modalsId.title : 'News title not found'}</h5>
            <p class="card-text">${modalsId.details ? modalsId.details : 'News details not found'}</p>
            <div>
                <img class="img-thumbnail img-fluid rounded-circle" style="width: 10%; height:10%" src="${modalsId.author.img}">
                <p class="card-text">Author name: ${modalsId.author.name ? modalsId.author.name : 'Author name not found'}</p>
            </div>
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


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadData('')