# Set up

## backend container

docker build -t bubble-plot .

 docker run -d -p 127.0.0.1:3000:3000 bubble-plot

 -d is run in the background

 -p is for port mapping between the host and the container

 access a docker image cli in alpine linux

docker exec -it <container_name_or_id> sh


## Postgres container

After pulling: Run a PostgreSQL container
If you want to quickly spin up a container with it:



```
docker run -d --name pg-bubble-plot --network bubble-plot --network-alias psql -v bubble-plot-psql-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=root -e POSTGRES_DB=bubbleplot postgres:15

connect to 

docker exec -it 2755f157a2af  psql -U root -d bubbleplot
```
Creates a container named my-postgres

Sets the POSTGRES_PASSWORD to mysecretpassword

Maps port 5432 on your machine to the container

Runs the container in the background (-d)


Set up a PostgreSQL container with a persistent volume.

Start another container (e.g., a Python app, Node.js, etc.).

Connect the second container to the PostgreSQL container using Docker networking.

✅ Step 1: Create a Docker network
This allows both containers to communicate by name.


docker network create my-network
✅ Step 2: Run PostgreSQL with a volume and on the same network

docker run -d \
  --name my-postgres \
  --network my-network \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_USER=myuser \
  -e POSTGRES_DB=mydatabase \
  -v pgdata:/var/lib/postgresql/data \
  postgres
Explanation:

--network my-network: joins the network

-v pgdata:/var/lib/postgresql/data: persistent volume

You can use my-postgres as the hostname to connect from other containers.

✅ Step 3: Run another container and connect to Postgres
Here’s an example using a simple PostgreSQL client (like postgres image itself):

bash
Copy
Edit
docker run -it --rm \
  --network my-network \
  postgres psql -h my-postgres -U myuser -d mydatabase
It’ll prompt for the password (mysecretpassword) and connect.

✅ Example with your own app (e.g., Node, Python)
If you have a Node app:

bash
Copy
Edit
docker run -it --rm \
  --network my-network \
  -v "$PWD":/app -w /app \
  node:18 \
  node your-app.js
And in your app, connect to Postgres using:

js
Copy
Edit
const client = new Client({
  host: 'my-postgres',
  user: 'myuser',
  password: 'mysecretpassword',
  database: 'mydatabase',
});
✅ View volumes
bash
Copy
Edit
docker volume ls
To inspect the volume:

bash
Copy
Edit
docker volume inspect pgdata


example yaml file

version: '3.8'

version: '3.8'

services:
  db:
    image: postgres:15
    container_name: my-postgres
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: mydatabase
    volumes:
      - pgdata:/var/lib/postgresql/data
    networks:
      - app-network

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: my-node-app
    volumes:
      - ./:/app
    working_dir: /app
    command: node index.js
    networks:
      - app-network
    depends_on:
      - db

volumes:
  pgdata:

networks:
  app-network: