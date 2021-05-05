const dateFormat = date => {
    date = new Date(date);
    date = date.toDateString();
    date = date.split(' ');
    let [/*dayName*/, monthName, dayDigit, year] = date;
    return `${dayDigit} ${monthName} ${year}`;
};

export default dateFormat;