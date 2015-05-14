//http://codepen.io/bennettfeely/pen/CGFEs

//Since classes are added dynamically, need to use event delegation to register the click handler
  $(document).on('click', ".increment", function(){
    //last char is extracted, the (string) num we need.
    var num = 0;
    if( $(this).attr('id').indexOf("up")>-1){
      num = $(this).attr('id').slice(2); //slices first 2 letters (up) getting the num
    }
    else{
      num = $(this).attr('id').slice(4); //slices first 4 letters (down), leaving the num
    }
    //var count = parseInt($("#count"+num).text());
    var data = $("#data"+num);

    if($(this).hasClass("up")) {

      //If we already voted up, and clicked vote up again, undo upvote
      if(data.attr('votedUp')=='true'){
        data.attr('upvotes',parseInt(data.attr('upvotes'))-1);
        data.attr('votedUp', 'false');
        $("#up"+num).css('opacity','0.5');
      }
      else if(data.attr('votedUp')=='false'){
        //So we have not voted up yet
        data.attr('upvotes',parseInt(data.attr('upvotes'))+1);
        data.attr('votedUp','true');
        $("#up"+num).css('opacity','1');
      }
      //If we have already voted down
      if(data.attr('votedDown')=='true'){
        //undo downvote
        data.attr('downvotes', parseInt(data.attr('downvotes'))-1);
        data.attr('votedDown','false');
        $("#down"+num).css('opacity','0.5');
      }
      //If we have not voted down, don't change downvotes.

      data.text('Upvotes: '+data.attr('upvotes')
        +' Downvotes: '+ data.attr('downvotes') + ' Confidence Score: ' + data.attr('confidence'));

    } else {

      //If we already voted down, and clicked vote down again, undo downvote
      if(data.attr('votedDown')=='true'){
        data.attr('downvotes',parseInt(data.attr('downvotes'))-1);
        data.attr('votedDown', 'false');
        $("#down"+num).css('opacity','0.5');
      }
      else if(data.attr('votedDown')=='false'){
        //So we have not voted down yet
        data.attr('downvotes',parseInt(data.attr('downvotes'))+1);
        data.attr('votedDown','true');
        $("#down"+num).css('opacity','1');
      }
      //If we have already voted up
      if(data.attr('votedUp')=='true'){
        //undo downvote
        data.attr('upvotes', parseInt(data.attr('upvotes'))-1);
        data.attr('votedUp','false');
        $("#up"+num).css('opacity','0.5');
      }

      data.text('Upvotes: '+data.attr('upvotes')
       +' Downvotes: '+ data.attr('downvotes') + ' Confidence Score: ' + data.attr('confidence'));
    }
    //if(data.attr('votedOn')=="false"){
      //data.attr('votedOn',"true");
    //}
    var count = parseInt(data.attr('upvotes')) - parseInt(data.attr('downvotes'));
    $("#count"+num).text(count);

    updateDB(num);
  });

  //Updates the Database for the (num)th entry.
  function updateDB(num){
    var data = $("#data"+num);
    var card = $("#relevantSentence"+num);
    var query = $('#Translated-Message').text();
    var similar = card.text();
    var upvotes = data.attr('upvotes');
    var downvotes = data.attr('downvotes');

    var xmlhttp = new XMLHttpRequest();
    var params = "query=" + query + "&similar=" +similar +"&upvoteC=" +
      upvotes + "&downvoteC=" + downvotes;
      //alert(params);
    xmlhttp.open("POST", "http://web.engr.illinois.edu/~jlin61/lovelingual/updateCacheRecord.php", true);

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //$('#Translated-Message').text(xmlhttp.responseText);
            var json_result =JSON.parse(xmlhttp.responseText);
            //alert(xmlhttp.responseText);
        }
    }

    xmlhttp.send(params);
  }
