Building your image
docker build . -t node-web-app

Your image will now be listed by Docker:
docker images


Running your image with -d runs the container in detached mode, leaving the container running in the background. 
The -p flag redirects a public port to a private port inside the container. Run the image you previously built:
docker run -p 49160:8080 -d node-web-app

# Get container ID
docker ps

# Print app output
docker logs <container id>

If you need to go inside the container you can use the exec command:
docker exec -it <container id> /bin/bash


Run on browser: http://localhost:49160/
