# Routes

- GET /api/skills -> Get all skills
  - Request body:

    ````json
    {}
    ````

  - Response sample:

    ````json
    {
      "skills":[
        {
          "_id":"5e0bb9852ffa0a2a4244860d",
          "name":"Node Full A",
          "level":"SENIOR",
          "createdAt":"2019-12-31T21:11:33.119Z",
          "updatedAt":"2019-12-31T21:11:33.119Z",
          "__v":0
        },
        {
          "_id":"5e0b9fdb2ffa0a2a4244860c",
          "name":"Node Full A",
          "level":"SENIOR",
          "createdAt":"2019-12-31T19:22:03.495Z",
          "updatedAt":"2019-12-31T19:22:03.495Z",
          "__v":0
        }
      ]
    }
    ````

    ````bash
    HTTP Code: 200 OK
    ````

- GET /api/skills/**skillId** -> Get a skill
  - Request body:

    ````json
    {}
    ````

  - Response sample:

    ````json
    {
      "skill":{
        "_id":"5e0b9fdb2ffa0a2a4244860c",
        "name":"Node Full A",
        "level":"SENIOR",
        "createdAt":"2019-12-31T19:22:03.495Z",
        "updatedAt":"2019-12-31T19:22:03.495Z",
        "__v":0
      }
    }
    ````

    ````bash
    HTTP Code: 200 OK
    ````

- POST /api/skills -> Create a skill
  - Request body:

    ````json
    {
     "skill": {
      "name": "Full Node.js Expertise",
      "level": "SENIOR"
     }
    }
    ````

  - Response sample:

    ````json
    {
        "skill": {
            "_id": "5e0bbab52ffa0a2a4244860e",
            "name": "Full Node.js Expertise",
            "level": "SENIOR",
            "createdAt": "2019-12-31T21:16:37.491Z",
            "updatedAt": "2019-12-31T21:16:37.491Z",
            "__v": 0
        }
    }
    ````

    ````bash
    HTTP Code: 201 Created
    ````

- PUT /api/skills/**skillId** -> Update a skill
  - Request body:

    ````json
    {
     "skill": {
      "name": "Full Node.js Expertise",
      "level": "EXPERT"
     }
    }
    ````

  - Response sample:

    ````json
    {
        "skill": {
            "_id": "5e0bbccb3cb9b80d2c581609",
            "name": "Full Node.js Expertise",
            "level": "EXPERT",
            "createdAt": "2019-12-31T21:25:32.022Z",
            "updatedAt": "2019-12-31T21:25:53.430Z",
            "__v": 0
        }
    }
    ````

    ````bash
    HTTP Code: 200 OK
    ````

- DELETE /api/skills/**skillId** -> Delete a skill
  - Request body:

    ````json
    {}
    ````

  - Response sample:

    ````bash
    HTTP Code: 204 No Content
    ````
