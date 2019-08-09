const express = require('express')

let people = [
    {
        id: 1,
        name: "Joseph",
        chores: [
            {
                id: 1,
                description: "Clean House",
                notes: "",
                assignedTo: 1,
                completed: false
            },
            {
                id: 2,
                description: "Mow the Lawn",
                notes: "",
                assignedTo: 1,
                completed: false
            }
        ]
    },
    {   id: 2,
        name: "Kate",
        chores: [
            {
                id: 1,
                description: "Write Daily Journal",
                notes: "",
                assignedTo: 2,
                completed: false
            }
        ]
    },
    {
        id: 3,
        name: "Ajalina",
        chores: [
            {
                id: 1,
                description: "Do Homework",
                notes: "",
                assignedTo: 3,
                completed: false
            }
        ]
    }
]


const server = express();
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({message: "Running"})
})

module.exports = server;


