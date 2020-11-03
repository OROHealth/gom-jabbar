#!/bin/sh

#Find the Process ID for all running services running instance

ps -ef | grep ./target/debug | grep -v grep | awk '{print $2}' | xargs kill
