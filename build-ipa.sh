#!/bin/bash
# Builds SahraMAC.ipa on a Mac (or on GitHub's free macOS machines, see .github/workflows/build-ipa.yml).
# No Xcode project needed: the Swift files are compiled straight for iPhone (arm64, iOS 15+).
set -euo pipefail
cd "$(dirname "$0")"

APP="build/Payload/SahraMAC.app"
rm -rf build SahraMAC.ipa
mkdir -p "$APP"

SDK="$(xcrun --sdk iphoneos --show-sdk-path)"
echo "SDK: $SDK"
xcrun --sdk iphoneos swiftc \
  -parse-as-library -O -whole-module-optimization \
  -target arm64-apple-ios15.0 -sdk "$SDK" \
  -framework UIKit -framework WebKit -framework JavaScriptCore -framework AVFoundation -framework AVKit \
  App/Sources/*.swift -o "$APP/SahraMAC"

cp App/Info.plist "$APP/Info.plist"
cp App/Resources/* "$APP/"
printf 'APPL????' > "$APP/PkgInfo"
plutil -lint "$APP/Info.plist"

# a plain (ad-hoc) signature; Sideloadly / AltStore / ESign sign it again with your own certificate
codesign --force --sign - --timestamp=none "$APP" || echo "codesign skipped"

(cd build && zip -qry ../SahraMAC.ipa Payload)
ls -la SahraMAC.ipa
echo "Done: SahraMAC.ipa"
