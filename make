#!/usr/bin/env bash


Option=$1

function Serve () {
    Host=$( hostname -I )
    Port="8080"
    bundle exec jekyll serve -l -o -H [ --host $Host --port $Port ]
}

function Build () {    
    Login=$( head $HOME/login )
    echo "$Login" | sudo -S bundle exec jekyll build JEKYLL_ENV=development -w -d /var/www/circuitalminds
}


if [ $Option == "serve" ]; then
    (Serve)
elif [ $Option == "build" ]; then    
    (Build)
fi;

