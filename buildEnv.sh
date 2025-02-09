lastTagFor() {
    git tag --sort=-creatordate | grep "^$1" | head -1
}

tagWork() {
    lastTag=""
    echo "Select version:"
    select version in PATCH MINOR MAJOR; do
        if [ -z "$lastTag" ]; then
            lastTag="v0.0.0"
        fi

        echo "Last tag is: [ $lastTag ]"
        case $version in
        "PATCH") newTag=$(echo $lastTag | awk -F. '{print $1"."$2"."$3+1}') ;;
        "MINOR") newTag=$(echo $lastTag | awk -F. '{print $1"."$2+1".0"}') ;;
        "MAJOR") newTag=$(echo $lastTag | awk -F. '{print $1+1".0.0"}') ;;
        esac

        echo " $lastTag  >>>  $newTag "
        echo "To tag use: git tag -a $newTag -m \"Release $newTag\""
        echo "To push tags use: git push --tags"
        echo "To delete last tag use: git tag -d $newTag"
        echo "To remove tag from remote use: git push --delete origin $newTag"
        return
    done
}
