var max = 100;
var min = 20;
// 勝率と最大火力の計算と表示用
var p_data = [];
var win_data = [];
var fire_data = [];
var p_win_data = [];
// 最大火力用
var game_all_data = [];
// 早期決着力用
var judge = [];
var fast = [];
var main_fire = [];
var second = [];

var record = [];
var activate = [];

// jsonデータの取得
$(async _ => {
  console.log('fetching ...');
  const username = 'puyo';
  const password = '33333333';
  for(var i=0;i<player_data.length;i++){
    p_data[i] = [];
    var num = player_data[i][0];
    var name = game_name[i];
    try {
      const res = await fetch(
        'https://puyo.bieplay.net/api/player_stats/'+num+'.json',
        { method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: 'Basic ' + btoa(username + ':' + password)
        })
      });
      const las = await fetch(
        'https://puyo.bieplay.net/api/compe/'+name+'.json',
        { method: 'GET',
        mode: 'cors',
        headers: new Headers({
          Authorization: 'Basic ' + btoa(username + ':' + password)
        })
      });
      const json0 = await res.json();//プレイヤーベース
      const json1 = await las.json();//試合ベース
      p_data[i]= [player_data[i][0],json0];
      game_all_data[i] = json1;
    } catch (e) {
      console.log('ERROR:', e);
    }
  };

  // console.log(game_all_data[2]);
  // 1大会単位のデータを見たい場合

  for(var i=0;i<player_data.length;i++){
    judge[i]=[player_data[i][0],0,0,0,0];
    // judge[i]=[pid,全試合数,見切り力のあった試合数,率,正規化値]
    fast[i]=[player_data[i][0],0,0,0,0];
    // fast[i]=[pid,全試合数,得点5000点未満で勝利した試合数,率,正規化値]
    main_fire[i]=[player_data[i][0],0,0,0,0,0];
    // main_fire[i]=[pid,全試合数,見切り力のあった試合数,自分が15000点以上のれんさ打たず勝った試合数,計算値,正規化値]
    second[i]=[player_data[i][0],[],0,0];
    // second[i]=[pid,本線を打った後の得点/時間配列,second[i][1]の平均値,正規化値]
    // second[i]=[player_data[i][0],0,0,0,0];
    // // second[i]=[pid,(試合時間-本線を打った時間)の合計,本線を打った後の得点合計,1秒ごとの得点,正規化値]
    record[i]=[player_data[i][0],0,0,0,0,0];
    // 戦績の追加分、record[i]=[pid,大会出場数,試合数,勝利数,敗北数,勝率];
    activate[i]=[
      player_data[i][0],
      {"num":1,"name":"1れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":2,"name":"2れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":3,"name":"3れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":4,"name":"4れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":5,"name":"5れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":6,"name":"6れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":7,"name":"7れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":8,"name":"8れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":9,"name":"9れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":10,"name":"10れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":11,"name":"11れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":12,"name":"12れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":13,"name":"13れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":14,"name":"14れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":15,"name":"15れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":16,"name":"16れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":17,"name":"17れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0},
      {"num":18,"name":"18れんさ","全体":0,"勝ゲーム":0,"負ゲーム":0,"分布":0}
    ];
  }

  // 本来各計算は1度の繰り返しで処理しきるべきだが後々修正する場合の可読性などを踏まえあえて別にしておく

  // [!]勝率計算
  // [!]最大火力計算
  for(var i=0;i<p_data.length;i++){
    win_data[i] = p_data[i][1]["stats"]["win_rate"];
    fire_data[i] = p_data[i][1]["stats"]["max_point"];
    p_win_data[i] = [player_data[i][0],p_data[i][1]["stats"]["win_rate"],,p_data[i][1]["stats"]["max_point"]];
  }

  var counts_max = Math.max(...win_data);
  var counts_min = Math.min(...win_data);
  var fire_max = Math.max(...fire_data);
  var fire_min = Math.min(...fire_data);

  for(var i=0;i<p_data.length;i++){
    var normal = ((p_win_data[i][1]-counts_min)/(counts_max-counts_min))*(max-min)+min;
    var fire_normal = ((p_win_data[i][3]-fire_min)/(fire_max-fire_min))*(max-min)+min;

    p_win_data[i][2]= Math.round(normal);
    p_win_data[i][4]= Math.round(fire_normal);
  }

  for(var i=0;i<p_data.length;i++){
    // 勝率を20～100から％表示に変更
    $('.win_rate'+(i+1)).val(Math.round(p_win_data[i][1]*100)+"%");
    // $('.win_rate'+(i+1)).val(p_win_data[i][2]);
    $('.fire'+(i+1)).val(p_win_data[i][4]);
  }

  // [!]見切り力計算
  // 全試合の中で、自分が本線を1発打ち、相手が本線を打てなかった割合
  // 本線Flgが必要　rensa → point >15000 の初回
  // 自分　honsen のあと　相手にhonsen があるかないか boolean
  for(var i=0;i<game_all_data.length;i++){
    for(var ii=0;ii<game_all_data[i]["matches"].length;ii++){
      var p0id = game_all_data[i]["matches"][ii]["match_info"]["players"][0]["pid"];
      var p1id = game_all_data[i]["matches"][ii]["match_info"]["players"][1]["pid"];
      for(var iii=0;iii<game_all_data[i]["matches"][ii]["games"].length;iii++){
        var jt0 = [];
        var jt1 = [];
        var jnum0 = 0;
        var jnum1 = 0;
        for(var iv=0;iv<game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"].length;iv++){
          if(game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["point"]>=15000){
            jt0[jnum0] = [game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["t"],game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["point"]];
            jnum0++;
          }else{}
        }
        for(var v=0;v<game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"].length;v++){
          if(game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["point"]>=15000){
            jt1[jnum1] = [game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["t"],game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["point"]];
            jnum1++;
          }else{}
        }
        // ここでゲーム単位のデータが出る
        if(jt0[0]!==undefined && jt1[0]==undefined){
          for(var vi=0;vi<judge.length;vi++){
            if(p0id==judge[vi][0]){
              judge[vi][2]++;
            }else{}
          }
        }else if(jt0[0]==undefined && jt1[0]!==undefined){
          for(var vii=0;vii<judge.length;vii++){
            if(p1id==judge[vii][0]){
              judge[vii][2]++;
            }else{}
          }
        }
        // 単純に連鎖があったなかったの判断ではなく、どちらの連鎖もあり、その上で連鎖の秒を取るのならば以下の判断基準の追加を想定
        // }else if(jt0[0]!==undefined && jt1[0]!==undefined){
        //   if(jt0[jt0.length][0]>jt1[jt1.length][0]){
        //     for(var viii=0;viii<judge.length;viii++){
        //       if(p0id==judge[viii][0]){
        //         judge[viii][2]++;
        //       }else{}
        //     }
        //   }else if(jt0[jt0.length][0]<jt1[jt1.length][0]){
        //     for(var ix=0;ix<judge.length;ix++){
        //       if(p1id==judge[ix][0]){
        //         judge[ix][2]++;
        //       }else{}
        //     }
        //   }else{}
        // }else{}
      }
    }
  }

  var judge_data = [];
  // 総試合数を入力
  for(var i=0;i<p_data.length;i++){
    judge[i][1]= (p_data[i][1]["stats"]["total_win"] + p_data[i][1]["stats"]["total_lose"]);
    if(judge[i][1]!==0){
      judge[i][3]=judge[i][2]/judge[i][1];
    }else if(judge[i][1]==0){
      judge[i][3]=0;
    }
    judge_data[i] = judge[i][3];
  }

  var judge_max = Math.max(...judge_data);
  var judge_min = Math.min(...judge_data);

  for(var i=0;i<p_data.length;i++){
    var judge_normal = ((judge[i][3]-judge_min)/(judge_max-judge_min))*(max-min)+min;
    judge[i][4]= Math.round(judge_normal);
    $('.judge'+(i+1)).val(judge[i][4]);
  }

  // [!]早期決着力計算
  // 全試合の中で、得点5000点未満で勝利した割合
  // 打ち合いになる前に速攻で相手を倒す力
  // player → score <5000 にFlg

  for(var i=0;i<game_all_data.length;i++){
    for(var ii=0;ii<game_all_data[i]["matches"].length;ii++){
      var p0id = game_all_data[i]["matches"][ii]["match_info"]["players"][0]["pid"];
      var p1id = game_all_data[i]["matches"][ii]["match_info"]["players"][1]["pid"];
      for(var iii=0;iii<game_all_data[i]["matches"][ii]["games"].length;iii++){
        var winner = game_all_data[i]["matches"][ii]["games"][iii]["winner"];
        if(winner==0 && game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["score"]<5000){
          for(var v=0;v<p_data.length;v++){
            if(fast[v][0]==p0id){
              fast[v][2]++;
            }
          }
        }else if(winner==1 && game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["score"]<5000){
          for(var vi=0;vi<p_data.length;vi++){
            if(fast[vi][0]==p1id){
              fast[vi][2]++;
            }
          }
        }else{}
      }
    }
  }

  var fast_data = [];

  for(var i=0;i<p_data.length;i++){
    fast[i][1]= (p_data[i][1]["stats"]["total_win"] + p_data[i][1]["stats"]["total_lose"]);
    if(fast[i][1]==0){
      fast[i][3] = 0;
    }else{
      fast[i][3] = fast[i][2]/fast[i][1];
    }
    fast_data[i] = fast[i][3];
  }

  var fast_max = Math.max(...fast_data);
  var fast_min = Math.min(...fast_data);

  for(var i=0;i<p_data.length;i++){
    var fast_normal = ((fast[i][3]-fast_min)/(fast_max-fast_min))*(max-min)+min;
    fast[i][4]= Math.round(fast_normal);
    $('.fast'+(i+1)).val(fast[i][4]);
  }

  // [!]本線発火率（安定度）
  // 自分が本線を打たずに勝った試合を除いた試合の中で、自分が本線を1発以上打った割合
  // 速攻でない通常戦でどの程度安定して本線を発火できるか
  // honsen=false and win　でフィルタ
  //「自分が15000点以上のれんさを打った」試合数　÷　（自分の全試合数　ー　「自分が15000点以上のれんさ打たず勝った」試合）
  for(var i=0;i<game_all_data.length;i++){
    for(var ii=0;ii<game_all_data[i]["matches"].length;ii++){
      var p0id = game_all_data[i]["matches"][ii]["match_info"]["players"][0]["pid"];
      var p1id = game_all_data[i]["matches"][ii]["match_info"]["players"][1]["pid"];
      for(var iii=0;iii<game_all_data[i]["matches"][ii]["games"].length;iii++){
        var winner = game_all_data[i]["matches"][ii]["games"][iii]["winner"];
        var t = 0;
        var k = 0;
        var num0 = 0;
        for(var iv=0;iv<game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"].length;iv++){
          if(winner==0 && game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["point"]<15000){
            t++;
          }else{};
        }
        for(var v=0;v<game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"].length;v++){
          if(winner==1 && game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["point"]<15000){
            k++;
          }else{};
        }
        for(var vi=0;vi<game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"].length;vi++){
          if(game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][vi]["point"]>=15000){
            t=0;
          }else{}
        }
        for(var vii=0;vii<game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"].length;vii++){
          if(game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][vii]["point"]>=15000){
            k=0;
          }else{}
        }
        // ここでゲーム単位のデータが出る
        if(t!==0){
          for(var viii=0;viii<main_fire.length;viii++){
            if(p0id==main_fire[viii][0]){
              main_fire[viii][3]++;
            }else{}
          }
        }else{}
        if(k!==0){
          for(var ix=0;ix<main_fire.length;ix++){
            if(p1id==main_fire[ix][0]){
              main_fire[ix][3]++;
            }else{}
          }
        }
      }
    }
  }

  var main_fire_data = [];

  for(var i=0;i<p_data.length;i++){
    main_fire[i][1] = judge[i][1];
    main_fire[i][2] = judge[i][2];
    if(main_fire[i][2]!==0){
      main_fire[i][4] = main_fire[i][2]/(main_fire[i][1]-main_fire[i][3]);
    }else if(main_fire[i][2]==0){
      main_fire[i][4] = 0;
    }else{}
    main_fire_data[i] = main_fire[i][4];
  }

  var main_fire_max = Math.max(...main_fire_data);
  var main_fire_min = Math.min(...main_fire_data);

  for(var i=0;i<p_data.length;i++){
    var main_fire_normal = ((main_fire[i][4]-main_fire_min)/(main_fire_max-main_fire_min))*(max-min)+min;
    main_fire[i][5]= Math.round(main_fire_normal);
    $('.main_fire'+(i+1)).val(main_fire[i][5]);
  }

  // [!]セカンド効率（終盤力）
  // ○15000点以上のれんさの後の攻撃がある試合のみ対象
  // 15000点以上の連鎖の後の火力　÷　15000点以上の連鎖発火から試合終了までの時間
  // 自分の本線より後に打った攻撃をフィルタリングして抽出する。そして、それらの火力の合計Aを、自分の本線発火後から試合終了までの時間Bで割ったもの（A÷B）の平均
  // 本線後の1秒あたりの火力
  // Game.試合時間　ー　rensa.honsen.発火時刻　を取得
  for(var i=0;i<game_all_data.length;i++){
    for(var ii=0;ii<game_all_data[i]["matches"].length;ii++){
      var p0id = game_all_data[i]["matches"][ii]["match_info"]["players"][0]["pid"];
      var p1id = game_all_data[i]["matches"][ii]["match_info"]["players"][1]["pid"];
      for(var iii=0;iii<game_all_data[i]["matches"][ii]["games"].length;iii++){
        var game_time = game_all_data[i]["matches"][ii]["games"][iii]["game_time"];
        var st0 = [];
        var st1 = [];
        var sl0 = [];
        var sl1 = [];
        var snum0 = 0;
        var snum1 = 0;
        // st0[snum0] = [point>=15000の時間]
        // sl0[] = [[pointがあった時間,point]]
        for(var iv=0;iv<game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"].length;iv++){
          if(game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["point"]>=15000){
            st0[snum0] = game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["t"];
            snum0++;
          }else{}
          sl0[iv] = [game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["t"],game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["point"]];
        }
        for(var v=0;v<game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"].length;v++){
          if(game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["point"]>=15000){
            st1[snum1] = game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["t"];
            snum1++;
          }else{}
          sl1[v] = [game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["t"],game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][v]["point"]];
        }
        // ここでゲーム単位のデータが出る
        var time0 = 0;
        var time1 = 0;
        var point0 = 0;
        var point1 = 0;
        var pointl0 = 0;
        var pointl1 = 0;

        if(st0[0]!==undefined){
          time0 = game_time - st0[0];
          for(var vi=0;vi<sl0.length;vi++){
            if(sl0[vi][0]>st0[0]){
              point0 = point0 + sl0[vi][1];
            }else{}
            pointl0 = point0 / time0;
            for(var vii=0;vii<p_data.length;vii++){
              if(second[vii][0]==p0id){
                second[vii][1].push(pointl0);
              }else{}
            }
          }
        }else{}
        if(st1[0]!==undefined){
          time1 = game_time - st1[0];
          for(var viii=0;viii<sl1.length;viii++){
            if(sl1[viii][0]>st1[0]){
              point1 = point1 + sl1[viii][1];
            }else{}
            pointl1 = point1 / time1;
            for(var ix=0;ix<p_data.length;ix++){
              if(second[ix][0]==p1id){
                second[ix][1].push(pointl1);
              }else{}
            }
          }
        }else{}
      }
    }
  }
  for(var i=0;i<second.length;i++){
    var sum = 0;
    for(var ii=0;ii<second[i][1].length;ii++){
      sum = sum + second[i][1][ii];
    }
    second[i][2] = sum / second[i][1].length;
  }

  var second_data = [];
  for(var i=0;i<second.length;i++){
    if(second[i][2]!==0){
      second_data.push(second[i][2]);
    }
  }

  var second_max = Math.max(...second_data);
  var second_min = Math.min(...second_data);

  for(var i=0;i<p_data.length;i++){
    var second_normal = ((second[i][2]-second_min)/(second_max-second_min))*(max-min)+min;
    second[i][3]=Math.round(second_normal);
    // セカンド効率ゼロの処理を加える
    if(second[i][2]==0){
      second[i][3]=0;
    }
    $('.second'+(i+1)).val(second[i][3]);
  }

  // 戦績追加分
  // record[i]=[pid,大会出場数,試合数,勝利数,敗北数,勝率];
  for(var i=0;i<p_data.length;i++){
    var s_name=[0,0];
    var s_num=0;
    for(var ii=0;ii<p_data[i][1]["games"].length;ii++){
      s_name[1] = s_name[0];
      s_name[0] = p_data[i][1]["games"][ii]["compe_id"];
      if(s_name[0]!==s_name[1]){
        s_num++;
      }
    }
    record[i][1] = s_num;
    record[i][2] = p_data[i][1]["games"].length;
    record[i][3] = p_data[i][1]["stats"]["total_win"];
    record[i][4] = p_data[i][1]["stats"]["total_lose"];
    record[i][5] = Math.round(p_data[i][1]["stats"]["win_rate"]*100);
  }

  for(var i=0;i<game_all_data.length;i++){
    for(var ii=0;ii<game_all_data[i]["matches"].length;ii++){
      var p0id = game_all_data[i]["matches"][ii]["match_info"]["players"][0]["pid"];
      var p1id = game_all_data[i]["matches"][ii]["match_info"]["players"][1]["pid"];
      for(var iii=0;iii<game_all_data[i]["matches"][ii]["games"].length;iii++){
        var winner = game_all_data[i]["matches"][ii]["games"][iii]["winner"];
        for(var iv=0;iv<game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"].length;iv++){
          for(var v=0;v<activate.length;v++){
            if(activate[v][0]==p0id){
              for(var vi=0;vi<activate[v].length;vi++){
                if(activate[v][vi]["num"]==game_all_data[i]["matches"][ii]["games"][iii]["players"][0]["rensas"][iv]["count"]){
                  activate[v][vi]["全体"]++;
                  if(winner==0){
                    activate[v][vi]["勝ゲーム"]++;
                  }else{
                    activate[v][vi]["負ゲーム"]++;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  for(var i=0;i<game_all_data.length;i++){
    for(var ii=0;ii<game_all_data[i]["matches"].length;ii++){
      var p0id = game_all_data[i]["matches"][ii]["match_info"]["players"][0]["pid"];
      var p1id = game_all_data[i]["matches"][ii]["match_info"]["players"][1]["pid"];
      for(var iii=0;iii<game_all_data[i]["matches"][ii]["games"].length;iii++){
        var winner = game_all_data[i]["matches"][ii]["games"][iii]["winner"];
        for(var iv=0;iv<game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"].length;iv++){
          for(var v=0;v<activate.length;v++){
            if(activate[v][0]==p1id){
              for(var vi=0;vi<activate[v].length;vi++){
                if(activate[v][vi]["num"]==game_all_data[i]["matches"][ii]["games"][iii]["players"][1]["rensas"][iv]["count"]){
                  activate[v][vi]["全体"]++;
                  if(winner==1){
                    activate[v][vi]["勝ゲーム"]++;
                  }else{
                    activate[v][vi]["負ゲーム"]++;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  for(var i=0;i<activate.length;i++){
    var num=0;
    for(var ii=0;ii<activate[i].length;ii++){
      if(ii>0){
        num = num + activate[i][ii]["全体"];
      }
    }
    for(var iii=0;iii<activate[i].length;iii++){
      if(ii>0){
        activate[i][iii]["分布"] = Math.round(activate[i][iii]["全体"]/num*100);
      }
    }
    activate[i].shift();
  }
  for(var i=0;i<record.length;i++){
    record[i][6] = activate[i];
  }

  // ダウンロード
  (function(){
    var all_data = [];
    var all_data_plus = [];
    // all_data[i] = [pid,name,勝率,最大火力,見切り力,早期決着力,本線発火率,セカンド効率]
    for(var i=0;i<p_data.length;i++){
      all_data[i] = {
        "pid":player_data[i][0],
        "name":player_data[i][1],
        // 勝率を20～100から％表示に変更
        "勝率":Math.round(p_win_data[i][1]*100),
        // "勝率":p_win_data[i][2],
        "最大火力":p_win_data[i][4],
        "見切り力":judge[i][4],
        "早期決着力":fast[i][4],
        "本線発火率":main_fire[i][5],
        "セカンド効率":second[i][3]
      };
      all_data_plus[i] = {
        "pid":player_data[i][0],
        "name":player_data[i][1],
        // 勝率を20～100から％表示に変更
        "勝率":Math.round(p_win_data[i][1]*100),
        // "勝率":p_win_data[i][2],
        "最大火力":p_win_data[i][4],
        "見切り力":judge[i][4],
        "早期決着力":fast[i][4],
        "本線発火率":main_fire[i][5],
        "セカンド効率":second[i][3],
        "追加情報":record[i]
      };
    }
    var all_data_output = JSON.stringify(all_data);
    var all_data_plus_output = JSON.stringify(all_data_plus);

    $('#content').val(all_data_output);
    function setBlobUrl(id, content) {
      var blob = new Blob([ content ], { "type" : "text/json" });
      window.URL = window.URL || window.webkitURL;
      $("#" + id).attr("href", window.URL.createObjectURL(blob));
    }
    $("#content").keyup(function(){
      setBlobUrl("download", $("#content").val());
    });

    const header = Object.keys(all_data[0]);
    var csv = all_data.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    $('#content_csv').val(csv);
    function setBlobUrl(id, content_csv) {
      var blob = new Blob([ content_csv ], { "type" : "text/csv" });
      window.URL = window.URL || window.webkitURL;
      $("#" + id).attr("href", window.URL.createObjectURL(blob));
    }
    $("#content_csv").keyup(function(){
      setBlobUrl("download_csv", $("#content_csv").val());
    });

    $("#content_csv").keyup();
    $("#content").keyup();
    console.log(all_data_plus);
  })();

});
