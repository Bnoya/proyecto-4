let submit = document.getElementById('submit');
console.log('javastart')
submit.addEventListener('click', (e) => {
    e.preventDefault();
    let user = document.getElementById('username');
    let pass = document.getElementById('password');
    console.log(user.value);
    console.log(pass.value);

});