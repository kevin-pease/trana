#!/bin/sh

case $1 in
    "-fi")
        cd frontend
        sudo rm -r node_modules
        npm install
        ;;
    "-f")
        cd frontend
        npm run dev
        ;;
    "-bi")
        cd backend
        sudo rm -rf node_modules
        npm install
        ;;
    "-b")
        cd backend
        node server.js
        ;;
    "--help")
        echo "Usage:
        run -fi           : install frontend
        run -f            : run frontend
        run -bi           : install backend
        run -b            : run frontend"
        ;;
    *)
        echo "Invalid arguments. Use run --help for more information on usage."
esac

