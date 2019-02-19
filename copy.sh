#!/bin/bash

# User input for the destination directory
echo Please enter the full destination directory path
read destination

cp -R ./src/* $destination 

# User input for the new conference code without quotes.
echo Please enter the conference code.

read confCode
sed_param=s/conferenceCode=.*/conferenceCode=\"$confCode\"/

sed -i "$sed_param" $destination/js/conference_status.js
sed -i "$sed_param" $destination/js/abstract_status.js
