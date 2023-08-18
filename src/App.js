import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Textarea, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import Typewriter from "typewriter-effect/dist/core";
import Header from "./components/header/header";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [insights, setInsights] = useState({
    wCount: 0,
    sentences: 0,
    chars: 0,
  });

  const inpRef = useRef(null);

  const handleChange = (event) => {
    const str = event.target.value;
    setInputText(event.target.value);
    if (!str) {
      setInsights({
        wCount: 0,
        sentences: 0,
        chars: 0,
      });
      return true;
    }
    const sentenceCount = str?.toString().trim().split(".").length - 1;
    const wordCount = str?.toString().trim().split(" ").length;
    setInsights({
      ...insights,
      chars: str.length,
      wCount: wordCount,
      sentences: sentenceCount,
    });
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
    border: "none",
    borderRadius: "2px",
    height: "auto", // Set initial height to auto
    minHeight: "80px", // Set minimum height
    fontSize: "20px",
    fontWeight: 500,
    background: "#16151e",
    color: "#eae0ff",
    resize: "none",
  };

  const containerStyle = {
    // display: 'flex',
    flexDirection: "row",
    outline: "2px solid transparent",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "100vh",
    // background: "darkgrey",
    // background: `url('https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')`,
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  };

  const buttonStyle = {
    padding: "12px 10px",
    borderRadius: "1px",
    fontSize: "18px",
    border: "1px solid #fff169cf",
    // boxShadow:
    //   "0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    cursor: "pointer",
    color: "#000",
    marginRight: "auto",
    fontWeight: 700,
    height: "42px",
    marginTop: "46px",
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
          <Box display="flex" flexDir={["column", "row"]}>
            <form onSubmit={handleSubmit} style={formStyle}>
              <Box position="relative">
                <Textarea
                  value={inputText}
                  onChange={handleChange}
                  // placeholder="Enter your text or paste here"
                  ref={inpRef}
                  // rows={20}
                  // cols={40}
                  height="360px"
                  bg="#fff"
                  width={["80vw", "400px"]}
                  mr={["0px", "25px"]}
                  style={{
                    ...textareaStyle,
                    height: "328px",
                  }}
                  _focusVisible={{
                    border: "none",
                    outline: "none",
                  }}
                />
                <Box
                  bg="#7e3998"
                  position="absolute"
                  bottom="-46px"
                  width={["100%", "calc(100% - 25px)"]}
                  left="0px"
                  height="46px"
                  display="flex"
                  alignItems="center"
                  padding="0px 17px"
                  color="#fff"
                  justifyContent="space-around"
                >
                  <p>
                    <b>{insights?.wCount}</b> Words
                  </p>
                  <p>
                    <b>{insights?.sentences}</b> Sentences
                  </p>
                  <p>
                    <b>{insights?.chars}</b> Characters
                  </p>
                </Box>
              </Box>
              <Button
                type="submit"
                style={buttonStyle}
                width={["100%", "calc(100% - 25px)"]}
                className={isLoading ? "button loading" : "button"}
                transition="0.3s"
                bg="#fff169"
                _hover={{
                  background: "#eeda13",
                }}
              >
                {isLoading ? "Loading..." : "Summarize"}
              </Button>
            </form>

            <Textarea
              value={response}
              readOnly
              outline-style="solid"
              placeholder={`Once clicked on "Summarize" button, it will generate Summary response here. Go ahead and try now!`}
              bg="#fff"
              mt={["30px", "0px"]}
              style={{ ...textareaStyle, height: "360px" }}
              onChange={() => {}}
              _focusVisible={{
                border: "none",
                outline: "none",
              }}
            />
          </Box>
        </Box>
        <div style={{ ...pStyle, marginBottom: "0px" }}>
          <br />
          <Text fontWeight={600}>
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
