function sumByDay(D) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const output = {};
    for (let i = 0; i < days.length; i++) {
        output[days[i]] = 0;
    }

    const sortedKeys = Object.keys(D).sort();
    for (let i = 0; i < sortedKeys.length; i++) {
        const key = sortedKeys[i];
        const value = D[key];
        const date = new Date(key);
        const dayOfWeek = days[date.getDay()];
        output[dayOfWeek] += value;

        // If there is a gap in days, fill in the missing days with the mean of the previous and next day
        if (i < sortedKeys.length - 1) {
            const nextKey = sortedKeys[i + 1];
            const nextDate = new Date(nextKey);
            const daysBetween = (nextDate - date) / (1000 * 60 * 60 * 24) - 1;
            for (let j = 1; j <= daysBetween; j++) {
                const missingDate = new Date(date.getTime() + j * 24 * 60 * 60 * 1000);
                const missingDayOfWeek = days[missingDate.getDay()];
                output[missingDayOfWeek] = (value + D[nextKey]) / 2;
            }
        }
    }

    return output;
}

const D = {
    "2020-01-01": 6,
    "2020-01-04": 12,
    "2020-01-05": 14,
    "2020-01-06": 2,
    "2020-01-07": 4,
};

const newD = sumByDay(D);
console.log(newD);
