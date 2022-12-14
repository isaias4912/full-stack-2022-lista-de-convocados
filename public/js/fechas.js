




function fecha(fecha) {
    let fechaPartido = fecha.innerHTML
    let day = `${new Date(fechaPartido).getDate() < 10 ? "0" : ""}${new Date(fechaPartido).getDate()}`;
    let month = `${(new Date(fechaPartido).getMonth() + 1) < 10 ? "0" : ""} ${new Date(fechaPartido).getMonth() + 1}`;
    let year = new Date(fechaPartido).getFullYear();
    console.log(day, month, year)


    fechaPartido.innerHTML = `${year}-${month}-${day}`
    
    return fechaPartido.innerHTML




}


