#!/bin/bash
cd /home/kavia/workspace/code-generation/futureletter-67210-8562e977/future_self_letter_frontend_workspace/future_self_letter_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

