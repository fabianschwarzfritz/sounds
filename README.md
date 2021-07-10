Sounds
======

Sounds let's you play along generated songs. Mainly focused on young kids playing simple computer games or adults in need of a short break.

[Play the game](https://fabianschwarzfritz.github.io/sounds/)

Deployment
---------
The application is written in plain front-end javascript. Use the `Dockerfile` to build and run the application.

```bash
docker build -t sounds-dev . && docker run -p 8000:80 sounds-dev
```
