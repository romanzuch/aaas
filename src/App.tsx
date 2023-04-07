import './App.css';
import AppComponent from './App.component';
import { QuoteError, QuoteObject } from './helpers/Quote';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
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
            <IconButton color="primary" aria-label="share to twitter" component="label" onClick={() => {
              if (quote != null) {
                const tweet = `${quote!.quote}\n${quote!.character} (${quote!.anime})`;
                tweet.length <= 280 ? appComponent.shareToTwitter(tweet) : console.log("To long to share on twitter!")
              } else {
                console.log("Nothing to share.")
              }
            }}>
              <TwitterIcon />
            </IconButton>
            <IconButton color="primary" aria-label="share to twitter" component="label" onClick={() => {
              if (quote != null) {
                const post = `${quote!.quote}\n${quote!.character} (${quote!.anime})`;
                appComponent.shareToReddit(post, "anime");
              } else {
                console.log("Nothing to share.")
              }
            }}>
              <RedditIcon />
            </IconButton>
            <IconButton color="primary" aria-label="reload new quote" component="label" onClick={() => setReload(true)}>
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
