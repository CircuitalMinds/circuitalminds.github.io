#!/usr/bin/env bash


Option=$1

function Install () {
    
    Login=$( head $HOME/login )
    
    echo "$Login" | sudo -S apt-get install ruby
    echo "$Login" | sudo -S apt-get install jekyll
    echo "$Login" | sudo -S apt-get install bundler

    echo "$Login" | sudo -S gem install jekyll bundler
    echo "$Login" | sudo -S gem install update    

    echo "$Login" | sudo -S bundle install
    echo "$Login" | sudo -S bundler install
    
}

function Serve () {

    Host=$( hostname -I | awk '{print $1}' )
    Port="8000"
    Login=$( head $HOME/login )
    echo "$Login" | sudo -S bundle exec jekyll serve -l -o -H [ --host $Host --port $Port ]
    
}

function Build () {    

    Login=$( head $HOME/login )
    echo "$Login" | sudo -S bundle exec jekyll build --trace --incremental JEKYLL_ENV=development -w -d /var/www/circuitalminds
    
}


if [ $Option == "serve" ]; then
    (Serve)
elif [ $Option == "build" ]; then    
    (Build)
elif [ $Option == "install" ]; then    
    (Install)    
fi;

