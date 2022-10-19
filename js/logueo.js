let texto = document.querySelector('.text');




function registro() {
  window.location.href = "../pantallas/login.html";
}

function edicion() {
  window.location.href = "../pantallasedicion/indexEdicion.html"
}

function eliminar() {
  Swal.fire({
    title: 'Esta Seguro?',

    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Jugador Eliminado!',
        'El jugador ya no formara parte del equipo.',
        'success'
      )
    }
  })

}
function eliminarP() {
  Swal.fire({
    title: 'Esta Seguro?',

    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Partido Eliminado!',
        'ya se elimino  del partido.',
        'success'
      )
    }
  })

}













const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const img = document.querySelector(".imgjug");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive() {
  defaultBtn.click();
}
defaultBtn.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    texto.style.display="none";
    const reader = new FileReader();
    reader.onload = function () {
      const result = reader.result;
      img.src = result;
      wrapper.classList.add("active");

    }
    cancelBtn.addEventListener("click", function () {
      img.src = "";
      wrapper.classList.remove("active");
    })
    reader.readAsDataURL(file);
  }
  if (this.value) {
    let valueStore = this.value.match(regExp);
    fileName.textContent = valueStore;
  }
});



/*
funcionalidad eleccion paises partidos

*/





