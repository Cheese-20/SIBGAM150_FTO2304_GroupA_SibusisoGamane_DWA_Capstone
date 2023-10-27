const returnDate = (date) =>{
    const result = new Date(date)
    const Day = result.getDate();
    const Month = result.getMonth();
    const Year = result.getFullYear(); 

    return (`${Day}/ ${Month}/${Year}`)
 };

export default returnDate