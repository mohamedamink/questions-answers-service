import "./index.css";

import axios from "axios";
import React from "react";
import moment from "moment";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      product_id: 12010,
      body: "",
      name: "",
      email: "",
      answerBody: "",
      showAnswerInput:false,
      showQuestionInput: false,
      answererName: "",
      answererEmail: "",
      currentQuestionId:0,
      showTwo: 2,
      inputSearch: "",
      beginSearsh: false
    };
    this.handelChange = this.handelChange.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
    this.loadTwo = this.loadTwo.bind(this);
    this.handelChangeSearch = this.handelChangeSearch.bind(this);
  }

  handelChange(e) {
    console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  }

  handelChangeSearch(e) {
    console.log(e.target.value)
    if(e.target.value.length > 3) {
      this.setState({ beginSearsh: true });
    } else {
      this.setState({ beginSearsh: false });
    }
    this.setState({ inputSearch: e.target.value });
  }

  componentDidMount() {
    //console.log('service mounted')
    this.fetchData();
  }

  fetchData() {
    axios.get("/questions/" + this.state.product_id).then((response) => {
      console.log(response.data.results);
      this.setState({ questions: response.data.results });
      // console.log(questions);
    });
  }

  putHelpfull(question_id) {
    //console.log(question_id);
    let apiUrl = "/qa/questions";

    // let question_id=56820
    //sends the id and new author/text to our api
    axios
      .put(`${apiUrl}/${question_id}/helpful`, {})
      .then((response) =>{ 
        
        this.fetchData();} )
  }

  putHelpfullAnswer(id) {
    //console.log(id);
    let apiUrl = "/qa/answers";
    axios
      .put(`${apiUrl}/${id}/helpful`, {})
      .then((response) =>{this.fetchData();} );
  }

  addQuestion() {
    const data = {
      body: this.state.body,
      name: this.state.name,
      email: this.state.email,
      product_id: this.state.product_id,
    };
    axios
      .post("/qa/questions", data)
      .then(() => {
        this.fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  AddAnswer() {
    const data = {
      body: this.state.answerBody,
      name: this.state.answererName,
      email: this.state.answererName+'@gmail.com',
    };
    console.log ("aswer to "+this.state.currentQuestionId)
    axios
      .post("/qa/questions/"+this.state.currentQuestionId+"/answers", data)
      .then(() => {
        
        this.setState ({
          showAnswerInput:false
        })
        this.fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  showQuestion (){
    console.log('clicked')
    this.setState ({
      showQuestionInput:true, 
    })
  }

showAnwswer (QId){
  console.log(QId,'clicked')
  this.setState ({
    showAnswerInput:true,
    currentQuestionId:QId
  })
}
  // answersDisplay(answers) {
  //   let arr = [];
  //   for (let key in answers) {
  //     arr.push(
  //       <div key={key}>
  //         <span className="text-black font-bold ">A:</span>{" "}
  //         <span className="text-xs  font-normal font-sans space-y-7"> {answers[key].body}</span><br></br>
  //         <span onClick={()=>{this.putHelpfullAnswer(answers[key].id)}} className="text-xs font-thin font-sans space-y-7">
  //           helpful? Yes ({answers[key].helpfulness}) |{" "}
  //         </span>
  //         <span className="text-xs font-thin "> by {answers[key].answerer_name}</span>
  //         <span className="text-xs font-thin">
  //         {" "}at {moment(answers[key].date).format("MMM Do YY")}{" "}
  //                 </span>{" "}
  //         <span className="text-xs font-thin">|{" "}Report</span>

  //       </div>
  //     );
  //   }
    
  //   return arr;
  // }

  loadTwo() {
    console.log('im loead')
    this.setState({
      showTwo: this.state.showTwo + 2
    })
  }

  render() {
    return (
      < div className="container mx-auto">
        <div className="pl-96 font-sans space-y-2.5 ext-9xl">
          <div>Questions and Answers</div>
          </div>
          <div>
          <div className="grid justify-items-center p-8">
  <div className="bg-white flex items-center rounded-full shadow-xl w-4/5">
    <input value={this.state.inputSearch} onChange={this.handelChangeSearch} className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none" type="text" placeholder="“Have a question? Search for answers…" />
    
    <div className="p-4">
      <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
</svg>
        </div>
      </button>
      </div>
    </div>
  
</div>
            
          </div>
<div className=" grid-cols-1 ml-20 ">
        <div>
        
          
          {this.state.questions.sort((a, b) => (a.question_date > b.question_date) ? -1 : 1).filter((ele, ind) => ind < this.state.showTwo && 
              (!this.state.beginSearsh || ele.question_body.includes(this.state.inputSearch)) ).map((ques, i) => {
            return (
              <div key={i}>
                <div className="text-black font-bold flex">
                  <div className="order-1 font-sans space-y-7"> Q: {ques.question_body}</div>
                  
                  <span
                    className="order-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    onClick={() => this.putHelpfull(ques.question_id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>{" "}
                    {ques.question_helpfulness}
                  </span>
                  <div className="order-3">|</div>
                  
                  <div  onClick={() => this.showAnwswer(ques.question_id)} className="order-4 text-xs font-thin leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {"Add answer "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                
          <h6
                  className="text-xs font-thin font-sans space-y-7"
                  onClick={() => this.putHelpfull(ques.question_id)}
                >
                  <span>by {ques.asker_name}</span>,{" "}
                  <span>
                    at {moment(ques.question_date).format("MMM Do YY")}{" "}
                  </span>{" "}
                </h6>
                {/* <h4> {this.answersDisplay(ques.answers).filter((ele, ind) => ind < 2)}</h4> */}
                
                {
                Object.values(ques.answers).filter((ele, ind) => ind < 2).map((answer, index) => {
                  
                return(
                  
                  <div key={index} >
                <h4>
              <span className="text-black font-bold ">A:</span>{" "}
              <span className="text-xs  font-normal font-sans space-y-7"> {answer.body}</span><br></br>
              <span onClick={()=>{this.putHelpfullAnswer(answer.id)}} className="text-xs font-thin font-sans space-y-7">
                helpful? Yes ({answer.helpfulness}) |{" "}
              </span>
              <span className="text-xs font-thin "> by {answer.answerer_name}</span>
              <span className="text-xs font-thin">
              {" "}at {moment(answer.date).format("MMM Do YY")}{" "}
                      </span>{" "}
              <span className="text-xs font-thin">|{" "}Report</span>

        </h4> 
        
                  </div>
                )
                })
              
                
                }
                {/* */}
                <br></br>
                <div className="text-xs font-thin">LOAD MORE ANSWERS</div>
                
                {this.state.showAnswerInput && ques.question_id == this.state.currentQuestionId ? <div><input
            type="text"
            placeholder="Enter Your Name"
            id="answererName"
            onChange={this.handelChange}
            value={this.state.answererName}
            
          /><input
            type="text"
            placeholder="Add Answer"
            id="answerBody"
            onChange={this.handelChange}
            value={this.state.answerBody}
            
          />
          <button onClick={() => this.AddAnswer()}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg></button>
          </div> :<div></div>}
                <br></br>
                <br></br>
                
              </div>
            );
          })}
          
        </div>
<div>
  {this.state.showQuestionInput ? <div><input
            type="text"
            placeholder="Ask Question"
            id="body"
            onChange={this.handelChange}
            value={this.state.body}
          />
          <input
            type="text"
            placeholder="enter your name"
            id="name"
            onChange={this.handelChange}
            value={this.state.name}
          />
          <input
            type="text"
            placeholder="email..."
            id="email"
            onChange={this.handelChange}
            value={this.state.email}
          />
          <input
            type="text"
            placeholder="product..."
            id="product_id"
            onChange={this.handelChange}
            value={this.state.product_id}
          />
          <button 
            onClick={() => this.addQuestion()}
            className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-gray-800 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
          >
            ADD A QUESTION +
          </button>
          </div>
           : <div><button 
          onClick={() => this.showQuestion()}
          className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-gray-800 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
        >
          ADD A QUESTION +
        </button></div>}
        
         
          
</div>
          
          <div>
          <button onClick={this.loadTwo} className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-gray-800 py-2 px-4 border border-gray-500 hover:border-transparent rounded">
            MORE ANSWERED QUESTIONS
          </button>
          
        </div>
        
        </div>
        
      </div>
    );
  }
}

