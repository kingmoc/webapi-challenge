const express = require('express')

let people = [
    {
        id: 1,
        name: "Joseph",
    },
    {   id: 2,
        name: "Kate",
    },
    {
        id: 3,
        name: "Ajalina",
    }
]

let chores = [
    {
        id: 1,
        description: "Clean House",
        notes: "",
        assignedTo: 1,
        completed: 'false'
    },
    {
        id: 2,
        description: "Mow the Lawn",
        notes: "",
        assignedTo: 1,
        completed: 'false'
    },
    {
        id: 3,
        description: "Write Daily Journal",
        notes: "",
        assignedTo: 2,
        completed: 'false'
    },
    {
        id: 4,
        description: "Life Live to the Fullest",
        notes: "",
        assignedTo: 2,
        completed: 'true'
    }
]


const server = express();
server.use(express.json())

server.get('/chores', (req, res) => {
    const queryParameters = req.query;
    console.log(queryParameters)

    if(queryParameters.completed === 'true') {
        let com = chores.filter(chore => chore.completed === 'true')
        res.status(200).json(com)
        console.log("Right")
    } else if (queryParameters.completed === 'false') {
        let notCom = chores.filter(chore => chore.completed === 'false')
        res.status(200).json(notCom)
        console.log("Wrong")
    } else {
        res.status(200).json(chores)
    }

    

})

server.post('/chores', (req, res) => {
    const newChore = req.body
    newChore.id = chores.length + 1

    let checkPerson = people.filter(person => person.id === parseInt(newChore.assignedTo))

    if (checkPerson.length === 0) {
        res.status(404).json({error: "ID does NOT exist"})
    } else {
        chores = [...chores, newChore]
    
        res.status(200).json(newChore)
    }

})

server.put('/chores/:id', (req, res) => {
    const choreId = parseInt(req.params.id)
    const choreUpdate = req.body
    choreUpdate.id = choreId

    let updatedChores = chores.map((chore,i) => {
        if(chore.id === choreId) {

            console.log("rightID")
            return chore = choreUpdate
        }
        // else {
        //     res.status(404).json({ errror: "ID Not Found"})
        // }
    })

    chores = updatedChores
    res.status(201).json({ message: "Updated Successfully"})
})

server.delete('/chores/:id', (req, res) => {
    const choreId = parseInt(req.params.id)
    // console.log(choreId)

    let newChores = chores.filter(chore => chore.id !== choreId)   
    console.log(newChores) 

    chores = newChores    

    res.status(204).end()

})

server.get('/chores/person/:id', (req, res) => {
    const choreId = parseInt(req.params.id)

    let checkPerson = people.filter(person => person.id === choreId)
    // console.log(checkPerson)
    if (checkPerson.length === 0) {
        res.status(404).json({error: "ID does NOT exist"})
    } else {
        let personList = chores.filter(chore => chore.assignedTo === choreId)
        res.status(200).json(personList)
    }

})


module.exports = server;


