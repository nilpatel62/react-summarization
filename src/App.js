import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    // Make an API call using axios
    axios.post('http://127.0.0.1:8000/summarize', { text: inputText })
      .then((response) => {
        console.log(response.data.summary);
        setResponse(response.data.summary);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
      });
  };

  const textareaStyle = {
    padding: '10px',
    border: '2px solid rgb(0 0 0)',
    borderRadius: '20px',
    resize: 'vertical',
    height: 'auto', // Set initial height to auto
    minHeight: '80px', // Set minimum height
    maxHeight: '200px', // Set maximum height
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    outline: "2px solid transparent",
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100vh',
    // background: "darkgrey",
    background: `url('https://images.unsplash.com/photo-1676298355551-c0008749c420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80')`,
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const buttonStyle = {
    padding: "10px",
    borderRadius: "25px",
    backgroundColor: "white",
    color: "black",
    border: "2px solid #4CAF50",
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    width: "50%",
  }

  const divStyle = {
    margin: "50px",
    flexDirection: 'column',
    alignItems: 'center',
  };

  const pStyle = {
    margin: "100px",
    paddingLeft: "10px",
    fontSize: "15px",
    fontStyle: "oblique",
    color: "white",
   }

  return (
    <div style={containerStyle}>
      <div style={pStyle}>
        <p>Welcome to our summarization tool! Our website provides an efficient and convenient way to summarize text documents, articles, or any other textual content. With just a few clicks, you can generate concise and informative summaries that capture the key points of your input.
        </p>
        <p>Whether you are a student looking to summarize research papers, a professional seeking to extract key insights from articles, or simply someone who wants to get a quick overview of a text, our summarization tool is here to assist you.</p>
        <p>To get started, simply copy and paste your text into the provided text area, or type directly into the input box. Then, click the “Submit” button, and within seconds, you'll receive a concise summary of the text.</p>
        <p>Our summarization tool not only saves you time but also enhances your productivity by providing an efficient way to digest large amounts of information. Try it now and experience the power of effortless summarization!</p>
      </div>
      <div style={divStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <textarea
            value={inputText}
            onChange={handleChange}
            outline-style="solid"
            placeholder="Enter your text"
            rows={15}
            cols={50}
            style={textareaStyle}
            onInput={(event) => {
              event.target.style.height = 'auto'; // Reset height to auto
              event.target.style.height = `${event.target.scrollHeight}px`; // Set height based on content
            }}
          />
          <br />
          <button
            type="submit"
            style={buttonStyle}
            className={isLoading ? 'button loading' : 'button'}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </form>
        <br />
        <textarea
          value={response}
          readOnly
          outline-style="solid"
          placeholder="Response"
          rows={15}
          cols={50}
          style={textareaStyle}
          onChange={() => { }}
        />
      </div>
    </div>
  );
};

export default App;
