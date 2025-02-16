lastTagFor() {
    git tag --sort=-creatordate | grep "^$1" | head -1
}

tagWork() {
    lastTag=$(git tag --sort=-creatordate | head -1)

    if [ -z "$lastTag" ]; then
        lastTag="v0.0.0"
    fi

    echo "Last tag is: [ $lastTag ]"

    cleanTag=$(echo "$lastTag" | sed 's/^v//')

    echo "Select version:"
    select version in PATCH MINOR MAJOR; do
        case $version in
        "PATCH") newTag="v$(echo $cleanTag | awk -F. '{print $1"."$2"."$3+1}')";;
        "MINOR") newTag="v$(echo $cleanTag | awk -F. '{print $1"."$2+1".0"}')";;
        "MAJOR") newTag="v$(echo $cleanTag | awk -F. '{print $1+1".0.0"}')";;
        esac

        echo " $lastTag  >>>  $newTag "
        echo "To tag use: git tag -a $newTag -m \"Release $newTag\""
        echo "To push tags use: git push --tags"
        echo "To delete last tag use: git tag -d $newTag"
        echo "To remove tag from remote use: git push --delete origin $newTag"
        return
    done
}
