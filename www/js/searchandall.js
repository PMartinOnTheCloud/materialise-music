$(document).ready(function(){
    function connectToApi() {
        let whatToSearch = $("#tosearch").val();
        $.ajax({url:`http://musicbrainz.org/ws/2/artist/?query=${whatToSearch}&fmt=json`}).done((res)=> { listResults(res)});
    }

    function listResults(res) {
        $('ul#listedresults').html('');
        for (let artistData of res.artists) {
            let element = `<li>${artistData['name']} - ${artistData['type']} - ${artistData['disambiguation']}  <i class="material-icons">add</i></li><hr>`
            let elementWithData = $(element).data('artistData',artistData);
            $('ul#listedresults').append(elementWithData);
            $('ul#listedresults > li').last().click(toDetails);
        }
    }

    function toDetails() {
        document.querySelectorAll('a[href="#test-swipe-2"]')[0].click();
        console.log($(this).data('artistData'));
    }

    $('#searchbutton').click(connectToApi);

});