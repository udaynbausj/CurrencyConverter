const request = require('request');


const baseCurrencyApiUrl  = 'http://apilayer.net/api/';
const baseRESTCountriesUrl = 'https://restcountries.eu/rest/v2/';

const getLiveUSDtoOther = async () => {
    const options = {
        url : `${baseCurrencyApiUrl}/live`,
        qs : {
            'access_key' : '****'
        },
        method : 'GET'
    };

    await request(options, (error, response,body) => {
        if(error){
            console.log("Error occured " + error.toString());
        }else{
            console.log(JSON.parse(body));
        }
    });

};

//
// getLiveUSDtoOther().then((result) => {
//     console.log(result);
// }, (err) => {
//     console.log(err);
// });

const getCountryCodeByCountryFullName = async (countryName) => {
    const options = {
        url : `${baseRESTCountriesUrl}name/${countryName}`,
        qs : {
            fullText : true
        },
        method: 'GET'
    };

    await request(options, (error,response,body) => {
        if(error){
            console.log("Error occured : " + error.toString());
        }else{
            if(body.statusCode==='404'){
                console.log("You have entered invalid country ");
                return "Invalid Country name";
            }else{
                console.log(JSON.parse(body)[0].currencies[0].code);
                return "Successfully resolved";
            }
        }
    });
};

//avoid the below method, as this method gets many countries which matches the pattern

const getCountryCodeByCountryName = async (countryName) => {
    const options = {
        url : `${baseRESTCountriesUrl}name/${countryName}`,
        method: 'GET'
    };

    await request(options, (error,response,body) => {
        if(error){
            console.log("Error occured : " + error.toString());
        }else{
            if(body.statusCode==='404'){
                console.log("You have entered invalid country ");
                return "Invalid Country name";
            }else{
                console.log(JSON.parse(body));
                return "Successfully resolved";
            }
        }
    });
};

getCountryCodeByCountryFullName('India').then(() => {
    console.log("Success ");
}, (err) => {
    console.log(err.toString());
});



const convertFromUSDtoOtherCurrency = async (toCountry,amountToConvert) => {
    const options = {
        url : `${baseCurrencyApiUrl}convert`,
        method : 'GET',
        qs : {
            access_key: '*****',
            from : 'USD',
            to : `${toCountry}`,
            amount : `${amountToConvert}`,
            format : 1
        }
    };
    await request(options, (error,response,body) => {
        if(error){
            console.log("Error occured");
        }else{
            console.log(JSON.parse(body));
        }
    });
};


var toCountry = getCountryCodeByCountryFullName('India');
var amountToConvert = 25;//25 dollars


convertFromUSDtoOtherCurrency(toCountry,amountToConvert);
