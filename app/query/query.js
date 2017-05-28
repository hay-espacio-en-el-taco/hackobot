var request = require('request');

function QueryProduct(userId,product)
{
   return Promise.all([MercadoLibreSearch(product), AmazonSearch(product), WalMartSearch(product)]);
}

function AmazonSearch(product)
{   var productName;
    var price;
    var url;
    var store = "Amazon";
    if(product.toLowerCase().includes('gtx 1080 ti'))
    {
        productName = "EVGA GeForce GTX 1080 Ti Founders Edition GeForce GTX 1080 TI 11GB GDDR5X - Tarjeta gráfica (NVIDIA, GeForce GTX 1080 TI, 7680 x 4320 Pixeles, 1480 MHz, 1582 MHz, 11 GB)";
        price = 15216.96;
        url = "https://www.amazon.com.mx/EVGA-GeForce-1080-Founders-GDDR5X/dp/B06XH2P8DD/ref=sr_1_1?ie=UTF8&qid=1495934665&sr=8-1&keywords=evga+1080+ti";
    }
    else if(product.toLowerCase().includes('nintendo switch'))
    {
        productName = "Nintendo Switch - Consola, color gris - Edición Estandar - Nacional - Standard Edition";
        price = 8469.00;
        url = "https://www.amazon.com.mx/Nintendo-Switch-Estandar-Nacional-Standard/dp/B01LTI2086/ref=sr_1_1?s=videogames&ie=UTF8&qid=1496003065&sr=1-1&keywords=nintendo+switch";
    }
    else if(product.toLowerCase().includes('cloud stinger gaming headset'))
    {
        productName = "HyperX Cloud Stinger Gaming Headset para PC & PS4 (HX-HSCS-BK/LA)";
        price = 770.61;
        url = "https://www.amazon.com.mx/HyperX-Stinger-Gaming-Headset-HX-HSCS-BK/dp/B01M1EEUGL/ref=sr_1_fkmr0_3?s=videogames&ie=UTF8&qid=1496003177&sr=1-3-fkmr0&keywords=audiofonos+hyper+x";
    }
    else
    {
        return {status:"Error",error:"producto no encontrado"}
    }     
    return {status:"ok",product:{ProductName:productName,Price:price,Store:store,Url:url}}
}

function MercadoLibreSearch(product)
{
    return new Promise((resolve, reject) => {
         request('https://api.mercadolibre.com/sites/MLM/search?q='+product+'&sort=price_desc&limit=1', function (error, response, body) {
            if(error) reject({status:"Error",error:error});
            body = JSON.parse(body);
            if(body.results.length > 0)
                resolve({status:"ok",product:{ProductName:body.results[0].title,Price:body.results[0].price,Store:"Mercado libre",Url:body.results[0].permalink}});
            else resolve({status:"Error",error:"producto no encontrado"});
        });
    });
}

function WalMartSearch(product)
{
    token = process.env.WALMART_TOKEN;
    return new Promise((resolve, reject) => {
         request('http://api.walmartlabs.com/v1/search?query=' + product + '&format=json&apiKey=' + token + '&sort=price&order=desc', function (error, response, body) {
            if(error) reject({status:"Error",error:error});
            body = JSON.parse(body);
            if(body.items && body.items.length > 0)
                resolve( {status:"ok",product:{ProductName:body.items[0].name,Price:(body.items[0].salePrice * 18.51).toFixed(2),Store:"Walt Mart"}});
            else resolve({status:"Error",error:"producto no encontrado"});
        });
    });
}

exports.QueryProduct = QueryProduct