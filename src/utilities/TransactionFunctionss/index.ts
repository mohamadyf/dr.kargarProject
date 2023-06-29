import { ShamsiDay, ShamsiMonth } from "./Constants";

//function for getting the key of Data
export function whatIsDateFieldName(obj:any){
    const keys = Object.keys(obj)
    if(keys.includes("request_datetime")){
        return "request_datetime"
    }
    else if(keys.includes("datetime")){
        return "datetime"
    }
    return "created_at"
}

//function for merge all part of json fike to one array
export function mergeTransactionsToOneArray(transData: any){
    let mergedTransData: any[] = [];
    for(let key in transData) {
        transData[key].map((obj:any,index:number)=>{
            const datekey = whatIsDateFieldName(obj)
            let temp = {
                ...obj,
                transType: key,
                [datekey]: new Date(transData[key][index][datekey])
            }
            mergedTransData = [...mergedTransData,temp]
        })
        
    }
    return mergedTransData;
}

//replace english digits with persian digits for input for searching better 
export function replaceEnglishToPresianNumber(str: string){
    const
    persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
    EnglishNumbers  = [/0/g, /1/g, /2/g, /3/g, /4/g, /5/g, /6/g, /7/g, /8/g, /9/g]
      if(typeof str === 'string')
      {
        for(var i=0; i<10; i++)
        {
          str = str.replace(EnglishNumbers[i], persianNumbers[i]);
        }
      }
      return str;
}


//sort the transaction in descent order
export function sortTransActionInTime(transData: any[]){
    return transData.sort((date1,date2)=>{
        return date2[whatIsDateFieldName(date2)]-date1[whatIsDateFieldName(date1)]
    })
}

//function for get Shamsi date from miladi(this function is copy from internet)
export function convertMiladiToShamsi(gy:number, gm:number, gd:number) {
    var g_d_m, jy, jm, jd, gy2, days;
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    jy = -1595 + (33 * ~~(days / 12053));
    days %= 12053;
    jy += 4 * ~~(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
    }
    if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }
    return [jy + '/' + jm + '/' + jd];
}

//function for getting the shasi detail from miladi
export function getShamsiDetailSate(dateParam: string){
    const date = new Date(dateParam);
    const dateString = new Date(date.toDateString())
    const shamsiYear = convertMiladiToShamsi(dateString.getFullYear(),dateString.getMonth()+1,dateString.getDay())[0].split("/")[0]
    const shamsiDay = convertMiladiToShamsi(dateString.getFullYear(),dateString.getMonth()+1,dateString.getDay())[0].split("/")[2]
    const shamsiMonthName = ShamsiMonth[Number.parseInt(convertMiladiToShamsi(dateString.getFullYear(),dateString.getMonth()+1,dateString.getDay())[0].split("/")[1])-1]
    const shamsiDayWeek = ShamsiDay[date.getDay()-1]
    return `${shamsiDayWeek} ${shamsiDay} ${shamsiMonthName} ${shamsiYear}`
}