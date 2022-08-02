export function calculateAverage(myData:any, prices:any){
    let averageClosePrice:number = 0;
    let averageOpenPrice:number = 0;

    let iterator = myData.indicators.quote[0].close.values();
    for (let element of iterator) {
        averageClosePrice += element;
    }

    iterator = myData.indicators.quote[0].open.values();
    for (let element of iterator) {
        averageOpenPrice += element;
    }

    let average:number = (averageClosePrice + averageOpenPrice) / 2;
    return average / (prices.length - 1);
}
export function calculateMargin(myData:any, prices:any, average:number) {
    //needs a remake
    let maxim = 0, minim = 999999999;
    let iterator = myData.indicators.quote[0].high.values();
    for (let element of iterator) {
        if(element > maxim)
            maxim = element;
        if(element < minim)
            minim = element;
    }
    //Here I calculate the difference between the maxim and the average
    let diff:number = 1 - average / (prices.length - 1) / ((maxim + minim) / 2);

    let margin = diff * 100;
    console.log("the margin is: " + margin)
    return margin;

}

export   function abbreviateNumber(value:number) {
    let newValue:any = value;
    const suffixes = ["", "K", "M"];
    let suffixNum = 0;
    while (newValue >= 1000 && suffixNum < 3) {
        newValue /= 1000;
        suffixNum++;
    }

    newValue = newValue.toPrecision(3);

    newValue += suffixes[suffixNum];
    return newValue;
}

export function calculateVolume(myData:any){
    const volume = myData.indicators.quote[0].volume.map((volume:number) =>
        abbreviateNumber(volume));
    return volume.slice(-7);
    //console.log(volume);
}
