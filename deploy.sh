
(cd american.app.BE/common  && docker build -t abz/abz-1/common:0.0.1 .)
docker-compose -f docker-compose.yml up -d --build --remove-orphans
read