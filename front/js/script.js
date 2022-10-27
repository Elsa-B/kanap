//je fais appel à fetch pour l'URL de l'API
fetch ("http://localhost:3000/api/products")
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(data => data.json)
    