import './App.css';
import Score from './components/score';
import Board from './components/board';
import { Dataprovider } from './DataProvider';
function App() {
  
  return (

    <Dataprovider>

        <div className="App">
            <Score className='score-total'></Score>
          <main>
            <Score className='score-team1'></Score>
            <Board></Board>
            <Score className='score-team2'></Score>

          
          </main>
        </div>

    </Dataprovider>
  );
}

export default App;
