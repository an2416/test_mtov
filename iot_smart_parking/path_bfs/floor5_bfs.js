exports.floor5 = function(start_x,start_y,end_x,end_y, callback) {
  if(end_x==1 && end_y == 16) {
    var floor3_park_data = [
      [2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    ];
  }
  else {
    var floor3_park_data = [
      [2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,0,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2],
      [2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1],
      [2,0,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,0,1],
      [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,1],
      [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
    ];
  }

  var path_array = [
    new Array(37),new Array(37),new Array(37),new Array(37),new Array(37),new Array(37),
    new Array(37),new Array(37),new Array(37),new Array(37),new Array(37),new Array(37),
    new Array(37),new Array(37),new Array(37),new Array(37),new Array(37),new Array(37),
    new Array(37),new Array(37),new Array(37),new Array(37),new Array(37)
  ];
  var rootx = new Array(100);
  var rooty = new Array(100);

  var qx = new Array(100);
  var qy = new Array(100);
  var xfront = 0;
  var xtail = 0;
  var yfront = 0;
  var ytail = 0;
  var path_count=1;
  var min = 999999;
  var x,y,count;

  var push_que = function(xxx, yyy) {
    if(xtail==99) {xtail=0;}
    if(ytail==99) {ytail=0;}
    qx[xtail++] = xxx;
    qy[ytail++] = yyy;
  }
  var pop_xque = function() {
    //if(xfront>xtail) {return false;}
    if(xfront == 99) {xfront =0;}
    var x = qx[xfront++];
    return x;
  }
  var pop_yque = function() {
    //if(yfront>ytail) {return false;}
    if(yfront == 99) {yfront =0;}
    var y = qy[yfront++];
    return y;
  }

  var bfs = function(startx, starty, destx, desty) {
    push_que(startx, starty);
    path_array[startx][starty] = 1;

    while(xtail!=xfront) {
      var xx = pop_xque();
      var yy = pop_yque();
      //console.log('while    ' + xtail + '    ' + xfront + '    ' + ytail + '    ' + yfront + '   '+ xx + '    ' + yy);
      if(xx==destx && yy==desty) {
        if(min > path_array[xx][yy]) {min = path_array[xx][yy];}
        //console.log('break1');
        break;
      }

      if(xx+1<23 && floor3_park_data[xx+1][yy]==0 && path_array[xx+1][yy]==0) {
        push_que(xx+1, yy);
        path_array[xx+1][yy] = path_array[xx][yy]+1;
        //console.log('111');
      }
      if(xx-1>=0 && floor3_park_data[xx-1][yy]==0 && path_array[xx-1][yy]==0) {
        push_que(xx-1, yy);
        path_array[xx-1][yy] = path_array[xx][yy]+1;
        //console.log('222');
      }
      if(yy+1<37 && floor3_park_data[xx][yy+1]==0 && path_array[xx][yy+1]==0) {
        push_que(xx, yy+1);
        path_array[xx][yy+1] = path_array[xx][yy]+1;
        //console.log('333');
      }
      if(yy-1>=0 && floor3_park_data[xx][yy-1]==0 && path_array[xx][yy-1]==0) {
        push_que(xx, yy-1);
        path_array[xx][yy-1] = path_array[xx][yy]+1;
        //console.log('444');
      }
    }
  }

  var bbfs = function(startx, starty, destx, desty) {
    xfront = 0;
    xtail = 0;
    yfront = 0;
    ytail = 0;

    push_que(destx, desty);
    var cnt = path_array[destx][desty];
    count = cnt;
    rootx[cnt] = destx;
    rooty[cnt] = desty;
    //console.log('cnt : ' + cnt)
    while(xtail != xfront) {
      var xx = pop_xque();
      var yy = pop_yque();
      cnt = path_array[xx][yy];

      if(xx == startx && yy == starty) {
        //console.log('break');
        break;
      }

      if(xx+1 < 23 && floor3_park_data[xx+1][yy]==0 && path_array[xx+1][yy] == (cnt-1)) {
        push_que(xx+1,yy);
        rootx[cnt-1] = xx+1;
        rooty[cnt-1] = yy;
        //console.log('11');
      }
      if(xx-1>=0 && floor3_park_data[xx-1][yy]==0 && path_array[xx-1][yy] == (cnt-1)) {
        push_que(xx-1,yy);
        rootx[cnt-1] = xx-1;
        rooty[cnt-1] = yy;
        //console.log('22');
      }
      if(yy+1 < 37 && floor3_park_data[xx][yy+1]==0 && path_array[xx][yy+1] == (cnt-1)) {
        push_que(xx,yy+1);
        rootx[cnt-1] = xx;
        rooty[cnt-1] = yy+1;
        //console.log('33');
      }
      if(yy-1 >=0 && floor3_park_data[xx][yy-1]==0 && path_array[xx][yy-1] == (cnt-1)) {
        push_que(xx,yy-1);
        rootx[cnt-1] = xx;
        rooty[cnt-1] = yy-1;
        //console.log('44');
      }
    }
  }

  //경로값 초기화
  for(var i=0;i<23;i++) {
    for(var j=0;j<37;j++) {
      path_array[i][j] = 0;
    }
  }

  // 보정값
  console.log('원래값 --> end_x : ' + end_x + '    end_y : ' + end_y);

  if(end_x==0 || end_x==1) {  // 같은 경로 (0번지 주차면, 2번지 주차면들은 1번지 경로를 통해 주차가능)
    if(end_x==0) {
      if(end_y>=16) {
        end_y+=4;
      }
      end_y += 4;
    }
    if(end_x==1) {
      end_y += 3;
    }
    end_x=2;
    console.log('1차 --> end_x : ' + end_x + '    end_y : ' + end_y);

  }
  else if(end_x==2 || end_x==3) {
    end_y+=3;
    end_x=8;
    console.log('2차 --> end_x : ' + end_x + '    end_y : ' + end_y);
  }
  else if(end_x==4 || end_x==5) {
    end_y+=3;
    end_x=14;
    console.log('3차 --> end_x : ' + end_x + '    end_y : ' + end_y);
  }
  else if(end_x==6 || end_x==7) {
    if(end_x==6) {
      end_y+=3;
      end_x=20;
    }
    else if(end_x==7) {
      end_x=21;
    }
    console.log('4차 --> end_x : ' + end_x + '    end_y : ' + end_y);
  }
  else if(end_x==8) {
    end_x = end_y+1;
    end_y = 35;
    console.log('5차 --> end_x : ' + end_x + '    end_y : ' + end_y);
  }


  console.log('보정값 --> end_x : ' + end_x + '    end_y : ' + end_y);
  bfs(start_x, start_y, end_x, end_y);   // 최종점까지의 최단거리 찾기
  console.log(end_x + '\n' + end_y + '\n' + path_array[0]+'\n'+path_array[1]+'\n'+ path_array[2]+'\n'+ path_array[3]+'\n'+ path_array[4]+'\n'+ path_array[5]+'\n'+ path_array[6]+'\n'+ path_array[7]+'\n'+ path_array[8]+'\n'+ path_array[9]+'\n'+ path_array[10]+'\n'+ path_array[11]+'\n'+ path_array[12]+'\n'+ path_array[13]+'\n'+ path_array[14]+'\n'+ path_array[15]+'\n'+ path_array[16]+'\n'+ path_array[17]+'\n'+ path_array[18]+'\n'+ path_array[19]+'\n'+ path_array[20]+'\n'+ path_array[21]+'\n'+ path_array[22]+'\n');
  bbfs(start_x,start_y, end_x, end_y);   // 경로 좌표 구하는 부분

  var result = new Array();

  for(var i=1;i<=count;i++) {    // 배열에 JSON객체 삽입
    var result_xy = new Object();
    if(rootx[i]!='undefined' && rooty[i]!='undefined') {
      result_xy.x = rootx[i];
      result_xy.y = rooty[i];
      result.push(result_xy);
    }
  }
  console.log(result);
  callback(result);
}
