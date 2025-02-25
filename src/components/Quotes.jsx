import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { Box, Container, Button, Typography, Paper } from "@mui/material";

function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(undefined);
  let cancel;
  function generate_quotes() {
    setLoading(false);
    setQuotes([]);
    axios({
      method: "GET",
      url: "https://api.quotable.io/quotes/random?limit=9",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setQuotes(res.data);
        setLoading(true);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }

  return (
    <>
      <Container>
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Quotes Generator
          </Typography>
          <Button onClick={generate_quotes} variant="contained" sx={{ my: 4 }}>
            Generate Quotes
          </Button>
          {loading === false && (
            <Typography
              variant="h5"
              sx={{ color: "text.main", textAlign: "center" }}
            >
              Loading...
            </Typography>
          )}
        </Box>
        <div className="quotesDisplay">
          {quotes.map((element) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Paper
                  elevation={2}
                  square
                  sx={{ p: 2 }}
                  style={{
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <Typography sx={{ color: "#555", fontStyle: "italic" }}>
                    "{element.content}"
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: 12,
                      textAlign: "right",
                      mt: 2,
                    }}
                  >
                    -{element.author}
                  </Typography>
                </Paper>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default QuotesPage;
