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
    var count = parseInt($("#count"+num).text());
    var data = $("#data"+num);

    if($(this).hasClass("up")) {

      var count = count + 1;
      $("#up"+num).css('opacity','1');
      $("#down"+num).css('opacity','0.5');
      $('#up'+num).css('pointer-events','none');
      $('#down'+num).css('pointer-events','auto');

      $("#count"+num).text(count);

      data.attr('upvotes', parseInt(data.attr('upvotes'))+1);
      if(data.attr('votedOn')=="true"){ //if we have previously voted, must have been a downvote. Undo that.
        data.attr('downvotes', parseInt(data.attr('downvotes'))-1)
      }
      data.text('Upvotes: '+data.attr('upvotes')
        +' Downvotes: '+ data.attr('downvotes') + ' Confidence Score: ' + data.attr('confidence'));

    } else {
      var count = count - 1;
      $("#down"+num).css('opacity','1');
      $('#up'+num).css('opacity',0.5);
      $('#down'+num).css('pointer-events','none');
      $('#up'+num).css('pointer-events','auto');
      $("#count"+num).text(count);

      data.attr('downvotes', parseInt(data.attr('downvotes'))+1);
      if(data.attr('votedOn')=="true"){ //if we have previously voted, must have been an upvote. Undo that.
        data.attr('upvotes', parseInt(data.attr('upvotes'))-1)
      }
      data.text('Upvotes: '+data.attr('upvotes')
       +' Downvotes: '+ data.attr('downvotes') + ' Confidence Score: ' + data.attr('confidence'));
    }
    if(data.attr('votedOn')=="false"){
      data.attr('votedOn',"true");
    }

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
