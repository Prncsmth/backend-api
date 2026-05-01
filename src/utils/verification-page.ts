export const successPage = () => `
<!DOCTYPE html>
<html>
  <head><title>Email Verified</title></head>
  <body style="font-family:sans-serif;text-align:center;padding:60px">
    <h1 style="color:green">Email Verified Successfully</h1>
    <p>You can now log in to your account.</p>
  </body>
</html>`;

export const errorPage = (message: string) => `
<!DOCTYPE html>
<html>
  <head><title>Verification Failed</title></head>
  <body style="font-family:sans-serif;text-align:center;padding:60px">
    <h1 style="color:red">Invalid or Expired Link</h1>
    <p>${message}</p>
  </body>
</html>`;