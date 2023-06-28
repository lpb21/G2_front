

const Register = () => {
  return (
    <div>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>GTM2 | Pagina de Registro</title>
  {/* Google Font: Source Sans Pro */}
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback" />
  {/* Font Awesome */}
  <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css" />
  {/* icheck bootstrap */}
  <link rel="stylesheet" href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css" />
  {/* Theme style */}
  <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
  <div className="register-box">
    <div className="card card-outline card-primary">
      <div className="card-header text-center">
        <a href="../../index2.html" className="h1"><b>GTM2</b>G2</a>
      </div>
      <div className="card-body">
        <p className="login-box-msg">Registrar un Nuevo Usuario</p>
        <form action="../../index.html" method="post">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Nombre Completo" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-user" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="Email" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Contraseña" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Repite la contraseña" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                <input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                <label htmlFor="agreeTerms">
                  Acepto los  <a href="#">terminos y condiciones</a>
                </label>
              </div>
            </div>
            {/* /.col */}
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block">Registrar</button>
            </div>
            {/* /.col */}
          </div>
        </form>
        {/* <div className="social-auth-links text-center">
          <a href="#" className="btn btn-block btn-primary">
            <i className="fab fa-facebook mr-2" />
            Sign up using Facebook
          </a>
          <a href="#" className="btn btn-block btn-danger">
            <i className="fab fa-google-plus mr-2" />
            Sign up using Google+
          </a>
        </div> */}
        <a href="login.html" className="text-center">I already have a membership</a>
      </div>
      {/* /.form-box */}
    </div>{/* /.card */}
  </div>
  {/* /.register-box */}
  {/* jQuery */}
  {/* Bootstrap 4 */}
  {/* AdminLTE App */}
</div>
  )
}



