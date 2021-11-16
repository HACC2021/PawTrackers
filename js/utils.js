function time_since(time_str) {
    const timestamp = Date.parse(time_str)
    const curr_timestamp = Date.now()
    let diff = null;
    let prefix = "";
    let suffix = "";
    if (curr_timestamp > timestamp) {
        diff = new Date(curr_timestamp - timestamp);
        suffix = " ago"
    } else {
        diff = new Date(timestamp - curr_timestamp);
        prefix = "In ";
    }

    let time = "";
    if (diff.getYear() >= 70) time = `${diff.getDate()} days`;
    else if (diff.getHours() > 0) time = `${diff.getHours()} hrs`
    else time = `${Math.max(1,diff.getMinutes())} mins`


    return `${prefix}${time}${suffix}`
}