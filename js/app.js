const loadData = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
}
const displayCategory = (catagories) =>{
    const catagoriesContainer = document.getElementById('catagories-container');
    catagories.forEach(catagory =>{
        console.log(catagory.category_name)
        const catagoryLi = document.createElement('li');
        catagoryLi.innerText = `
            ${catagory.category_name}
        `;
        catagoriesContainer.appendChild(catagoryLi);
    })

}
loadData()