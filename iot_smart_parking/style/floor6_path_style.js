exports.floor6 = function(x, y, screen_height, screen_width,result_line, callback) {
  var result_x, result_y, last_path;


  if(x==0)
    result_x = screen_width/6.95;
  else if(x==1)
    result_x = screen_width/4.65;
  else if(x==2)
    result_x = screen_width/4.3;
  else if(x==3)
    result_x = screen_width/3.8;
  else if(x==4)
    result_x = screen_width/3.35;
  else if(x==5)
    result_x = screen_width/3.1;
  else if(x==6)
    result_x = screen_width/2.85;
  else if(x==7)
    result_x = screen_width/2.58;
  else if(x==8)
    result_x = screen_width/2.45;
  else if(x==9)
    result_x = screen_width/2.3; //
  else if(x==10)
    result_x = screen_width/2.1; //
  else if(x==11)
    result_x = screen_width/2; //
  else if(x==12)
    result_x = screen_width/1.9; //
  else if(x==13)
    result_x = screen_width/1.78; //
  else if(x==14)
    result_x = screen_width/1.7;
  else if(x==15)
    result_x = screen_width/1.63; //
  else if(x==16)
    result_x = screen_width/1.535; //
  else if(x==17)
    result_x = screen_width/1.48; //
  else if(x==18)
    result_x = screen_width/1.43; //
  else if(x==19)
    result_x = screen_width/1.355; //
  else if(x==20)
    result_x = screen_width/1.3;
  else if(x==21)
    result_x = screen_width/1.27;




  if(y==0)
    result_y = screen_height/1.61;
  else if(y==1)
    result_y = screen_height/1.65;
  else if(y==2)
    result_y = screen_height/1.695;
  else if(y==3)
    result_y = screen_height/1.735;
  else if(y==4)
    result_y = screen_height/1.795;
  else if(y==5)
    result_y = screen_height/1.845;
  else if(y==6)
    result_y = screen_height/1.9;
  else if(y==7)
    result_y = screen_height/1.95;
  else if(y==8)
    result_y = screen_height/2.03;
  else if(y==9)
    result_y = screen_height/2.09;
  else if(y==10)
    result_y = screen_height/2.15;
  else if(y==11)
    result_y = screen_height/2.22;
  else if(y==12)
    result_y = screen_height/2.32;
  else if(y==13)
    result_y = screen_height/2.4;
  else if(y==14)
    result_y = screen_height/2.49;
  else if(y==15)
    result_y = screen_height/2.58;
  else if(y==16)
    result_y = screen_height/2.72;
  else if(y==17)
    result_y = screen_height/2.83;
  else if(y==18)
    result_y = screen_height/2.95;
  else if(y==19)
    result_y = screen_height/3.1;
  else if(y==20)
    result_y = screen_height/3.3; //
  else if(y==21)
    result_y = screen_height/3.46; //
  else if(y==22)
    result_y = screen_height/3.65; //
  else if(y==23)
    result_y = screen_height/3.83; //
  else if(y==24)
    result_y = screen_height/4.15;
  else if(y==25)
    result_y = screen_height/4.4;
  else if(y==26)
    result_y = screen_height/4.7;
  else if(y==27)
    result_y = screen_height/5.15;
  else if(y==28)
    result_y = screen_height/5.6;
  else if(y==29)
    result_y = screen_height/6.1;
  else if(y==30)
    result_y = screen_height/6.9;
  else if(y==31)
    result_y = screen_height/7.7;
  else if(y==32)
    result_y = screen_height/8.6;
  else if(y==33)
    result_y = screen_height/10.5;
  else if(y==34)
    result_y = screen_height/12;
  else if(y==35)
    result_y = screen_height/13;



  if(result_line==0)
    last_path = screen_width/5.08;
  else if(result_line==1)
    last_path = screen_width/3.7;
  else if(result_line==2)
    last_path = screen_width/2.66;
  else if(result_line==3)
    last_path = screen_width/2.24;
  else if(result_line==4)
    last_path = screen_width/1.8;
  else if(result_line==5)
    last_path = screen_width/1.6;
  else if(result_line==6)
    last_path = screen_width/1.37;
  else if(result_line==7)
    last_path = screen_width/1.24;
  else if(result_line==8) {
    last_path = result_x;
  }
  last_path_y = result_y - (screen_height/60);

    callback(result_x, result_y, last_path,last_path_y);
}
