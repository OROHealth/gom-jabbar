#!/bin/sh

#Find the Process ID for syncapp running instance

ps -ef | grep service | grep -v grep | awk '{print $2}' | xargs kill
