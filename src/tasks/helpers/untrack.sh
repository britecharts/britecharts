while read file; do
    git update-index --assume-unchanged $file
done <<< `find ./dist -type f`

