$(function () {
    var url = window.location.href,
        communityKey = url.slice(url.indexOf("communitykey="), url.indexOf("&tab"));

    communityKey = communityKey.slice(13);

    switch (communityKey) {
        case '7340d4a5-8d4c-4a6e-b1dd-3bfb07f292c3':
            window.location.replace('roundtable-group-library?communityKey=' + communityKey);
            break;
        case '0255980d-fa00-4268-96ed-154963eddee4':
            window.location.replace('careers-and-development-library?communityKey=' + communityKey);
            break;
        case 'dfc8b3de-b5a2-426e-af5e-dfe2eb1465e1':
            window.location.replace('tools-and-platforms-library?communityKey=' + communityKey);
            break;
        default:
            return;
    }
});