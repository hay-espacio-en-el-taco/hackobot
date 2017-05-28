var request = require('request');
const query = require('../app/query/query');

exports.Checar_Precio = function(idUsuario,precioActual,consulta) {
	query.QueryProduct(idUsuario,consulta)
	.then(values => {         
            values = values.filter(item => {
                return item.status == "ok"
            });

            values = values.sort( (a, b) => {
                if (a.price > b.price) {
                    return 1;
                }
                if (a.price < b.price) {
                    return -1;
                }
                return 0 
            });

		if (values[0]!== null && values[0].product.Price < precioActual) {
			request.post("https://tacobotapi.herokuapp.com/messageTrigger",{
				form: {msg: "Tu producto " + consulta + " ahora esta mas barato, de: $ " + precioActual + "a: $ " + values[0].product.Price + " Ahora para agradecerme alimentame" ,id: idUsuario
			}},function(error,response,body){
				if(error){
				console.log(error);
				}
			});
		}
		else{
			console.log("caro");
		}

        }).catch(err => { 
            console.log(err);  
        }); 

	
		
	}
	
