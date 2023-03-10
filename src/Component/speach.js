import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {Form, Button, Input, Select} from "antd";
import Container from 'react-bootstrap/Container'
import { Configuration, OpenAIApi } from "openai";
import Header from './header';
import axios from 'axios';

const { TextArea } = Input;
const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

const Dictaphone = () => {
 const [form] = Form.useForm();
 const [text, setText] = useState();
 const [crewData, setCrewData] = useState([]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
        if(transcript && transcript != null){
            form.setFieldsValue({
                testInput: transcript
              })
        }
  }, [transcript]);


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSubmit = async (value) => {


    // const response = await openai.({
    //     model: 'gpt-3.5-turbo',
    //     "messages": [{"role": "user", "content": "What is the OpenAI mission?"}] 
    //     // prompt: value.testInput,
    //     // temperature: 1,
    //     // max_tokens: 800,
    //     // top_p: 1.0,
    //     // frequency_penalty: 0,
    //     // presence_penalty: 0,
    //   }).catch((e) => {
    //     console.log(e)
    //   });


    await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/chat/completions',
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer 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`,
      },
      data: {
        "model": "gpt-3.5-turbo",
        
        "messages": [
            {"role": "system", "content": value.testInput}
        ] 
      },
  })
    .then(function (response) {
        let string = response.data?.choices[0].message.content
        string = string.replace(/\s/g, ' ');
        setText(transcript);
        form.setFieldsValue({
            response: string
          })
    })
    .catch(function (error) {
      console.log(error);
    })

    await axios({
        method: 'put',
        url: 'http://localhost:3000/crew',
        headers: {
          'Content-Type': 'application/json',
         'Content-Type': 'application/x-www-form-urlencoded' 
      },
      data: {
        testDataInfo: value.testInput
      }
    }).then((result) => {
        setCrewData(result?.data)
    })

    //   console.log(response)
     
    // setText(transcript);
    resetTranscript();
  };

  console.log(crewData)

  return (
    <Container fluid>
    <div class="movie-bank-home">
    <Header/>
    <Form autoComplete="off"
    form={form}
    onFinish={handleSubmit}
     labelCol={{ span: 10}} 
     wrapperCol={{ span: 14}}
     className="mb-form"
     >
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
       <button onClick={SpeechRecognition.stopListening}>Stop</button>
       <button onClick={resetTranscript}>Reset</button>
    
        <Form.Item
        name="testInput" 
        label="Test Input"

        rules={[
          {
            required: true,
            message: "enter your testInput",
          },
          { whitespace: true },
          { min: 3},
        ]}
        hasFeedback
        >
         <Input placeholder="Type your testInput" />
       </Form.Item>

       <Form.Item
        name="response" 
        label="Response"
        >
         <TextArea rows={5}  placeholder="Response" disabled={true} />
       </Form.Item>
       <Form.Item wrapperCol={{ span: 24 }}>
         <Button  htmlType="submit">
           Get Response
         </Button>
     </Form.Item>
       </Form>
       <p>{crewData?.length > 0 ? (crewData?.map((c) => {
         return c.name
      }) ): null }</p>
       </div>
       </Container>
    // <div>
    //   <p>Microphone: {listening ? 'on' : 'off'}</p>
    //   <button onClick={SpeechRecognition.startListening}>Start</button>
    //   <button onClick={SpeechRecognition.stopListening}>Stop</button>
    //   <button onClick={resetTranscript}>Reset</button>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Text:
    //       <input name="textField" type="text" value={text} />
    //     </label>
    //     <button type="submit">Save</button>
    //   </form>
    //   <p>{transcript}</p>
    // </div>
  );
};

export default Dictaphone;
