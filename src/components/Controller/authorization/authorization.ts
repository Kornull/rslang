// import { User, TokenResponse } from './types';
// import { urlLink } from '../../Templates/serve';

// name - M
// email - m@m.com
// userId - 6300a6cf0606dc00166b7ba7
// token заголовок - Authorization
// token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsImlhdCI6MTY2MDk5MzQxNywiZXhwIjoxNjYxMDA3ODE3fQ.6Zkeiqs4rs7PhLf3nsPzplx4t42cEHPxvJDLnJ5A3lY
// refreshToken - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsInRva2VuSWQiOiIxZTBiNDY1YS1hZWRlLTQzNDEtYmFjOC1mM2RhYTE1NzA3YjgiLCJpYXQiOjE2NjA5OTM0MTcsImV4cCI6MTY2MTAwOTYxN30.xAGVNDdW3BqFQ_6DfI1-a_LLE8f6Ra84p_Jhdvt3BzY
// let response = fetch(protectedUrl, {
//     headers: {
//       Authentication: 'token'
//     }
//   });

// type TokenRequest = {
//   email: string;
//   password: string;
// }

// const user: User = {
//   name: 'M',
//   email: 'm@m.com',
//   id: '6300a6cf0606dc00166b7ba7',
//   token:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmMDYwNmRjMDAxNjZeyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsImlhdCI6MTY2MDk5MzQxNywiZXhwIjoxNjYxMDA3ODE3fQ.6Zkeiqs4rs7PhLf3nsPzplx4t42cEHPxvJDLnJ5A3lY',
//   refreshToken:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsInRva2VuSWQiOiIxZTBiNDY1YS1hZWRlLTQzNDEtYmFjOC1mM2RhYTE1NzA3YjgiLCJpYXQiOjE2NjA5OTM0MTcsImV4cCI6MTY2MTAwOTYxN30.xAGVNDdW3BqFQ_6DfI1-a_LLE8f6Ra84p_Jhdvt3BzY',
// };

// async function signIn (user: User, password: string) {
//   const resp: TokenResponse;
//   const request: TokenRequest;
//   request.email = user.email;
//   request.password = password;
//   resp = (await fetch(`${urlLink}signin`, {
//     method: 'POST',
//     body: JSON.stringify({ user: user.name, password }))
//   return
// };

// const user: User = {
//   name: 'M',
//   email: 'm@m.com',
//   id: '6300a6cf0606dc00166b7ba7',
//   token:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmMDYwNmRjMDAxNjZeyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsImlhdCI6MTY2MDk5MzQxNywiZXhwIjoxNjYxMDA3ODE3fQ.6Zkeiqs4rs7PhLf3nsPzplx4t42cEHPxvJDLnJ5A3lY',
//   refreshToken:
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDBhNmNmMDYwNmRjMDAxNjZiN2JhNyIsInRva2VuSWQiOiIxZTBiNDY1YS1hZWRlLTQzNDEtYmFjOC1mM2RhYTE1NzA3YjgiLCJpYXQiOjE2NjA5OTM0MTcsImV4cCI6MTY2MTAwOTYxN30.xAGVNDdW3BqFQ_6DfI1-a_LLE8f6Ra84p_Jhdvt3BzY',
// };

// async function signIn (user: User, password: string) {
//   const resp: TokenResponse;
//   const request: TokenRequest;
//   request.email = user.email;
//   request.password = password;
//   resp = (await fetch(`${urlLink}signin`, {
//     method: 'POST',
//     body: JSON.stringify({ user: user.name, password` }))
//   return
// }
