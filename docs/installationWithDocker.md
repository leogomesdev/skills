# Installation with Docker

## Local environment

### Requirements

- [Docker Engine](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/)

### Running

- Just copy the file below (change ports option if wanted)

  ````bash
  cp -v docker-compose.example.yml docker-compose.yml
  ````

- Building the application

  ````bash
  docker-compose up --build
  ````

- Running testes

  ````bash
  docker exec -it node-skills sh -c "npm run test"
  ````
