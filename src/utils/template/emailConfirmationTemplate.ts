export const emailConfirmationTemplate = (confirmationCode: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Correo de confirmación</title>
    <style>
      body {
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
      }
      .container {
        margin: auto;
        width: 97%;
        height: 96.5%;
        padding: 20px;
        background-color: #f4f4f4;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
      .box {
        width: 30%;
        margin: auto;
        height: 450px;
        overflow: hidden;
        border-radius: 15px;
        border-collapse: collapse;
        background-color: white;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        width: 100%;
        height: 35%;
        text-align: center;
        background-color: #e0cfcf;
        border-radius: 15px 15px 0px 0px;
      }
      .header img {
        width: 100%;
        height: 100%;
      }
      .content {
        height: 65%;
        padding: 10px;
        background-color: white;
      }
      .confirmation-message {
        color: #666666;
        text-align: center;
      }
      .confirmation-code {
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        color: #53ba83;
      }
      .titulo {
        color: black;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box">
        <div class="header">
          <img src="cid:logo" alt="Logo" />
        </div>
        <div class="content">
          <p class="titulo">Estimado usuario</p>
          <p class="confirmation-message">
            Para completar tu registro en nuestra plataforma ingresa el
            siguiente codigo de validación:
          </p>
          <p class="confirmation-code">${confirmationCode}</p>
          <p class="confirmation-message">¡Gracias y que tenga un buen día!</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
