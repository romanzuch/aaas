import { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from "react";
import { QuoteError } from '../helpers/Quote';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AnimeSelectorComponent from './AnimeSelector.component';

export default function AnimeSelector(props: SelectorProps) {
  const [animes, setAnimes] = useState<Array<string>>();
  const [error, setError] = useState<QuoteError>();

  useEffect(() => {
    setAnimes(undefined);
    props.component.returnAnimeList().then((response) => {
        if (response instanceof Array<string>) {
            setAnimes(response);
        } else {
            setError(response);
        }
    })
  }, []);

  return (
    <>
        {
            animes != undefined ? (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={animes}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Animes" />}
                    onChange={(event, value) => {
                        const animeString: string = value === null ? "" : value;
                        console.log(animeString);
                        props.setAnime(animeString);
                    }}
                />
            ) : <></>
        }
    </>
  );
}

interface SelectorProps {
    component: AnimeSelectorComponent,
    setAnime: Dispatch<SetStateAction<string>>;
}