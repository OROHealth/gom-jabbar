cd ..
cargo build
./target/debug/montroyashi_service &
./target/debug/bizar_service &
./target/debug/nordo_service &
./target/debug/outremona_service &
./target/debug/verduny_service &
./target/debug/oldporto_service &
sleep 1
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' http://localhost:8050/register-robot -d '{"robot_id": "Nordo", "port": 8030}'
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' http://localhost:8050/register-robot -d '{"robot_id": "Bizar", "port": 8040}'
echo

