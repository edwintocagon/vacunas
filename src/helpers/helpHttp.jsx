/* ----------Vanilla js---------- */
/* Angular , Vue, svlete... */
/* aki hamos un mini axios */
/* helpers tiene mas la logica de programcion  */
/* no manejan un state , para ser considerado como hooks personaliazados */

export const helpHttp = () => {
  /* enpoint:ruta: options: metodos cabezeras.. */
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
      /* aki va opciones en base a lo que se necesite */
    };

    /* maejador de erroes oara que el insponit que no responde , cancelar la peticion */
    const controller = new AbortController();
    options.signal = controller.signal;

    /* si el usurio en obejtp de opciones traer metodo , metodo es igual a metodo , caso contrario metodo es igual a GET*/
    options.method = options.method || "GET";
    /* si me especifica cabezera , si no cabezera por defecto */

    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    /* si ody tiene falso lo elimina, ya que body no puede ir false */
    if (!options.body) delete options.body;

    /* console.log("opciones:", options); */
    /* si despues de 3segundo no tenemos repuesta deñ servidor lo abortamo */
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
