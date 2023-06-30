var data00 = '<tr><th class="list list1">PlayerID</th><th class="list list2">PlayerName</th><th class="list list3">勝率</th><th class="list list4">最大火力</th><th class="list list5">見切り力</th><th class="list list6">早期決着力</th><th class="list list7">本線発火率</th><th class="list list8">セカンド効率</th></tr>';
$('.datas').append(data00);
for(var i=0;i<player_data.length;i++){
  var data0 = '<tr class="p_data p_data'+(i+1)+'"><td><input readonly="readonly" class="p_id p_id'+(i+1)+'" type="text" name="" value="'+player_data[i][0]+'"></td>';
  var data1 = '<td><input readonly="readonly" class="p_name p_name'+(i+1)+'" type="text" name="" value="'+player_data[i][1]+'"></td>';
  var data2 = '<td><input readonly="readonly" class="win_rate win_rate'+(i+1)+'" type="text" name="" value=""></td>';
  var data3 = '<td><input readonly="readonly" class="fire fire'+(i+1)+'" type="text" name="" value=""></td>';
  var data4 = '<td><input readonly="readonly" class="judge judge'+(i+1)+'" type="text" name="" value=""></td>';
  var data5 = '<td><input readonly="readonly" class="fast fast'+(i+1)+'" type="text" name="" value=""></td>';
  var data6 = '<td><input readonly="readonly" class="main_fire main_fire'+(i+1)+'" type="text" name="" value=""></td>';
  var data7 = '<td><input readonly="readonly" class="second second'+(i+1)+'" type="text" name="" value=""></td></tr>';
  $('.datas').append(data0+data1+data2+data3+data4+data5+data6+data7);
  // $('.p_id').css('width','5%');
}
