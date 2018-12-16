import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

import Questions from "./Components/questions";


const TagSum = styled.div``;

const Container = styled.div``;


const questions = [
    {question: "Company size", answers: [{name:"small", tag: 1}, {name: "middle", tag: 2}, {name: "big", tag: 3}]},
    {question: "Project advanced", answers: [{name:"small", tag: 1}, {name: "middle", tag: 2}, {name: "big", tag: 3}]},
    {question: "functionality amount", answers: [{name:"small", tag: 1}, {name: "middle", tag: 2}, {name: "big", tag: 3}]},
    {question: "How much time", answers: [{name:"short", tag: 1}, {name: "middle", tag: 2}, {name: "long", tag: 3}]},
    {question: "How many people to develop", answers: [{name:"2", tag: 1}, {name: "3", tag: 2}, {name: "4", tag: 3}]}
];

type State = {
   answers: {[id: number]: { tag: number, name: string, question: string, id: number } | undefined };
   next: boolean;
};


class App extends React.Component<{}, State> {
    state = {answers: {}, next: false};

    selectTagsValues  = (tag: number, name: string, index: number, question: string) => {
        console.log("tag", tag, "index", index, "question", question);
        this.setState({ answers: { ...this.state.answers, [index]: { tag, name, question, id: index }}});
    };

    render() {
        console.log("stan", this.state.answers);

        return (
            <Container>
            <Questions questions={questions} onClick={this.selectTagsValues}/>

           {Object.values(this.state.answers).map( (item) => <TagSum key={item.id}>{`Twoj wybór na pytanie ${item.question} to ${item.name}`}</TagSum>)}
            </Container>
        );
    };
};



ReactDOM.render(<App />, document.getElementById("app"));
