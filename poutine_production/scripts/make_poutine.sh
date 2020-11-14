echo "Requesting cheese manipulation\n"
# Requesting from one service for cheese
curl -X POST -H 'Accept: application/json' http://localhost:8000/take-cheese
curl -X POST -H 'Accept: application/json' http://localhost:8000/squeeze-cheese

echo "\nNotifying noise and leonard cohen\n"
# Requesting for noise and leonard cohen
curl -H 'Accept: application/json' http://localhost:8010/leonard-cohen-lyrics/
echo 
# Simulates noise heard from another robot
curl -X POST -H 'Accept: application/json' http://localhost:8000/sound-heard
echo 
curl -H 'Accept: application/json' http://localhost:8010/drunks-around/

echo "\n\n Cutting the Potatoes\n"
CUT_POTATOES=$(curl -sb -X POST http://localhost:8020/cut-potatoes/ -H 'Content-Type: application/json' -d '{"potatoes": [{"size": 4, "coated_in_maple_syrup": false, "boiled": false, "fried": false }], "size": 2 }')
echo "\n Successfully cut potatoes: $CUT_POTATOES"

echo "\n Dipping the Potatoes"
DIPPED_POTATOES=$(curl -sb -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' http://localhost:8020/dip-potatoes-in-maple-syrup/ -d $CUT_POTATOES)
echo "\n Successfully dipped potatoes: $DIPPED_POTATOES"

echo "\n Boiling the Potatoes\n"
curl -X POST 'http://localhost:8030/start-boiling' -H 'Content-Type: application/json' -d $DIPPED_POTATOES

echo "\n Trying to add more potatoes to boil\n"
curl -X POST 'http://localhost:8030/start-boiling' -H 'Content-Type: application/json' -d $DIPPED_POTATOES

echo "\n Waiting for boiling status of potatoes\n"
curl -X POST 'http://localhost:8030/boiling-status'

echo "\n Retrieving the Potatoes if they're ready\n"
curl -X POST 'http://localhost:8030/get-boiled-potatoes'
echo 

echo "\n Frying other Potatoes\n"
curl -X POST 'http://localhost:8040/start-frying' -H 'Content-Type: application/json'  -d '{"potatoes": [{"size": 4, "coated_in_maple_syrup": false, "boiled": false, "fried": false }], "oil": "Sunflower" }'

echo "\n\n Get Fries\n"
curl -X POST 'http://localhost:8040/get-fries'

echo

curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' http://localhost:8050/monitor-robot -d '{"robot_id": "Nordo", "temp": 41}'

curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' http://localhost:8050/stop-monitoring-robot -d '{"robot_id": "Nordo", "new_temp": 55}'
