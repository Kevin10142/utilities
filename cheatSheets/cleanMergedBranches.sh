#!/bin/bash
# clean up merged branches of master branch
git fetch

echo "Show branches."
git branch | tee

echo "Please move current branch to master."
read -p "Press any key to start cleaning..." key

git branch --merged master | grep -v "\*" | xargs -n 1 git branch -d

echo "Done! Cleaned up branches merged to master."
echo "The rest of branches: "

git branch | tee
