import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
    // todos in the body of the Post req
    const { todos } = await request.json();
    console.log(todos);

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `When responding, welcome the user and say welcome to Trello 2.0 Todo App! Limit the response to 200 characters`,
            },
            {
                role: "user",
            content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, then tell the user to have a productive day! Here is the data: ${JSON.stringify(todos)}`
            },
        ],
    });

    const { data } = response;

    console.log("Data is:", data);
    console.log(data.choices[0].message);

    return NextResponse.json(data.choices[0].message);
}