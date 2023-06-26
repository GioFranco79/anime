const fs = require('fs');
const Anime = require('../model/anime');

const readf = () => {
    let oD = [];
    let arrayAnimes = [];
    try {
        const data = fs.readFileSync('./data/anime.json','utf-8');
        if (data.length !== 0){
            oD = JSON.parse(data);
            for (let dato in oD){                
                let animedato = new Anime(parseInt(dato), oD[dato].nombre, oD[dato].genero, oD[dato].año, oD[dato].autor);
                arrayAnimes.push(animedato);
            }
            console.log(arrayAnimes);
        } else {
            console.log('El archivo esta vacio.');
        }     
        return arrayAnimes;
    }catch (error){
        console.log('Lo sentimos, ha ocurrido un error.');
        console.log(error);
    }
}

const writef = (data) => {    
    let files = "{\n";
    for (let i=0; i < data.length; ++i){
        files += `"${data[i].id}": {\n`;        
        files += `    "nombre": "${data[i].nombre}",\n`;
        files += `    "genero": "${data[i].genero}",\n`;
        files += `    "año": "${data[i].año}",\n`;
        files += `    "autor": "${data[i].autor}"\n}`;
        if (i != (data.length - 1)){
            files += ',\n';
        }
    }
    files += '\n}';
    fs.writeFileSync('./data/anime.json', files);
    console.log('El archivo anime.json ha sido guardado.');
}

module.exports = {
    readf,
    writef
}