#!/usr/bin/env bash


Host=$1
Port=$2
Login=$3

function Serve () {
    bundle exec jekyll serve -l -o -H [ --host $Host --port $Port ]
}

function Build () {
    echo "$Login" | sudo -S bundle exec jekyll build --watch -d /var/www/circuitalminds
}

(Serve)
