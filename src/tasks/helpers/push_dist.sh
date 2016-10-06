echo beginning dist push

# mark each file in dist as trackable
while read file; do
    git update-index --no-assume-unchanged $file
done <<<`find ./dist -type f`

# remove .gitignore cache of dist files
git rm --cached -q -r dist

# force add dist (since its in .gitignore we pass -f)
git add -f dist

# grab version number from package.json for commit message
while read version; do
    git commit -m "Bumping Dist to version $version"
done <<< `cat package.json | grep version | awk '{print $2}' | tr -d "\"\,"`

# push dist to master
git push origin master

# mark each file in dist as untrackable again
while read file; do
    git update-index --assume-unchanged $file
done <<< `find ./dist -type f`
