FROM alpine:3.20
COPY conf/config.yaml /etc/greentrail/*
COPY greentrail /etc/greentrail/app
EXPOSE 9700
RUN ["app", "serve"]
