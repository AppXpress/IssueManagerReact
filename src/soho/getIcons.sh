#!/bin/bash

if [ $# -eq 0 ]
then
	echo "Usage: ./getIcons [path to soho icon directory] > IconResources.js"
else
	cd $1

	echo "export default {"
	for file in *.svg
	do
		if [ $file != "*.svg" ]
		then
			echo -n "    '${file::-4}': '"
			cat $file
			echo "',"
		fi
	done
	echo "}"
fi
