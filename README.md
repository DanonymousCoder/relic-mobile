# relic-mobile

## Testing Locally?

This guide covers how to run the Relic application locally and test the compression and EXIF metadata extraction engines.

### Prerequisites
* [Go](https://go.dev/doc/install) (1.20+)
* [Node.js](https://nodejs.org/) & npm
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
* Xcode (for iOS Simulator) or Android Studio (for Android Emulator)

### 1. Start the Go Backend
The backend uses a local SQLite database and handles the heavy lifting for file archiving and EXIF extraction.

##### [clone this repo](https://github.com/Koded0214h/relic)

```bash
# Navigate to the backend directory
cd backend

# Install Go dependencies
go mod download

# Run the server
go run main.go
```

### 1. Start the React Native App(this repo)


```bash
# Navigate to the react-native frontend directory
cd relic

# Install dependencies
npm install

# Start the simulator/emulator
npx expo start -c
```


### Demo Video


https://github.com/user-attachments/assets/814fd12b-cc1f-4a9f-b397-3a89424e4303





