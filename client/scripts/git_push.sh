# add all changes
git add .

# add a commit message
commit_message="Updated"
git commit -m "$commit_message"

# push changes to the branch (main -- default branch)
git push

# print a message in the console (changes pushed to the branch)
echo "changes pushed successfully" gitpush.sh
