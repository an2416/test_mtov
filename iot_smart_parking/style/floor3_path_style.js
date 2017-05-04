exports.floor3 = function(x, y, screen_height, screen_width,result_line, callback) {
  var result_x, result_y, last_path;

  if(result_line==0) {
    last_path = screen_width/5.2;
  }
  else if(result_line==1) {
    last_path = screen_width/3.8;
  }
  else if(result_line==2) {
    last_path = screen_width/2.66;
  }
  else if(result_line==3) {
    last_path = screen_width/2.26;
  }
  else if(result_line==4) {
    last_path = screen_width/1.8;
  }
  else if(result_line==5) {
    last_path = screen_width/1.6;
  }
  else if(result_line==6) {
    last_path = screen_width/1.365;
  }
  else if(result_line==7) {
    last_path = screen_width/1.24;
  }

  if(x==0)
    result_x = screen_width/7.2;
  else if(x==1) {
    result_x = screen_width/4.5;
  }
  else if(x==2) {
    result_x = screen_width/3.8;
  }
  else if(x==3) {
    result_x = screen_width/3.3;
  }
  else if(x==4) {
    result_x = screen_width/2.45;
  }
  else if(x==5) {
    result_x = screen_width/2.3;
  }
  else if(x==6) {
    result_x = screen_width/1.9;
  }
  else if(x==7) {
    result_x = screen_width/1.7;
  }
  else if(x==8) {
    result_x = screen_width/1.55;
  }
  else if(x==9) {
    result_x = screen_width/1.45;
  }
  else if(x==10) {
    result_x = screen_width/1.3;
  }

  if(y==0)
    result_y = screen_height/1.7977;
  else if(y==1)
    result_y = screen_height/1.8497;
  else if(y==2)
    result_y = screen_height/1.9047;
  else if(y==3)
    result_y = screen_height/1.9631;
  else if(y==4)
    result_y = screen_height/2.0382;
  else if(y==5)
    result_y = screen_height/2.1052;
  else if(y==6)
    result_y = screen_height/2.1768;
  else if(y==7)
    result_y = screen_height/2.2535;
  else if(y==8)
    result_y = screen_height/2.3529;
  else if(y==9)
    result_y = screen_height/2.4427;
  else if(y==10)
    result_y = screen_height/2.5396;
  else if(y==11)
    result_y = screen_height/2.6446;
  else if(y==12)
    result_y = screen_height/2.7826;
  else if(y==13)
    result_y = screen_height/2.909;
  else if(y==14)
    result_y = screen_height/3.0476;
  else if(y==15)
    result_y = screen_height/3.2;
  else if(y==16)
    result_y = screen_height/3.4;
  else if(y==17)
    result_y = screen_height/3.56;
  else if(y==18)
    result_y = screen_height/3.75;
  else if(y==19)
    result_y = screen_height/4;
  else if(y==20)
    result_y = screen_height/4.3;
  else if(y==21)
    result_y = screen_height/4.6;
  else if(y==22)
    result_y = screen_height/4.9;
  else if(y==23)
    result_y = screen_height/5.4;
  else if(y==24)
    result_y = screen_height/5.9;
  else if(y==25)
    result_y = screen_height/6.5;
  else if(y==26)
    result_y = screen_height/7.4;
  else if(y==27)
    result_y = screen_height/8.4;
  else if(y==28)
    result_y = screen_height/9.7;
  else if(y==29)
    result_y = screen_height/11.5;
  else if(y==30)
    result_y = screen_height/14.5;
  else if(y==31)
    result_y = screen_height/17.5;
  else if(y==32)
    result_y = screen_height/27;



    callback(result_x, result_y, last_path);
}
