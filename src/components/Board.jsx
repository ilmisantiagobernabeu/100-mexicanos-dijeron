  import './estilos/board.css';
  import { useData} from '../DataProvider';
  import './estilos/board.css';
  import { useState, useEffect} from 'react';
  import correctAnswer from './sounds/correct.mp3'
  function Board() {


    const { data, loading } = useData();
    const [rondaActual, Setronda] = useState(0);
    const [currentRonda, setCurrentRonda] = useState(null);
    const [isReveal, setisReveal] = useState(0);
    useEffect(() => {
      if (data && data.Rondas && data.Rondas.length > rondaActual) {
        const cr = data.Rondas[rondaActual];
        setCurrentRonda(cr);
      }
    }, [data, rondaActual]);

    if (loading) {
      return <p>Cargando datos...</p>;
    }

    if (!data) {
      return <p>Datos no disponibles</p>;
    }

    const handleNextClick = () => {
      Setronda((prevRonda) => prevRonda + 1);
      console.log(currentRonda+1)
    };

    


    const handleBackClick = () => {  
      Setronda((prevRonda) => prevRonda - 1);
    }

    
    const revealAnswer = (index,respuesta, puntos) => (event) => {
        const liElement = event.target
        console.log(index,'   ',respuesta,'   ',puntos)
        liElement.textContent = index+1 + '       ' + respuesta + '       ' + puntos
        const wordspacing = '200px'
        const correct = new Audio(correctAnswer)
        // correct.play()
      setisReveal((nextElement) => nextElement + 1);


        liElement.style.wordSpacing = wordspacing
        
    }



    return (
      <div className='Board'>
        {currentRonda ? (
          <>
            <h3>{'Ronda: ' + currentRonda.ronda.toString()}</h3>
            <ul>  

                { Object.entries(currentRonda.respuestas).map(([,valor], index) => (
                  <li key={index} onClick={revealAnswer(index,valor.respuesta,valor.puntuacion)} style={{display:"block"}}>
                        ,
                  </li>
                )
                )}
            </ul>
            <button type="button" className='button right' disabled={ rondaActual === data.Rondas.length - 1  || currentRonda.respuestas.length != isReveal}  onClick={handleNextClick}>Next</button>
            <button type="button" className='button left' disabled={ rondaActual === 0}  onClick={handleBackClick}>Back</button>
          </>
        ) : (
          <p>Ronda no encontrada</p>
        )}
      </div>
    );
  }

  export default Board;
