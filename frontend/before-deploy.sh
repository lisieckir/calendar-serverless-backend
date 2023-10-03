#!/bin/bash

NODE_OPTIONS=--openssl-legacy-provider yarn run build
# Przesyłanie plików źródłowych do kubełka S3

# Katalog z plikami źródłowymi aplikacji
SOURCE_DIR="build/"

# Nazwa paczki do stworzenia
PACKAGE_NAME="deployment-package.zip"

# Tworzenie paczki ZIP z plikami źródłowymi
zip -r $PACKAGE_NAME $SOURCE_DIR