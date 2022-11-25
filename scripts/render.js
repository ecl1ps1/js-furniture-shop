const rootProducts = document.getElementById('products')
let htmlCatalog = ''


// функция рендера продуктов
if (rootProducts) {
    const renderProducts = async () => {
        const products = await fetch('https://fakestoreapi.com/products')
            .then(res => res.json());
        const productsRender = () => {  // не бей пж за название, не могу уже придумать что-то оригинальное
            products.forEach(({ id, title, image, price }) => {
                htmlCatalog += `
                            <li id="productsId${id}" class="product">
                                <img src='${image}' width='125px' />
                                <p class="lng-offerName">${title}</p>
                                <span class='price'>${price}</span>
                                <div>
                                <button id='${id}' onclick="confirm()" class="buy-offer-btn lng-buy btn">Купить</button>
                                </div>
                            </li>
                            `
            })

            const html = `
                            <h1 class="lng-specialOffers container">Специальные предложения</h1>
                            <ul class = 'basketProducts'>
                                ${htmlCatalog}
                            </ul>
                        `
            rootProducts.innerHTML = html
        }

        // добавление товаров в корзину
        document.addEventListener("click", function (e) {
            if (e.target.classList.contains('buy-offer-btn')) {
                products.forEach(({ id, title, image, price }) => {
                    if (id == e.target.id) {
                        if (localStorage.getItem('basketArr')) {
                            let basketProducts = JSON.parse(localStorage.getItem('basketArr'))
                            basketProducts.push([id, title, image, Number(price)])
                            localStorage.setItem('basketArr', JSON.stringify(basketProducts))
                        } else {
                            let basketProducts = []
                            basketProducts.push([id, title, image, Number(price)])
                            localStorage.setItem('basketArr', JSON.stringify(basketProducts))
                        }
                    }
                })
            }
        });
        productsRender()
    }
    renderProducts()

    // смена валюты товаров 
    function changeMoneyFunc() {
        const moneys = document.querySelectorAll('.price')
        const changeMoney = () => {
            let currencys = moneyValue.value
            if (currencys == 'usd') {
                for (let moneyKey in moneys) {
                    if (moneys[moneyKey].innerHTML) {
                        let newMoney = moneys[moneyKey].innerHTML
                        newMoney = Number(newMoney.replace(/ /g, '').replace('₽', ''))
                        newMoney = Math.round(parseFloat(newMoney) * 100) / 100;
                        newMoney = `${newMoney / 60} $`
                        moneys[moneyKey].innerHTML = newMoney
                    }
                }
            } else if (currencys == 'rub') {
                for (let moneyKey in moneys) {
                    if (moneys[moneyKey].innerHTML) {
                        let newMoney = moneys[moneyKey].innerHTML
                        newMoney = Number(newMoney.replace(/ /g, '').replace('$', ''))
                        newMoney = `${newMoney * 60} ₽`
                        moneys[moneyKey].innerHTML = newMoney
                    }
                }
            }
        }
        moneyValue.addEventListener('change', changeMoney)
        changeMoney()
        changeLanguage()
    }
    setTimeout(changeMoneyFunc, 2000);
}