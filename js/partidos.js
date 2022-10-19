const select1 = document.querySelector('#select1');



const opciones1 = document.querySelector('#opciones1');


const contenidoSelect1 = document.querySelector('#select1 .contenido-select');
const hiddenInput1 = document.querySelector('#inputSelect1');

document.querySelectorAll('#opciones1 > .opcion').forEach((opcion) => {
  opcion.addEventListener('click', (e) => {
    e.preventDefault();
    contenidoSelect1.innerHTML = e.currentTarget.innerHTML;
    select1.classList.toggle('active');
    opciones1.classList.toggle('active');
    hiddenInput1.value = e.currentTarget.querySelector('.titulo'.innerText)



  })
})

select1.addEventListener('click', () => {
  select1.classList.toggle('active');
  opciones1.classList.toggle('active');
})


const select2 = document.querySelector('#select2');



const opciones2 = document.querySelector('#opciones2');


const contenidoSelect2 = document.querySelector('#select2 .contenido-select2');
const hiddenInput2= document.querySelector('#inputSelect2');

document.querySelectorAll('#opciones2 > .opcion').forEach((opcion) => {
  opcion.addEventListener('click', (e) => {
    e.preventDefault();
    contenidoSelect2.innerHTML = e.currentTarget.innerHTML;
    select2.classList.toggle('active');
    opciones2.classList.toggle('active');
    hiddenInput2.value = e.currentTarget.querySelector('.titulo'.innerText)



  })
})

select2.addEventListener('click', () => {
  select2.classList.toggle('active');
  opciones2.classList.toggle('active');
})