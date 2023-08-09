import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Textarea, Text } from "@chakra-ui/react";
import axios from "axios";
import Typewriter from "typewriter-effect/dist/core";
import Header from "./components/header/header";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inpRef = useRef(null);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true

    // Make an API call using axios
    axios
      .post("https://summarization.navajeevan-matrimony.com/summarize", {
        text: inputText,
      })
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

  useEffect(() => {
    if (inpRef.current) {
      const input = inpRef.current;
      var customNodeCreator = function (character) {
        input.placeholder = input.placeholder + character;
        return null;
      };

      var onRemoveNode = function () {
        if (input.placeholder) {
          input.placeholder = input.placeholder.slice(0, -1);
        }
      };
      const typewriter = new Typewriter(null, {
        loop: true,
        delay: 75,
        onCreateTextNode: customNodeCreator,
        onRemoveNode: onRemoveNode,
      });
      typewriter
        .typeString("Enter text to summarize...")
        .pauseFor(2000)
        .deleteAll()
        .typeString("Paste your content here for summarization...")
        .pauseFor(2000)
        .deleteAll()
        .typeString("Input your text for a quick summary...")
        .pauseFor(2000)
        .deleteAll()
        .typeString("Provide the content you'd like us to summarize...")
        .pauseFor(1000)
        .start();
    }
  }, []);

  const textareaStyle = {
    padding: "15px",
    border: "1px solid #444",
    borderRadius: "2px",
    resize: "vertical",
    height: "auto", // Set initial height to auto
    minHeight: "80px", // Set minimum height
    fontSize: "20px",
    fontWeight: 600,
  };

  const containerStyle = {
    // display: 'flex',
    flexDirection: "row",
    outline: "2px solid transparent",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "100vh",
    // background: "darkgrey",
    background: `url('https://images.unsplash.com/photo-1676298355551-c0008749c420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80')`,
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyle = {
    padding: "12px 10px",
    borderRadius: "2px",
    fontSize: "18px",
    backgroundColor: "white",
    border: "1px solid #444",
    // boxShadow:
    //   "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    width: "calc(100% - 25px)",
    cursor: "pointer",
    background: "#222",
    color: "#fff",
    marginRight: "auto",
    fontWeight: 700,
    // marginTop: "20px"
  };

  const divStyle = {
    // margin: "50px",
    display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
  };

  const pStyle = {
    paddingTop: "20px",
    marginBottom: "20px",
    fontSize: "18px",
    color: "white",
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Container maxW="88vw">
        <Box>
          <div style={pStyle}>
            <p>
              Welcome to our summarization tool! Our website provides an
              efficient and convenient way to summarize text documents,
              articles, or any other textual content. With just a few clicks,
              you can generate concise and informative summaries that capture
              the key points of your input.
            </p>
            <p>
              Whether you are a student looking to summarize research papers, a
              professional seeking to extract key insights from articles, or
              simply someone who wants to get a quick overview of a text, our
              summarization tool is here to assist you.
            </p>
            <br />
            <p>
              To get started, simply copy and paste your text into the provided
              text area, or type directly into the input box. Then, click the
              “Submit” button, and within seconds, you'll receive a concise
              summary of the text.
            </p>
          </div>
          <div style={divStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
              <Textarea
                value={inputText}
                onChange={handleChange}
                // placeholder="Enter your text or paste here"
                ref={inpRef}
                // rows={20}
                // cols={40}
                height="360px"
                bg="#fff"
                style={{
                  ...textareaStyle,
                  height: "360px",
                  width: "400px",
                  marginRight: "25px",
                }}
                _focusVisible={{
                  border: "none",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={buttonStyle}
                className={isLoading ? "button loading" : "button"}
              >
                {isLoading ? "Loading..." : "Summarize"}
              </button>
            </form>

            <Textarea
              value={response}
              readOnly
              outline-style="solid"
              placeholder={`Once clicked on "Summarize" button, it will generate Summary response here. Go ahead and try now!`}
              bg="#fff"
              style={{ ...textareaStyle, height: "360px" }}
              onChange={() => {}}
              _focusVisible={{
                border: "none",
                outline: "none",
              }}
            />
          </div>
        </Box>
        <div style={{ ...pStyle, marginBottom: "0px" }}>
          <br />
          <Text fontWeight={700}>
            Our summarization tool not only saves you time but also enhances
            your productivity by providing an efficient way to digest large
            amounts of information. Try it now and experience the power of
            effortless summarization!
          </Text>
          <br />
        </div>
      </Container>
    </div>
  );
};

export default App;
