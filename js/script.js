
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val(); //assign input to variable
    var cityStr = $('#city').val();
    var address = streetStr + ','+cityStr;

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    //nytimes article search 
    var nytimes = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=0a07a30944c34f349e9df5c5b4ccbd63';


    $.getJSON(nytimes, function(data){

    $nytHeaderElem.text('New York Times articles about '+cityStr);
        articles = data.response.docs;
        for (var i =0; i< articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
        }
 
   //console.log(JSON.stringify(data, undefined, 2));
}).error(function(){
            $nytHeaderElem.text('error getting New York Times results');

            });

//wiki search
var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+cityStr+"&prop=revisions&rvprop=content&format=json&callback=wikiCallback";
        
var wikiRequestTimeout = setTimeout(function(){
    $wikiElem.text("failed to get Wikipedia resources");
}, 8000);

    $.ajax({
        url:wikiURL,
        dataType:"jsonp",
        //jsonp:"callback", default callback name, some apis may require a different callback name
        ////success callback is depreciated
        // success:function(data){
        //     console.log(data);
        //     wikis = data;
        //     for (var i=0; i<wikis.length;i++){
        //         var wiki = wikis[i];
        //         $wikiElem.append('<li><a href="https://en.wikipedia.org/wiki/'+wiki+'">'+wiki+'</li>');
        //     };
        
       // }
    }).done(function(data){
            console.log(data);
            wikis = data;
            //wikis = turkeys //test timeout
            for (var i=0; i<wikis.length;i++){
                var wiki = wikis[i];
                $wikiElem.append('<li><a href="https://en.wikipedia.org/wiki/'+wiki+'">'+wiki+'</li>');
            }; 
            clearTimeout(wikiRequestTimeout); //cancel timeout
            });  

    return false;
};


$('#form-container').submit(loadData);


