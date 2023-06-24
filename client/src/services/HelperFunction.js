// capitalize the first word
export function capitalizeFirstLetter(word) {
    if (!word)
        return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// for data formating
export const FormatDate = (date) => {
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return dateFormatter.format(Date.parse(date))
}

// for number formating
export const NumberFormatter = (number) => {
    const options = { style: 'currency', currency: 'ETB' };
    return number.toLocaleString('en-ET', options);
}


