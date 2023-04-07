import './App.css';
import AppComponent from './App.component';
import { QuoteError, QuoteObject } from './helpers/Quote';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import AnimeSelector from './components/AnimeSelector';
import AnimeSelectorComponent from './components/AnimeSelector.component';

function App() {
  const [quote, setQuote] = useState<QuoteObject>();
  const [anime, setAnime] = useState<string>('');
  const [error, setError] = useState<QuoteError>();
  const [reload, setReload] = useState<Boolean>();
  const animeSlectorComponent: AnimeSelectorComponent = new AnimeSelectorComponent();
  const appComponent: AppComponent = new AppComponent();

  useEffect(() => {
    setQuote(undefined);
    setError(undefined);
    const animeName = anime === null ? "" : anime;
    appComponent.returnQuote(animeName).then((response) => {
      if (response instanceof QuoteObject) {
        setQuote(response);
      } else {
        setError(response);
      }
    })
    setReload(false);
  }, [reload, anime]);
  

  return (
    <div className="App">
      <h1>Anime As A Service</h1>
      <AnimeSelector component={animeSlectorComponent} setAnime={setAnime}/>
      <div className='QuoteContainer'>
        <div className='QuoteHeader'>
          <p className='Quote'>{
            quote != undefined ? quote.quote : error?.message
          }</p>
          <div className='QuoteReload'>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => setReload(true)}>
              <CachedIcon />
            </IconButton>
          </div>
        </div>
        {
          quote != undefined ? (
            <div className='QuoteInfo'>
              <p>{
              quote != undefined ? quote.anime : ''
              }</p>
              <p>{
              quote != undefined ? quote.character : ''
              }</p>
            </div>
          ) : <></>
        }
      </div>
    </div>
  );
}

export default App;
