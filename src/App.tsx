import './App.css';
import AppComponent from './App.component';
import { QuoteError, QuoteObject } from './helpers/Quote';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import Tooltip from '@mui/material/Tooltip';
import AnimeSelector from './components/AnimeSelector';
import AnimeSelectorComponent from './components/AnimeSelector.component';

function App() {
  const [quote, setQuote] = useState<QuoteObject>();
  const [anime, setAnime] = useState<string>('');
  const [error, setError] = useState<QuoteError>();
  const [reload, setReload] = useState<Boolean>();
  const [twitterIsDisabled, setTwitterIsDisabled] = useState<boolean>(false);
  const [redditIsDisabled, setRedditIsDisabled] = useState<boolean>(false);
  const animeSlectorComponent: AnimeSelectorComponent = new AnimeSelectorComponent();
  const appComponent: AppComponent = new AppComponent();

  useEffect(() => {
    setQuote(undefined);
    setError(undefined);
    const animeName = anime === null ? "" : anime;
    appComponent.returnQuote(animeName).then((response) => {
      if (response instanceof QuoteObject) {
        setQuote(response);
        const twitterIsDisabled = (response.quote.length + response.anime.length + response.character.length) > 280;
        setTwitterIsDisabled(twitterIsDisabled);
        setRedditIsDisabled(false);
      } else {
        setError(response);
        setTwitterIsDisabled(true);
        setRedditIsDisabled(true);
      }
    })
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === 'KeyR') {
        setReload(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      setReload(false);
    };
  }, [reload, anime]);
  

  return (
    <div className="App">
      <h1>Anime As A Service</h1>
      <AnimeSelector component={animeSlectorComponent} setAnime={setAnime}/>
      <div className='QuoteContainer'>
        <div className='Quote'>
            <p className='QuoteText'>{
              quote !== undefined ? quote.quote : error?.message
            }</p>
            {
              quote !== undefined ? (
                <div className='QuoteInfo'>
                  <p>{
                  quote !== undefined ? quote.anime : ''
                  }</p>
                  <p>{
                  quote !== undefined ? quote.character : ''
                  }</p>
                </div>
              ) : <></>
            }
          </div>
          <div className='QuoteActionButtons'>
            <Tooltip title='Share to Twitter' placement='right'>
              <IconButton color="primary" disabled={twitterIsDisabled} aria-label="share to twitter" component="label" onClick={() => {
                if (quote !== null) {
                  const tweet = `${quote!.quote}\n\n${quote!.character} (${quote!.anime})`;
                  tweet.length <= 280 ? appComponent.shareToTwitter(tweet) : console.log(twitterIsDisabled);
                } else {
                  console.log("Nothing to share.")
                }
              }}>
                <TwitterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Post on Reddit' placement='right'>
              <IconButton color="primary" disabled={redditIsDisabled} aria-label="share to reddit" component="label" onClick={() => {
                if (quote !== null) {
                  const post = `${quote!.quote}\n\n${quote!.character} (${quote!.anime})`;
                  appComponent.shareToReddit(post, "anime");
                } else {
                  console.log("Nothing to share.")
                }
              }}>
                <RedditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Reload' placement='right'>
              <IconButton color="primary" aria-label="reload new quote" component="label" onClick={() => setReload(true)}>
                <CachedIcon />
              </IconButton>
            </Tooltip>
          </div>
      </div>
    </div>
  );
}

export default App;
