export function getMonth(num: number) {
    var objDate = new Date();
    objDate.setDate(1);
    objDate.setMonth(num - 1);

    return objDate.toLocaleString('default', { month: "long" });
}

export function getLocalMonthNames() {
    let d = new Date(2000, 0); // January
    let months = [];
    for (let i = 0; i < 12; i++) {
        months.push(d.toLocaleString('default', { month: 'long' }));
        d.setMonth(i + 1);
    }
    return months;
}

export function Console (prop: {log: string}) {
    return (
        console.log(prop.log)
        ,null // ➜ React components must return something 
    )
}