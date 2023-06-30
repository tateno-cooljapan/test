// game_nameからデータを持ってきてappend
var data_read = function(){
  for(var i=0;i<game_name.length;i++){
    var d0 = '<th class="game_list game_list'+i+'">';
    var d1 = '<td><input class="game_list_txt game_list_txt'+i+'" type="text" name="" value="'+game_name[i]+'" disabled="disabled"></td>';
    var d2 = '<td><input class="game_list_change_btn game_list_change_btn'+i+'" type="button" name="" value="修正"></td>';
    var d3 = '<td><input class="game_list_del_btn game_list_del_btn'+i+'" type="button" name="" value="削除"></td>'
    var d4 = '<td class="game_list_opt_name game_list_opt_name'+i+'">修正しますか？</td>';
    var d5 = '<td><input class="game_list_yes_btn game_list_yes_btn'+i+'" type="button" name="" value="YES"></td>';
    var d6 = '<td><input class="game_list_no_btn game_list_no_btn'+i+'" type="button" name="" value="NO"></td></th>';
    $('.game_lists').append(d0+d1+d2+d3+d4+d5+d6);
  }
  $('.game_list').css('position','absolute');
};

data_read();
$('.game_list_opt_name').css('display','none');
$('.game_list_yes_btn').css('display','none');
$('.game_list_no_btn').css('display','none');
