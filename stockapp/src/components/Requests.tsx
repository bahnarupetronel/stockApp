export const fetchCompanyName = async(companyName:string) => {
    const axios = require("axios").default;
    const options = {
        method: 'GET',
        url: `https://yfapi.net/v6/finance/autocomplete?region=US&lang=en&query=${companyName}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
            'x-api-key': 'OmFnDkbvfW7KeMAfc5I2d8IYYDT26XmQ8ToLD6la'
        }
    };
    //ResultSet.Result[0]
    return await axios.request(options).then(function (response:any) {
        return response.data;
        /*
        //console.log(response.data.ResultSet.Result[0].symbol);
        setSymbol(response.data.ResultSet.Result[0].symbol)
        setCompanyName(response.data.ResultSet.Result[0].name.split(' ')[0])
        setDataIsLoaded(true)
        // setCompanyData(response.data)*/
    }).catch(function (error:any) {
        console.error(error);
    });
}

export const fetchRecommendations = async(symbol:string) => {
    const axios = require("axios").default;
    const options = {
        method: 'GET',

        url: `https://yfapi.net/v6/finance/recommendationsbysymbol/${symbol}`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
            'x-api-key': 'OmFnDkbvfW7KeMAfc5I2d8IYYDT26XmQ8ToLD6la'
        }
    };

     return await axios.request(options).then(function (response: any) {
         /*
        console.log("----------request recommendations------------")
        console.log(response.data)
        console.log("----------------------")
          */
        return response.data;
    }).catch(function (error: any) {
        console.error(error);
    });
}

export const fetchCompanyData = async(symbol:string, interval:string, range:string) =>  {
    const axios = require("axios").default;
    const options = {
        //url: `https://yfapi.net/v8/finance/chart/${companySymbol}?range=${range}&region=US&interval=${timeStamp}&lang=en&events=div%2Csplit`,
        url: `https://yfapi.net/v8/finance/chart/${symbol}?range=${range}&region=US&interval=${interval}&lang=en&events=div%2Csplit`,
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
            'x-api-key': 'OmFnDkbvfW7KeMAfc5I2d8IYYDT26XmQ8ToLD6la'
        }
    };

    return await axios.request(options).then(function (response:any) {
        return response.data;

    }).catch(function (error:any) {
        console.error(error);
    });
}