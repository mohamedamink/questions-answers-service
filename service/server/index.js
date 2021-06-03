const axios = require("axios");
//const querystring = require("querystring");
//const { response } = require('express');
const express = require("express");
const morgan = require("morgan");
const path = require("path");
//const { json } = require("express");
const app = express();
const port = process.env.PORT || 3003;

app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, "../public")));

app.get("/questions/:id", (req, res) => {
  axios
    .get(
      "https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions?product_id=" +
        req.params.id+"&count=100",
      {
        headers: {
          Authorization: "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",
        },
      }
    )
    .then((response) => {
      //send back the response with received data to the client
      //console.log(response.data)
      res.send(response.data);
    });
});

app.put("/qa/questions/:question_id/helpful/", (req, res) => {
  axios.put("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/" +req.params.question_id +"/helpful",
      {},
      {
        headers: {
          Authorization: "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",
        },
      }
    )
    .then((response) => res.send(response.data));
});

app.put("/qa/answers/:answer_id/helpful", (req, res) => {
  console.log(req.params.answer_id)
  axios.put("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/answers/" +req.params.answer_id +"/helpful",
      {},
      {
        headers: {
          Authorization: "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",
        },
      }
    )
    .then((response) => res.send(response.data));
});

app.post('/qa/questions' ,(req, res) => {
  console.log('heyyyy',req.body);
  const question = {body: req.body.body, name:req.body.name, email:req.body.email}
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions' , req.body
    ,{
      headers: {
        Authorization: "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",
      }
    }
  ).then((response) => {
    console.log(response)
    res.send("created")
  }).catch((err)=> console.error(err))
 })

 app.post('/qa/questions/:question_id/answers' ,(req, res) => {
  console.log('heyyyy',req.body.data);
  const answer = {answerer_name: req.body.answererName,
    body: req.body.body,
    name: req.body.name,
    email: req.body.email}
    console.log('aaaaaaaaaaaaa',answer)
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/'+req.params.question_id +'/answers' , answer
    ,{
      headers: {
        Authorization: "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",
      }
    }
  ).then((response) => {
    console.log(response.data)
    res.send("created")
  }).catch((err)=> console.error(err))
 })

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
