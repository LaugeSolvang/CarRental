### Setting Up and Running the Project

#### Initial Setup:

##### Install Dependencies: 

```
npm install
```

##### Configure Environment Variables:
- Create a .env file in the root directory of your project (next to the app.json file).
- To determine your IP address on Windows, use the ipconfig command. Ensure that both your phone and computer are connected to the same network.
- Update the .env file with your local settings, particularly your IP address. While you can use the same ports mentioned in the instructions, ensure your IP address is set correctly.

#### Running Servers:

##### JSON Server:
- Navigate to the database directory:
```
cd src/database
```
- Start the JSON server:
```
json-server --watch db.json --host YOUR_IP_ADDRESS -p YOUR_JSON_SERVER_PORT
```
- Replace YOUR_IP_ADDRESS with your actual IP and YOUR_JSON_SERVER_PORT with your chosen port for the JSON server.
##### HTTP Server: 
- In a new terminal, run:
```
http-server -a YOUR_IP_ADDRESS -p YOUR_HTTP_SERVER_PORT
```
- Replace YOUR_IP_ADDRESS with your actual IP and YOUR_HTTP_SERVER_PORT with your chosen port.
##### Start the Expo App:
```
npx expo start
```
#### Final Notes:
Ensure that the IP addresses and port numbers you use match those specified in your .env file. This guarantees that the application can access your local servers without issues.

