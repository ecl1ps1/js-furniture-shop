const moneyValue = document.querySelector('#select-money')
langValue = document.querySelector('#select-lang'),
    langs = ['en', 'ru'],
    closeLogin = document.querySelector('.close-menu'),
    loginMenu = document.querySelector('.login-menu'),
    loginWindow = document.querySelector('.login-window'),
    closeButton = document.querySelector('.close-menu'),
    loginBtn = document.querySelector('.lng-login1'),
    openLoginMenu = document.querySelector('.lng-login'),
    loginInput = document.querySelector('.login-input'),
    passwordInput = document.querySelector('.password-input'),
    name = document.querySelector('.name'),
    profile = document.querySelector('.profile'),
    signOutBtn = document.querySelector('.lng-leave'),
    basketCount = document.querySelector('.basket-counter'),
    confirmWin = document.querySelector('.confirm-window'),
    main = document.querySelector('.main'),
    openBasketBtn = document.querySelector('.open-basket-button'),
    logo = document.querySelector('.logo')
let basketArr = []

// функция обновления счетчика корзины
function updateBasket() {
    if (localStorage.getItem('basketArr')) {
        let basketProducts = JSON.parse(localStorage.getItem('basketArr')).length
        basketCount.innerHTML = basketProducts
    }
}
updateBasket()

// закрытие меню авторизации
function closeMenu() {
    loginMenu.style.display = 'none'
}

// открытие меню авторизации
function openMenu() {
    loginMenu.style.display = 'flex'
}
document.querySelector('.login').addEventListener('click', openMenu)
document.querySelector('.close-menu').addEventListener('click', closeMenu)


// смена ссылки 
function changeURLLanguage() {
    let lang = langValue.value
    location.href = `${window.location.pathname}#${lang}`
    location.reload()
    langValue.value = lang
}

// смена языка сайта
function changeLanguage() {
    let hash = window.location.hash
    hash = hash.substr(1)
    if (!langs.includes(hash)) {
        location.href = `${window.location.pathname}#en`
        location.reload()
    }
    langValue.value = hash
    document.querySelector('title').innerHTML = langArr['title'][hash]
    if (hash == 'ru') {
        document.querySelector('#search').placeholder = 'Поиск'
    } else if (hash == 'en') {
        document.querySelector('#search').placeholder = 'Search'
    }
    for (let key in langArr) {
        let langsKeys = document.querySelectorAll(`.lng-${key}`)
        if (document.querySelectorAll(`.lng-${key}`)) {
            for (let langKey in langsKeys) {
                document.querySelectorAll(`.lng-${key}`)[langKey].innerHTML = langArr[key][hash]
            }
        }
    }
}
changeLanguage()

// авторизация
function authorization() {
    let login = loginInput.value
    let password = passwordInput.value
    let trueLogin = 'og123',
        truePassword = 'ILoveJump999'
    if (login === trueLogin && password === truePassword) {
            openLoginMenu.style.opacity = '0'
            closeMenu()
            document.querySelector('.name').innerHTML = login
            profile.style.display = 'flex'   
    } else {
        alert('Неверный логин или пароль')
        loginInput.value = ''
        passwordInput.value = ''
    }

}

// выход из аккаунта
function signOut() {
    profile.style.display = 'none'
    openLoginMenu.style.opacity = '1'
    loginInput.value = ''
    passwordInput.value = ''
}

// функция добавления элемента в корзину
function onbasket(num) {
    let value = Number(basketCount.innerHTML)
    value++
    basketCount.innerHTML = value
    updateBasket()
    confirmWin.style.display = 'none'
}

// подтверждение добавления
function confirm() {
    confirmWin.style.display = 'block'
}

// отмена добавления
function closeConfirm() {
    confirmWin.style.display = 'none'
    main.style.opacity = '1'
    updateBasket()
    if (basketCount == 0) {
    } else {
        basketCount.value -= 1
        updateBasket()
    }
}

// открытие меню корзины
function openBasketMenu() {
    window.location = './basket.html'
}

langValue.addEventListener('change', changeURLLanguage)
closeLogin.addEventListener('onclick', closeMenu)
openBasketBtn.addEventListener('click', openBasketMenu)
loginBtn.addEventListener('click', authorization)
signOutBtn.addEventListener('click', signOut)

// 'login' 'close-menu'