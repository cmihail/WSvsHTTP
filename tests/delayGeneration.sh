#!/bin/sh

step=0
while true; do
	./generateClients.sh $2
	step=$(($step + 1))
	echo $step
	sleep $1
done
