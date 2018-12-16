import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
`;

const QuestionName = styled.div`    
`;

const Answer = styled.button`
`;

type AnswersProperty = {
    name: string;
    tag: number;

};

type Question = {
    question: string;
    answers: AnswersProperty;
    onClick: (tag: number, index: number, name: string, question: string) => void;

};

const Questions = ({ questions, onClick }: Question) => (
  <Container>
      {questions.map((itemQuestion, indexQuestion) => (
          <Container key={indexQuestion}>
          <QuestionName>{itemQuestion.question}</QuestionName>
      {itemQuestion.answers.map((item, index) => (
          <Answer key={index} onClick={() => onClick(item.tag, item.name, indexQuestion, itemQuestion.question)}>{item.name}</Answer>
          ))}
          </Container>
      ))
      }
          </Container>
);

export default Questions;