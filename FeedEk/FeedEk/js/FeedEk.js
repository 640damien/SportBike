/*
* FeedEk jQuery RSS/ATOM Feed Plugin v2.0
* http://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
* Author : Engin KIZIL http://www.enginkizil.com   
*/

(function ($) {
    $.fn.FeedEk = function (opt) {
        var def = $.extend({
            FeedUrl: "http://rss.cnn.com/rss/edition.rss",
            MaxCount: 5,
            ShowDesc: true,
            ShowPubDate: true,
            CharacterLimit: 0,
            TitleLinkTarget: "_blank",
            DateFormat: "",
            DateFormatLang:"en"
        }, opt);

        var id = $(this).attr("id"), i, s = "",dt;
        $("#" + id).empty().append('<img src="loader.gif" />');
		var i=0;
		
        $.ajax({
            url: "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=" + def.MaxCount + "&output=json_xml&q=" + encodeURIComponent(def.FeedUrl) + "&hl=en&callback=?",
            dataType: "json",
            success: function (data) {
                $("#" + id).empty();
                $.each(data.responseData.feed.entries, function (e, item) {
                    s += '<li><div class="itemTitle"><a href="' + item.link + '" target="' + def.TitleLinkTarget + '" >' + item.title + "</a></div>";
                    //console.log(data);
					var xmlstr = data.responseData.xmlString;
					$('#divXmlString').html(xmlstr);
					//console.log(xmlstr);
					//console.log(xmlstr.get(0));
					//console.log(xmlstr.getElementsByTagName('enclosure')[0]);
					//var entryImageUrl = $('#aaa').getElementsByTagName("enclosure")[0].getAttribute("url");
					
                    if (def.ShowPubDate){
						moment.lang(def.DateFormatLang);
                        dt= new Date(item.publishedDate);
                        s += '<div class="itemDate">' + moment(dt).startOf('hour').fromNow() + "</div>";                       
                    }
                    var entryImageUrl = $('#divXmlString').find("enclosure").eq(i).attr('url');
                    i++;
                    s += '<img height="80" src=' + entryImageUrl + ">";
                    if (def.ShowDesc) {
                        if (def.DescCharacterLimit > 0 && item.content.length > def.DescCharacterLimit) {
                            s += '<div class="itemContent">' + item.content.substr(0, def.DescCharacterLimit) + "...</div>";
                        }
                        else {
                            s += '<div class="itemContent">' + item.content + "</div>";
                        }
                    }
                });
                $("#" + id).append('<ul class="feedEkList">' + s + "</ul>");
            }
        });
    };
})(jQuery);