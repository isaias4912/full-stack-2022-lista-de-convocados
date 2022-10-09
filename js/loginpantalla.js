

const bodyLogin= document.querySelector(".body-car");

bodyLogin.classList.remove("opacity0");
bodyLogin.classList.add("opacity1")

let correo;

function layoutIni(){
    const divEmail = document.querySelector("#divEmail");
    divEmail.classList.add("layoutActive")

}
setTimeout(layoutIni, 1000);


// ---------------------boton siguiente-----------z

document.querySelector("#btnNextPass").onclick = function(){
    
    const correo = document.querySelector("#emailUser").value;
    
    const alertEmailLogin= document.querySelector("#alertEmailLogin")
    

    const spanEmail = document.querySelector("#spanEmail")
    const emailValidar = validarEmail(correo);

    if(!emailValidar){
        alertEmailLogin.innerHTML ='<p style="color:red; font-size: 14px;" >Escribe una direccion de correo electrónico valida</p>';
        alertEmailLogin.style.display="block";

        

    }else {
        alertEmailLogin.style.display="none";
        spanEmail.innerHTML= correo;
        nextLayout("#divEmail", "#divPassword");

    }

    

    

 }


//regresar 
document.querySelector("#btnPrev").onclick= function(){
    prevLayout("#divPassword", "#divEmail" )

}

//recuperar contraseña
document.querySelector("#linkRecoverypass").onclick= function(e){
    e.preventDefault();
    nextLayout("#divPassword", "#divRecoveryPass" )

}
//cancelar olvido contraseña
document.querySelector("#btnCancelar").onclick= function(){
    prevLayout("#divRecoveryPass", "#divPassword" )

}
//enviar de recuperar contraseña
document.querySelector("#btnSendEmail").onclick=function(){
    const sendEmail=document.querySelector("#sendEmail").value;
    const alertSendEmail=document.querySelector("#alertSendEmail");
    const emailValid=validarEmail(sendEmail)
    if(!emailValid){
        alertSendEmail.innerHTML= '<p style="color:red;">Escriba su cuenta de correo</p>'
        alertSendEmail.style.display="block";

    }else{
        alertSendEmail.style.display="none";
        Swal.fire({
            
            position: 'center',
            icon: 'success',
            title:  `Se envió correo a ${sendEmail}`,
            showConfirmButton: false,
            timer: 1500
            
          })

    }

}




function prevLayout(parent, prev){
    const divPadre = document.querySelector(parent);
    const divPrev = document.querySelector(prev);
    divPadre.classList.remove("layoutleft", "layoutright","layoutActive");
    divPrev.classList.remove("layoutleft", "layoutright","layoutActive");

    divPadre.classList.toggle("layoutright");
    divPrev.classList.toggle("layoutActive")

}


function nextLayout(parent, next){
    const divPadre = document.querySelector(parent);
    const divNext = document.querySelector(next);
    divPadre.classList.remove("layoutleft", "layoutright","layoutActive");
    divNext.classList.remove("layoutleft", "layoutright","layoutActive");

    divPadre.classList.toggle("layoutleft");
    divNext.classList.toggle("layoutActive")

}

//validar EMAIL
function validarEmail(email){
    const stringEmail = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if(stringEmail.test(email) == false){
        return false;
    }else if (stringEmail== ""){
        return false;
    }else{
        return true
    }
}




document.querySelector("#btnLogin").onclick = function(){
    const strEmailUser= document.querySelector("#emailUser").value;
    
    const strPass = document.querySelector("#passUser").value;
    const alertPass = document.querySelector("#alertPass");
   

    if(strPass ==""){
        alertPass.innerHTML='<p style="color:red;">Escribe la contraseña</p>';
        alertPass.style.display="block";

    }else {
        alertPass.style.display= 'none';
        Swal.fire({
            
            position: 'center',
            icon: 'success',
            title: 'Login Exitoso, ya puede editar contenido',
            showConfirmButton: false,
            timer: 1500
            
          })
       
                      
            
            setTimeout(function(){
                window.location.href = "../pantallasedicion/indexEdicion.html";
            }, 1000)

    }
    
   

}