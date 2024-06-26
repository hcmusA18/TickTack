<!-- generated by markdown-notes-tree -->

# backend

<!-- optional markdown-notes-tree directory description starts here -->

<!-- optional markdown-notes-tree directory description ends here -->

- [**src**](src)

## How to start the recommender

1. Change the directory to the `recommender` folder
2. Create a virtual environment in the `recommender` folder with python 3.10

```bash
python -m venv venv
```

3. Activate the virtual environment

```bash
venv/Scripts/activate
```

4. Install the required packages

```bash
pip install -r requirements.txt
```

5. Run the 2 scripts in the `recommender` folder separately

```bash
python .\model_builder.py
python .\recommender.py
```

### Run on docker

1. Change the directory to the `recommender` folder
2. Build the docker image for the first time or after changes

```bash
docker compose up --build
```

- If you want to run the docker image without building it

```bash
docker compose up
```

> In `compose.yaml`, the recommender is set to run on port 8080. If you want to change the port, you can change it in the port mapping section of the `compose.yaml` file.
> Default:

```yaml
ports:
  - "8080:8080"
```

> The first number is the public port which you use and the second number is the private port on the container (the port which recommender server will run on)

If successfully run, the recommender will be available at `http://127.0.0.1:8080/recommend`. The request format is as follows: `http://127.0.0.1:8080/recommend?userId=1&number=5`. The `userId` is the user id and the `number` is the number of recommendations to be returned.

`model_builder.py` will track the changes in the database and update the model accordingly. `recommender.py` will start a flask server to serve the recommendations.

Please add `.env` the following environment variables:

```env
RECOMMENDER_PORT=8080
```
