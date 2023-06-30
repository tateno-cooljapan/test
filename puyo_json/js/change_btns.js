// 一旦全部消す関数
var del_con = function(){
  $('.game_lists').css('display','none');
  $('.player_list').css('display','none');
  $('.datas').css('display','none');
};

$('.button0').on('mouseup',function(){
  del_con();
  $('.game_lists').css('display','block');
});
$('.button1').on('mouseup',function(){
  del_con();
  $('.player_list').css('display','block');
});
$('.button2').on('mouseup',function(){
  del_con();
  $('.datas').css('display','block');
});

del_con();
$('.datas').css('display','block');
