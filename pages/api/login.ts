export default function LoginHandler(req, res) {
  const { email, password } = req.body;

  console.log(email, password);
  return;
}
