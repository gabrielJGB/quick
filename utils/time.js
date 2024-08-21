export function formatDateToGMTMinus3(dateString) {

    const date = new Date(dateString);

    
    const offsetDate = new Date(date.getTime() -  60 * 60 * 1000);
    

    const options = {
        weekday: 'short',
        day: 'numeric',
        month: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Formato de 24 horas
        year:'2-digit'
    };


    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(offsetDate);
    const result = formattedDate.replace(',', '').replace(/(\d{1,2}):(\d{2})/, 'a las $1:$2');

    return result;
}


export function formatMillisecondsToTimeString(milliseconds) {

    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h:${minutes}min`;
}


export function formatDateString(dateString) {
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    
    
    return dateString.replaceAll("-","/")




//     const date = new Date(dateString);
//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);


//     const cleanDate = date.toDateString();
//     const cleanToday = today.toDateString();
//     const cleanYesterday = yesterday.toDateString();

//     if (cleanDate === cleanToday) {
//         return "Hoy";
//     } else if (cleanDate === cleanYesterday) {
//         return "Ayer";
//     } else {
//         const dayOfWeek = daysOfWeek[date.getDay()];
//         const day = date.getDate();
//         const month = months[date.getMonth()];
//         return `${dayOfWeek} ${day} de ${month}`;
//     }
}


export const getTimeString = (dateString,diferenciaGMT) => {
    if (!dateString)
        return ""

    const fechaInicio = new Date(dateString);
    
    fechaInicio.setHours(fechaInicio.getHours() + diferenciaGMT);
    const ahora = new Date();
    const diferencia = ahora - fechaInicio;
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const resultado = `${String(horas)}h:${minutos < 10 ? '0' + minutos : minutos}m`;

    return resultado;
}