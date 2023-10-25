document.querySelector('#nickBtn').addEventListener('click', modificarNick)
function modificarNick(){
    let nick = document.querySelector('#nick').value
    if (nick != ""){
        const nickTrim = nick.trim()
        const nickReplace = nickTrim.replaceAll(' ', '-') 
        const nickUpper = nickReplace.toUpperCase()
        document.querySelector('#lugarNick').innerHTML=nickUpper
    }else{
        alert("Nick no válido")
    }
}

document.querySelector('#dataButton').addEventListener('click', function() {
    const data = document.querySelector('#data').value
    const objectDate = new Date('2023-12-17T03:24:00')
    modificaData(data)
    modificaData2(objectDate)
  });
  
function modificaData(data) {
    const parts = data.split('/')
    const year = `20${parts[0]}`
    const dia = `${parts[2]}`
    const meses = `${parts[1]}`
    const mesesEscritos = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    const mes = mesesEscritos[meses - 1]
    return console.log(`${dia} ${mes} ${year} - ${parts[3]}` )
}


function modificaData2(objectDate){
    const year =  objectDate.getFullYear() % 100
    const mes = objectDate.getMonth()+1
    const dia = objectDate.getDate()
    let hours = objectDate.getHours();
    if(hours < 10){
        hours = `0${hours}`
    }
    const minutes = objectDate.getMinutes();
    let seconds = objectDate.getSeconds();
    if(seconds < 10){
        seconds = `0${seconds}`
    }
    return console.log(`${year}/${mes}/${dia}T${hours}:${minutes}:${seconds}`)
}

document.querySelector('#dataButton3').addEventListener('click', function() {
    const dataText = document.querySelector('#data3').value
    dias(dataText)
});


function dias(dataText) {
    // Dividir la cadena de texto en un array utilizando /, T y : como separadores.
    const dateParts = dataText.split(/[\/T:]/);
    console.log(dateParts)
    // Comprobar si se han obtenido 6 partes, lo que indicaría un formato válido.
    if(dateParts.length === 6) {
      // Obtener el año, mes, día, horas, minutos y segundos de las partes.
      const year = 2000 + parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1; // Restamos 1 al mes porque en JavaScript los meses comienzan desde 0 (enero) hasta 11 (diciembre).
      const day = parseInt(dateParts[2]);
      const hours = parseInt(dateParts[3]);
      const minutes = parseInt(dateParts[4]);
      const seconds = parseInt(dateParts[5]);
  
      // Crear un objeto Date con los componentes obtenidos.
      const inputDate = new Date(year, month, day, hours, minutes, seconds);
      const currentDate = new Date();
  
      // Calcular la diferencia de tiempo en milisegundos.
      const timeDifference = currentDate - inputDate;
  
      // Calcular el número de días pasados dividiendo por milisegundos en un día.
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
      return document.querySelector('#pasado').innerHTML = ("Han pasado " + daysDifference); // Retornará el número de días transcurridos desde entonces o un objeto de error si el formato no es válido.
    } else {
      // Si no se obtuvieron 6 partes, indicar un error.
      return {
        error: true,
        missatge: "El formato no és correcte"
      };
    }
} 
  
// Objecte per gestionar les dades a localStorage
var ls = {
    // Mètode per desar les dades a localStorage
    setDades: function (dades) {
      // Converteix l'objecte dades a una cadena JSON
      var dadesJSON = JSON.stringify(dades);
      
      // Emmagatzema la cadena JSON a localStorage amb una clau 'tetris_dades'
      localStorage.setItem('tetris_dades', dadesJSON);
  
      return true;
    },
    
    // Mètode per obtenir les dades des de localStorage
    getDades: function () {
      // Obté les dades emmagatzemades a localStorage amb la clau 'tetris_dades'
      var dadesJSON = localStorage.getItem('tetris_dades');
      
      // Si no hi ha dades emmagatzemades, retorna un objecte buit
      if (dadesJSON === null) {
        return {};
      }
      
      // Converteix la cadena JSON a un objecte JavaScript i el retorna
      return JSON.parse(dadesJSON);
    }
  };
  
  // Exemple de dades
  const dades = {
    partidas: [
      {
        avatar: 'imagen1.png',
        nick: 'MANOLO',
        puntuacion: 124561,
        fecha: '23/12/05T12:12:00'
      },
      {
        avatar: 'imagen2.png',
        nick: 'PEDRA',
        puntuacion: 1561,
        fecha: '23/09/05T13:12:00'
      }
    ],
    ranking: [
      {
        avatar: 'imagen1.png',
        nick: 'MANOLO',
        puntuacion: 124561
      },
      {
        avatar: 'imagen2.png',
        nick: 'PEDRA',
        puntuacion: 1561
      }
    ]
  };
  
  // Exemple d'ús
  ls.setDades(dades); // Desa les dades a localStorage
  var dadesEmmagatzemades = ls.getDades(); // Obté les dades des de localStorage
  console.log(dadesEmmagatzemades);
  
  function registraPartida(partida) {
    // Obté les dades emmagatzemades a localStorage
    var dadesEmmagatzemades = ls.getDades();
  
    // Assegura que l'array 'partidas' existeix
    if (!dadesEmmagatzemades.partidas) {
      dadesEmmagatzemades.partidas = [];
    }
  
    // Afegeix la nova partida a l'array 'partidas'
    dadesEmmagatzemades.partidas.push(partida);
  
    // Desa les dades actualitzades a localStorage
    ls.setDades(dadesEmmagatzemades);
  }
  
  // Exemple de partida a afegir
  var novaPartida = {
    avatar: 'imagen2.png',
    nick: 'PEDRA',
    puntuacion: 1561,
    fecha: '23/09/05T13:12:00'
  };
  
  // Crida la funció per afegir la nova partida
  registraPartida(novaPartida);
  
  // Comprova que el localStorage s'ha actualitzat correctament
  var dadesActualitzades = ls.getDades();
  console.log(dadesActualitzades);
  