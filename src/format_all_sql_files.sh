#!/bin/bash -l

for file in `find . -name '*.sql'`; do
    zetasql-formatter $file
done