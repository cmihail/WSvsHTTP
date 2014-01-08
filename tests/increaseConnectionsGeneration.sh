#!/bin/sh

step=0
num=$2
newConnections=150
while true; do
	./generateClients.sh $num
	step=$(($step + 1))
	echo $step $num

	num=$(($num + $newConnections))
	sleep $1
done
