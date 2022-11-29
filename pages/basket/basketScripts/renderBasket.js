// ПЕРЕМЕННЫЕ
// const
const rootBasketProducts = document.querySelector('.basket-products'),
    moneyValue = document.querySelector('#select-money'),
    totalPrice = document.querySelector('.js-total-price'),
    langs = ['en', 'ru'],
    langValue = document.querySelector('#select-lang'),
    logo = document.querySelector('.head-logo'),
    buyBasketProductsC = document.querySelector('.buyBasketProducts')
//   let
let productsArr = JSON.parse(localStorage.getItem('basketArr')),
    totalpriceArr = [],
    summ = 0
// basketArr - массив с товарами в корзине
// рендер элементов корзины
if (productsArr) {
    class basketProducts {
        render() {
            let htmlBasketCatalog = ''
            productsArr.forEach((element) => {
                let id = element[0]
                let name = element[1]
                let img = element[2]
                let price = element[3]
                htmlBasketCatalog += `
                        <li>
                            <div class="image-of-product">
                                <img src="${img}" width="90px" alt="">
                            </div>
                            <p class="name-of-product">${name}</p>
                            <span class="price-of-product price">${price * 60} ₽</span>
                        </li>
                    `
            });

            const htmlBasket = `
                <ul>
                    ${htmlBasketCatalog}
                </ul>
                `
            rootBasketProducts.innerHTML = htmlBasket
        }
    }
    const basketProductsPage = new basketProducts()
    basketProductsPage.render()
}

// переход на главную
function closePage() {
    window.location = './index.html'
}

// смена сссылки на странице корзины
function changeURLLanguage() {
    let lang = langValue.value
    location.href = `${window.location.pathname}#${lang}`
    location.reload()
    langValue.value = lang
}

// смена языка на странице корзины
function changeLanguage() {
    let hash = window.location.hash
    hash = hash.substr(1)
    if (!langs.includes(hash)) {
        location.href = `${window.location.pathname}#en`
        location.reload()
    }
    langValue.value = hash
    document.querySelector('title').innerHTML = langArr['title'][hash]
    for (let key in langArr) {
        let langsKeys = document.querySelectorAll(`.lng-${key}`)
        if (document.querySelectorAll(`.lng-${key}`)) {
            for (let langKey in langsKeys) {
                document.querySelectorAll(`.lng-${key}`)[langKey].innerHTML = langArr[key][hash]
            }
        }
    }

    // смена валюты на странице корзины
    function changeMoneyFunc() {
        const moneys = document.querySelectorAll('.price')
        const changeMoney = () => {
            let currencys = moneyValue.value
            if (currencys == 'usd') {
                for (let moneyKey in moneys) {
                    if (moneys[moneyKey].innerHTML) {
                        let newMoney = moneys[moneyKey].innerHTML
                        newMoney = Number(newMoney.replace(/ /g, '').replace('₽', '').replace('$', ''))
                        newMoney = Math.round(parseFloat(newMoney) * 100) / 100;
                        newMoney = `${newMoney / 60} $`
                        moneys[moneyKey].innerHTML = newMoney
                    }
                }
            } else if (currencys == 'rub') {
                for (let moneyKey in moneys) {
                    if (moneys[moneyKey].innerHTML) {
                        let newMoney = moneys[moneyKey].innerHTML
                        newMoney = Number(newMoney.replace(/ /g, '').replace('$', '').replace('₽', ''))
                        newMoney = `${newMoney} ₽`
                        moneys[moneyKey].innerHTML = newMoney
                    }
                }
            }
        }
        moneyValue.addEventListener('change', changeMoney)
        changeMoney()
    }
    setTimeout(changeMoneyFunc, 3000);
}

// подсчет суммы корзины
function totalPriceFunc() {
    prices = document.querySelectorAll('.price-of-product')
    for (let key = 0; key < prices.length; key++) {
        let productPrice = prices[key].innerHTML
        productPrice = Number(productPrice.slice(0, length - 2))
        totalpriceArr.push(productPrice)
    }
    for (let key in totalpriceArr) {
        summ += totalpriceArr[key]
    }
    if (moneyValue.value == 'usd') {
        summ = summ / 60
        summ.toFixed(1)
        totalPrice.innerHTML = `${summ} $`
    } else if (moneyValue.value == 'rub') {
        summ = summ.toFixed(1)
        totalPrice.innerHTML = `${summ} ₽`
    }
}

// подсчет количества товаров в корзине
function numberGoods() {
    if (productsArr) {
        document.querySelector('.number-goods').innerHTML = productsArr.length
    } else {
        document.querySelector('.number-goods').innerHTML = 0
    }
}

// функция покупки 
function buyBasketProducts() {
    if (document.querySelector('.number-goods').innerHTML == '0') {
        Swal.fire({
            icon: 'error',
            title: 'Корзина пустая',
          })
    } else {
Swal.fire({
        title: 'Вы уверены что хотите приобрести данные товары?',
        text: `true`,
        icon: 'warning',
        cancelButtonText: 'Отмена',
       confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Добавить'
      }).then((result) => {
        if (result.isConfirmed) {
		        localStorage.removeItem('basketArr')
          Swal.fire(
            'Успешно',
            'Вы приобрели выбранные товары',
            'success'
          )
        setTimeout(function() {
        location.reload()
        }, 2000)
        }
      })
    }
     
}

// вызовы функций
setTimeout(totalPriceFunc, 1500);
setTimeout(numberGoods, 1500);
changeLanguage()

// привязка
buyBasketProductsC.addEventListener('click', buyBasketProducts)
moneyValue.addEventListener('change', totalPriceFunc)
moneyValue.addEventListener('change', numberGoods)
logo.addEventListener('click', closePage)
langValue.addEventListener('change', changeURLLanguage)
