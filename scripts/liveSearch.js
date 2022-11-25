// ПЕРЕМЕННЫЕ
// const
const searchInput = document.querySelector('#search'),
    searcMoneyValue = document.querySelector('#select-money'),
    searchList = document.querySelectorAll('.searchList li')
// let
let searchProductsArr = [],
    searchHtmlCatalog = ''


// фукнция заполнения с индексами продуктов
function findProducts() {
    let productsIndexes = document.querySelectorAll('.product')
    return productsIndexes
}

// привязка и вызов открытия поиска
searchInput.addEventListener('focus', function () {
    document.querySelector('.inputWindow').style.display = 'block'
})
setTimeout(findProducts, 2000)

// рендер продуктов поиска
const renderProducts = async () => {
    const products = await fetch('https://fakestoreapi.com/products')
        .then(res => res.json());

    // сделал через класс потому что че-то не получилось функцией снова   
    class searchProducts {
        render() {
            products.forEach(({ id, title, price, image }) => {
                let obj = {
                    id, title, price, image
                }
                searchProductsArr.push(obj)
            });
        }
    }

    products.forEach(function (elem) {
        const rootSearch = document.querySelector('.searchList')
        let value = searcMoneyValue.value
        let searchElemMoney = ''
        if (value == 'rub') {
            searchElemMoney = `${elem.price} ₽`
        } else {
            searchElemMoney = `${elem.price} $`
        }
        searchHtmlCatalog += `
                <li id="id${elem.id}" onclick="searchInput.value='', document.querySelector('#productsId${elem.id}').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })">
                    <img width="30px" src="${elem.image}" alt="">
                    <div class="search-element-text">
                        <p>${elem.title}</p>
                        <span class="price">${elem.price}</span>
                    </div>
                    
                </li>
                `
        rootSearch.innerHTML = searchHtmlCatalog
        document.querySelector('.inputWindow').style.display = 'none'
    })
    const searchProductsPage = new searchProducts()
    searchProductsPage.render()

    // функция поиска товаров
    searchInput.oninput = function () {
        let val = searchInput.value.trim()
        if (val != '') {
            searchList.forEach(function (elem) {
                if (elem.children[1].innerText.search(RegExp(val, "gi")) == -1) {
                    elem.classList.add('hide')
                } else {
                    elem.classList.remove('hide')
                }
            })
        } else {
            searchList.forEach(function (elem) {
                elem.classList.remove('hide')
            })
        }
    }
}

// закрытие поиска при нажатии вне инпута
window.addEventListener('click', e => {
    const target = e.target
    if (!target.closest('.classList') && !target.closest('#search')) {
        document.querySelector('.inputWindow').style.display = 'none'
    }
})

renderProducts()