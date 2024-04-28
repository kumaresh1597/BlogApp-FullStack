import { serialize } from 'cookie';

export const setCookie = () => {
  // const { result, params } = context;
  // const { user } = result;

    // if (user && user.accessToken) {
    //   // Assuming you have an accessToken property in your user object
    //   const { accessToken } = user;
      
    //   // Set the access token as a cookie
    //   params.cookies.set('access_token', accessToken, {
    //     httpOnly: true,
    //     sameSite: 'strict',
    //     maxAge: 3600, // 1 hour expiration
    //     path: '/'
    //   });
    // }

    //return context;

    return async context => {

      console.log(`Running hook setCookie on ${context.path}.${context.method}`)
      

      const { params } = context;
      console.log(params);
  
      if (params && params.user && params.authentication && params.authentication.accessToken) {
        const { accessToken } = params.authentication;
        const serialized = serialize('access_token', accessToken, {
          httpOnly: true,
          sameSite: 'strict', // Adjust sameSite attribute according to your needs
          maxAge: 3600, // 1 hour expiration
          path: '/'
        });
        // Set the access token as a cookie
        params.headers.setCookie = serialized
      }
      
      console.log(context.params);
      return context;
    };
}
