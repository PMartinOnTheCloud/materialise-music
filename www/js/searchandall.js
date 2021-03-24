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
        $('div#test-swipe-2').html('');
        let elementDetails = $(this).data('artistData');
        let detailsP = `<p>Name: ${elementDetails['name']}<br>Type: ${elementDetails['type']}\t ${elementDetails['disambiguation']}<br>Country: ${elementDetails['country']}<br>Year since/end: ${elementDetails['life-span']['begin']} to ${elementDetails['life-span']['end'] ? elementDetails['life-span']['end'] : "????"}</p>`;
        $('div#test-swipe-2').append(detailsP);
        document.querySelectorAll('a[href="#test-swipe-2"]')[0].click();
    }

    $('#searchbutton').click(connectToApi);

});