#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
mount -t tmpfs -o size=128M -o noatime tmpfs "$DIR/ui/build"
