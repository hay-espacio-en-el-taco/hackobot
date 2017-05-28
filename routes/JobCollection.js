const query = require('../app/query/query');

exports.Checar_Precio = function(idUsuario,precioActual,consulta) {
return new Promise((resolve,reject) => {
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
			resolve({status:"Barato"});
		}
		else{
			reject({status : "Caro"});
		}

        }).catch(err => { 
            console.log(err);
            reject({status: "error", error : "Algo Paso ven mas tarde"});  
        }); 

	
		
	});
	}
	
