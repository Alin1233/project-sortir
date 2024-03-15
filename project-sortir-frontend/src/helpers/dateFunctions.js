const formatDateHour = (dateString) => {
    let date = new Date(dateString);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

    return day + "-" + month + "-" + year + " " + hours + ":" + minutes;
}
const formatDate = (dateString) => {
    let date = new Date(dateString);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
   

    return day + "-" + month + "-" + year
}

const dateComparison = (date1, date2, date3) => {
    date1 = new Date (date1).getTime()
    date2 = new Date (date2).getTime()
    date3 = new Date (date3).getTime()

    if (date1 <= date2 && date2 <= date3){
        return true
    }else return false
}

export default {formatDateHour, formatDate, dateComparison}