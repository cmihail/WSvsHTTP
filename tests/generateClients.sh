#!/bin/sh

for i in $(seq 1 1 $1); do
	./client.js >> /dev/null 2>&1 &
done
