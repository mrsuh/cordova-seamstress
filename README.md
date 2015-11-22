# Cordova Seamstress application #

Simple Cordova application: calculator for seamstress with its own logic

## Cordova installation ##
### install GCC ###

### install Python ###
download source code from [python](https://www.python.org/downloads)
and extract archive to folder `python`
```bash
cd python
./configure
make
sudo make install
```

### install Node.js ###
download source code from [node.js](https://nodejs.org/en/download)
and extract archive to folder `node`
```bash
cd node
./configure
make
sudo make install
```

### install Java JDK ###
download source code from [java jdk](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
and extract archive to folder `java`
```
mv java /usr/lib/java
```

add to file `~/.bash_profile`
```
JAVA_HOME=/usr/lib/java
PATH=$PATH:/usr/lib/java/bin
```

### install Android SDK ###
download source code from [android sdk](http://developer.android.com/sdk/index.html)
and extract archive to folder `android-sdk`
```
mv android-sdk /usr/lib/android-sdk
```

add to file `~/.bash_profile`
```
PATH=$PATH:/usr/lib/android-sdk/tools:/usr/lib/android-sdk/platform-tools
```

run android
```
android
```

and download libs:
* Android SDK Build-tools
* Android 6.0 (API 23)
* Android Support Repository (Extras)

### install Cordova ###
```
sudo npm install -g cordova
```

## Creating Cordova project ##
```
cordova create project
cd project
cordova platforms add android
```

## Building codrova project ##
```
cordova build
```
