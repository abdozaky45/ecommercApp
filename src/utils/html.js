export const signUpTemp = (link,newlink) =>
 `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
<style type="text/css">
body{background-color: #88BDBF;margin: 0px;}
</style>
<body style="margin:0px;"> 
<table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
<tr>
<td>
<table border="0" width="100%">
<tr>
<td>
<h1>
    <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
</h1>
</td>
<td>
<p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
<tr>
<td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
<img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
</td>
</tr>
<tr>
<td>
<h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
</td>
</tr>
<tr>
<td>
<p style="padding:0px 100px;">
</p>
</td>
</tr>
<tr>
<td>
<a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
</td>
</tr>
<tr>
<br>
<br>
<br>
<tr>
<td>
<a href="${newlink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">new Verify Email address</a>
</td>
</tr>
<tr>
<td>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table border="0" width="100%" style="border-radius: 5px;text-align: center;">
<tr>
<td>
<h3 style="margin-top:10px; color:#000">Stay in touch</h3>
</td>
</tr>
<tr>
<td>
<div style="margin-top:20px;">

<a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>

<a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
</a>

<a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
</a>

</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
export const signUpTempConfirm = (link) => `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
<style type="text/css">
body{background-color: #88BDBF;margin: 0px;}
</style>
<body style="margin:0px;"> 
<table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
<tr>
<td>
<table border="0" width="100%">
<tr>
<td>
<h1>
    <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
</h1>
</td>
<td>
<p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
<tr>
<td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
<img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
</td>
</tr>
<tr>
<td>
<h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
</td>
</tr>
<tr>
<td>
<p style="padding:0px 100px;">
</p>
</td>
</tr>
<tr>
<td>
<a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
</td>
</tr>
<tr>
<br>
<br>
<br>
<tr>
<td>
</td>
</tr>
<tr>
<td>
</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table border="0" width="100%" style="border-radius: 5px;text-align: center;">
<tr>
<td>
<h3 style="margin-top:10px; color:#000">Stay in touch</h3>
</td>
</tr>
<tr>
<td>
<div style="margin-top:20px;">

<a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>

<a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
</a>

<a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
<img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
</a>

</div>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
export const forgetPASS = (code) => `<!DOCTYPE html>
    <html>
  <head>
  <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    
  <style type="css/style.css">
  * {
  padding: 0;
  margin: 0;
  box-sizing: 0;
}


.elements {
  width: 50%;
  text-align: center;
  position: absolute;
  left: 180px;
  top: 100px;

}

.elements h1 {
  font-size: 70px;
  margin-bottom: 10px;

}

.elements i {
  margin-bottom: 40px;
  font-size: 50px;
}

.elements a {
  margin-bottom: 30px;
  font-size: 30px;
  text-decoration: none;
  color: gray;
}

.func {
    width: 25%;
    height: 40px;
    /* background-color: red; */
    font-size: 23px;
    color:red;
    margin: auto;
    font-weight:600 ;
}

.elements p {
  font-size: 30px;
}
  </style>
  </head>
  <body>
    <div class="main">
      <div class="layer">
        <div class="elements">
          <h1>Welcome</h1>
          <i class="fa-brands fa-google" style="color: #d02525"></i>
          <a href="">Ecommerce </a>
          <br>
          <br>
          <p>Code Forget Password:</p>
          <br/>
          <div class="func">${code}</div>
        </div>
      </div>
    </div>
    <div class="sec"></div>
    <script src="js/main.js"></script>
  </body>
</html>`;
