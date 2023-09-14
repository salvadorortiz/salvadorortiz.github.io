/* ================== toggle icon navbar ================== */
let menuIcon = document.querySelector('#menu-icon');
let navbar =  document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/* ================== scroll sections active link ================== */

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    /* ================== sticky navbar ================== */

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /* ================== remove toggle icon and navbar when click navbar link (scroll) ================== */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

}

/* ================== scroll reveal ================== */
ScrollReveal({
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .skills-row, .portfolio-box, .contact form', { origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right'});

/* ================== typed js ================== */
const typed = new Typed('.multiple-text',{
    strings: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'],
    typeSpeed: 10,
    backSpeed: 10,
    backDelay: 500,
    loop: true
})

/* ================== contact confirmation and error pop up  ================== */
let popupConfirmation = document.querySelector('#confirmation-popup');
let popupError = document.querySelector('#error-popup');
let errorDetails = document.getElementById('error-details')
let form = document.getElementById('form');
let submitBtn = document.getElementById('submitBtn');
let ok = document.querySelectorAll('.ok');
let required = document.querySelectorAll('.required');

ok.forEach(el => el.addEventListener('click', event => {
    if(popupConfirmation.classList.contains("open-popup")){
        popupConfirmation.classList.remove("open-popup");
        form.submit();
    }else{
        popupError.classList.remove("open-popup");
    }
}));

required.forEach(el => el.addEventListener('change', event => {
    checkErrors();
}));

/* ================== contact form validation  ================== */

function validateForm(e) {
    e.preventDefault();
    let error = checkErrors();
    if(error !== ""){
        errorDetails.innerHTML = error;
        popupError.classList.add("open-popup");
        return false;
    }
    submitBtn.disabled = true;
    form.removeAttribute("onsubmit")
    popupConfirmation.classList.add("open-popup");
}

const checkErrors = () => {
    let error = "";
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let message = document.getElementById('message');

    if(isEmpty(name.value.trim())) {
        name.classList.add("input-error");
        error += "<li>Full name is required</li>";
    }else{
        name.classList.remove("input-error");
    }

    if(isEmpty(email.value.trim())) {
        email.classList.add("input-error");
        error += "<li>Email address is required</li>";

    }else if(!isEmailValid(email.value.trim())) {
        email.classList.add("input-error");
        error += "<li>Email address is invalid</li>";
    }else{
        email.classList.remove("input-error");
    }

    if(isEmpty(message.value.trim())) {
        message.classList.add("input-error");
        error += "<li>Your message is required</li>";
    }else{
        message.classList.remove("input-error");
    }

    return error;
}

const isEmpty = value => value === '' ? true : false;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
