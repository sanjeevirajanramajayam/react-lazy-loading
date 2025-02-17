import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Button, Typography, Grid2, Paper } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(undefined);
  let cancel
  function generate_books() {
    setLoading(false);
    setBooks([]);
    axios({
      method: 'GET',
      url: 'https://dummyjson.com/quotes',
      cancelToken: new axios.CancelToken((c => cancel = c))
    }).then(res => { setBooks(res.data.quotes); setLoading(true); console.log(res.data); }).catch(e => {
      if (axios.isCancel(e)) return
    })
    return () => cancel()
  }

  return (
    <>
      <Container>
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>Quote Generator</Typography>
          <Button onClick={generate_books} variant="contained" sx={{ my: 4 }}>Generate Quotes</Button>
          {loading === false && <Typography variant="h5" sx={{ color: 'text.main', textAlign: 'center' }}>Loading...</Typography>}
        </Box>
        <div className="quotesDisplay">
          {books.map((element, index) => (
            <>
              <Paper elevation={10} rounded sx={{p: 2}}>
                <Typography sx={{ color: 'text.main'}}>
                  {element.quote}
                </Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                  -{element.author}
                </Typography>
              </Paper>
            </>
          ))}
        </div>

        {/* <div className="quotesDisplay">
          {books.map((element, index) => (<div className="quote">{element.quote}</div>))}
        </div> */}
      </Container>
    </>
  )
}

export default Books